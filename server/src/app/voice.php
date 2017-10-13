<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
$app->group('/voice', function () use ($app) {
  //public function getUsers(Request $request, Response $response) {
  $app->get('/', function(Request $request, Response $response) {
      $this->logger->addInfo("Grabbing all voices from the backend");
      $voices = $this->db->query("SELECT * from voice where status='active'");
      $result = array();
      foreach( $voices as $row) {
        $voice = array(
          'voice_id' => (int)$row["voice_id"],
          'voice_name' => $row["voice_name"],
          'voicepath' => $row["voicepath"]
        );
        array_push($result, $voice);
      }
      $json = json_encode($result, JSON_PRETTY_PRINT);
      $this->logger->addInfo("All voices sent to frontend");
      return $json;
  });

  // Receive file upload
  $app->post('/upload', function(Request $request, Response $response) {
    //$voicedir = '/home/edwin/Music/voice';
    $files = $request->getUploadedFiles();
    $this->logger->addInfo("Received file");
    if (empty($files['file'])) {
      $this->logger->addInfo("Error expected an mp3 file");
      throw new Exception('Expected a .mp3 file');
    }
    $newfile = $files['file'];
    if ($newfile->getError() === UPLOAD_ERR_OK) {
      $this->logger->addInfo("Grabbed filename");
      $uploadFileName = $newfile->getClientFilename();
    }
    $name = chop($uploadFileName, ".mp3");
    $result = $this->db->query("SELECT * from voice where voice_name='$name'");
    if ($result->rowCount() > 0) {
      $status = NULL;
      foreach($result as $row) {
        $status = $row["status"];
      }
      if ($status == 'active') {
        $this->logger->addInfo("Song exists in database");
        throw new Exception('Song name already exists in database.');
      } else {
        $id = NULL;
        foreach($result as $row) {
          $id = $row["voice_id"];
        }
        $this->logger->addInfo("File in database under same name, but inactive");
        $newfile->moveTo("$this->voicedir/$uploadFileName");
        $this->db->query("UPDATE voice set voice_name='$name', voicepath='$this->voicedir/$uploadFileName' where voice_id=$id");
      }
    } else {
      $this->logger->addInfo("Song is a new file");
      $newfile->moveTo("$this->voicedir/$uploadFileName");
      $this->db->query("INSERT into voice (voice_name, voicepath, status) values ('$name', '$this->voicedir/$uploadFileName', 'active')");
    }
  });

  // Delete all recordings from the bear
  $app->delete('/', function(Request $request, Response $response) {
    //$voicedir = '/home/edwin/Music/voice';
    unlink("$this->voicedir/*.mp3");
    $this->db->query("UPDATE voice set status='inactive'");
  });

  // Update a file in our table
  $app->put('/{id}', function(Request $request, Response $response) {
    $this->logger->addInfo("Updating voice file");
    //$voicedir = '/home/edwin/Music/voice';
    $id = $request->getAttribute('route')->getArgument('id');
    $body = $request->getParsedBody();
    $newname = $body["voice_name"];
    $voicename = str_replace(' ', '_', $newname);
    $voicepath = $body["voicepath"];
    $file = $this->db->query("SELECT * from voice where voice_id=$id");
    $name = NULL;
    foreach( $file as $row) {
      $name = $row["voice_name"];
    }

    rename("$voicepath", "$this->voicedir/$voicename.mp3");
    $this->db->query("UPDATE voice set voicepath='$this->voicedir/$voicename.mp3', voice_name='$newname' where voice_id=$id");
  });

  // Delete a recording from the bear
  $app->delete('/{id}', function(Request $request, Response $response) {
    //$voicedir = '/home/edwin/Music/voice';
    $this->logger->addInfo("Updating deactivating an voice file");
    $id = $request->getAttribute('route')->getArgument('id');
    $file = $this->db->query("SELECT * from voice where voice_id=$id");
    $voicepath = NULL;
    foreach( $file as $row) {
      $voicepath = $row["voicepath"];
    }
    unlink("$voicepath");
    $this->db->query("UPDATE voice set status='inactive' where voice_id=$id");
    $this->db->query("UPDATE events set status='inactive' where voice_id=$id");
  });

});

 ?>