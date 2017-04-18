<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/voice', function () use ($app) {

  //public function getUsers(Request $request, Response $response) {
  $app->get('/', function(Request $request, Response $response) {
      $this->logger->addInfo("Grabbing all files from the backend");
      $files = $this->db->query("SELECT * from audio where status='active'");
      $result = array();
      foreach( $files as $row) {
        //print_r($row["username"]);
        $file = array(
          'audio_id' => (int)$row["audio_id"],
          'name' => $row["audio_name"],
          'path' => $row["filepath"]
        );
        array_push($result, $file);
      }
      $json = json_encode($result, JSON_PRETTY_PRINT);
      $this->logger->addInfo("All files sent to frontend");
      return $json;
  });

  // Receive file upload
  $app->post('/upload', function(Request $request, Response $response) {
    //TODO - Check if the filename exists in the audio table
    //TODO - Reactivate the index at the proper location in
    //TODO - the file table and update.
    //$body = $request->getParsedBody();
    $uploads_dir = '/home/edwin/Music/uploads';
    //$name = $body["filename"];
    $files = $request->getUploadedFiles();
    //print_r($files);
    if (empty($files['file'])) {
      throw new Exception('Expected an audio file');
    }
    $newfile = $files['file'];
    print_r($files);
    if ($newfile->getError() === UPLOAD_ERR_OK) {
      $uploadFileName = $newfile->getClientFilename();
    }
    $result = $this->db->query("SELECT * from audio where audio_name='$uploadFileName'");
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
          $id = $row["id"];
        }
        $newfile->moveTo("$uploads_dir/$uploadFileName");
        //$this->db->query("UPDATE audio set audio_name='$name', filepath='$uploads_dir/$name.mp3' where audio_id=$id");
      }
    } else {
      $newfile->moveTo("$uploads_dir/$uploadFileName");
      //$this->db->query("INSERT into audio set audio_name='$uploadFileName', filepath='$uploads_dir/$uploadFileName'");
      $this->db->query("INSERT into audio (audio_name, filepath, status) values ('$uploadFileName', '$uploads_dir/$uploadFileName', 'active')");
    }
  });

  // Delete all recordings from the bear
  $app->delete('/', function(Request $request, Response $response) {
    $uploads_dir = '/home/edwin/Music/uploads';
    unlink("$uploads_dir/*.mp3");
    $this->db->query("UPDATE audio set status='inactive'");
  });

  // Update a file in our table
  $app->put('/{id}', function(Request $request, Response $response) {
    $this->logger->addInfo("Updating audio file");
    $id = $request->getAttribute('route')->getArgument('id');
    //$filename = $request->getUri()->getQuery();
    $body = $request->getParsedBody();
    $newname = $body["name"];
    $filename = str_replace(' ', '_', $newname);
    $uploads_dir = '/home/edwin/Music/uploads';
    $file = $this->db->query("SELECT * from audio where audio_id=$id");
    //print_r($newname);
    $name = NULL;
    $filepath = NULL;
    foreach( $file as $row) {
      $name = $row["audio_name"];
    }

    rename("$uploads_dir/$name.mp3", "$uploads_dir/$newname.mp3");
    print_r("UPDATE audio set filepath='$uploads_dir/$filename.mp3', audio_name='$newname' where audio_id=$id");
    //$this->db->query("UPDATE audio set filepath='$uploads_dir/$newname.mp3', audio_name='$newname' where audio_id=$id");
  });

  // Delete a recording from the bear
  $app->delete('/{id}', function(Request $request, Response $response) {
    $this->logger->addInfo("Updating deactivating an audio file");
    $id = $request->getAttribute('route')->getArgument('id');
    $uploads_dir = '/home/edwin/Music/uploads';
    $file = $this->db->query("SELECT * from audio where audio_id=$id");
    //print_r($newname);
    $name = NULL;
    $filepath = NULL;
    foreach( $file as $row) {
      $name = $row["audio_name"];
    }
    unlink("$uploads_dir/$name.mp3");
    $this->db->query("UPDATE audio set status='inactive' where audio_id=$id");
  });

});

 ?>
