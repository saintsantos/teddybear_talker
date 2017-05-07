<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/jingle', function () use ($app) {
  //public function getUsers(Request $request, Response $response) {
  $app->get('/', function(Request $request, Response $response) {
      $this->logger->addInfo("Grabbing all files from the backend");
      $jingles = $this->db->query("SELECT * from jingle where status='active'");
      $result = array();
      foreach( $jingles as $row) {
        //print_r($row["username"]);
        $jingle = array(
          'jingle_id' => (int)$row["jingle_id"],
          'jingle_name' => $row["jingle_name"],
          'jinglepath' => $row["jinglepath"]
        );
        array_push($result, $jingle);
      }
      $json = json_encode($result, JSON_PRETTY_PRINT);
      $this->logger->addInfo("All files sent to frontend");
      return $json;
  });

  // Receive file upload
  $app->post('/upload', function(Request $request, Response $response) {
    //$jinglesdir = '/home/edwin/Music/jingle';
    $files = $request->getUploadedFiles();
    if (empty($files['file'])) {
      throw new Exception('Expected a jingle file');
    }
    $newfile = $files['file'];
    if ($newfile->getError() === UPLOAD_ERR_OK) {
      $uploadFileName = $newfile->getClientFilename();
    }
    $name = chop($uploadFileName, ".mp3");
    $result = $this->db->query("SELECT * from jingle where jingle_name='$uploadFileName'");
    if ($result->rowCount() > 0) {
      $status = NULL;
      foreach($result as $row) {
        $status = $row["status"];
      }
      if ($status == 'active') {
        throw new Exception('Song name already exists in database.');
      } else {
        $id = NULL;
        foreach($result as $row) {
          $id = $row["jingle_id"];
        }
        $newfile->moveTo("$this->jingledir/$uploadFileName");
        $this->db->query("UPDATE jingle set jingle_name='$name', jinglepath='$this->jingledir/$uploadFileName', status='active' where jingle_id=$id");
      }
    } else {
      $newfile->moveTo("$this->jingledir/$uploadFileName");
      $this->db->query("INSERT into jingle (jingle_name, jinglepath, status) values ('$name', '$this->jingledir/$uploadFileName', 'active')");
    }
  });

  // Delete all recordings from the bear
  $app->delete('/', function(Request $request, Response $response) {
    //$jinglesdir = '/home/edwin/Music/jingle';
    unlink("$this->jingledir/*.mp3");
    $this->db->query("UPDATE jingle set status='inactive'");
  });

  // Update a file in our table
  $app->put('/{id}', function(Request $request, Response $response) {
    $this->logger->addInfo("Updating jingle file");
    //$jinglesdir = '/home/edwin/Music/jingle';
    $id = $request->getAttribute('route')->getArgument('id');
    $body = $request->getParsedBody();
    $newname = $body["jingle_name"];
    $jinglename = str_replace(' ', '_', $newname);
    $jinglepath = $body["jinglepath"];
    $jingle = $this->db->query("SELECT * from jingle where jingle_id=$id");
    rename("$jinglepath", "$this->jingledir/$jinglename.mp3");
    $this->db->query("UPDATE jingle set jinglepath='$this->jingledir/$jinglename.mp3', jingle_name='$newname' where jingle_id=$id");
  });

  // Delete a recording from the bear
  $app->delete('/{id}', function(Request $request, Response $response) {
    //$jinglesdir = '/home/edwin/Music/jingle';
    $this->logger->addInfo("Updating deactivating an jingle file");
    $id = $request->getAttribute('route')->getArgument('id');
    $jingle = $this->db->query("SELECT * from jingle where jingle_id=$id");
    $jinglepath = NULL;
    foreach( $jingle as $row) {
      $jinglepath = $row["jinglepath"];
    }
    unlink("$jinglepath");
    $this->db->query("UPDATE jingle set status='inactive' where jingle_id=$id");
    $this->db->query("UPDATE events set status='inactive' where jingle_id=$id");
  });

});

 ?>
