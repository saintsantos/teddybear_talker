<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/voice', function () use ($app) {

  //public function getUsers(Request $request, Response $response) {
  $app->get('/', function(Request $request, Response $response) {
      $this->logger->addInfo("Grabbing all files from the backend");
      $files = $this->db->query("SELECT * from audio");
      $result = array();
      foreach( $files as $row) {
        //print_r($row["username"]);
        $file = array(
          'id' => (int)$row["id"],
          'name' => $row["audio_name"],
          'path' => $row["filepath"],
          'status' => $row["status"]
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
    $files = $request->getUploadedFiles();
    if (empty($files['audio'])) {
      throw new Exception('Expected an audio file');
    }

    $newfile = $files['audio'];

    if ($newfile->getError() === UPLOAD_ERR_OK) {
      $uploadFileName = $newfile->getClientFilename();
      $newfile->moveTo("/home/edwin/Music/uploads/$uploadFileName");
    }

  });

  // Update a file in our table
  $app->put('/{id}', function(Request $request, Response $response) {
    $this->logger->addInfo("Updating audio file");
    $id = $request->getAttribute('route')->getArgument('id');
    //$filename = $request->getUri()->getQuery();
    $body = $request->getParsedBody();
    $newname = $body["name"];
    $uploads_dir = '/home/edwin/Music/uploads';
    $file = $this->db->query("SELECT * from audio where id=$id");
    print_r($newname);
    $name = NULL;
    $filepath = NULL;
    foreach( $file as $row) {
      $name = $row["audio_name"];
    }

    rename("$uploads_dir/$name.mp3", "$uploads_dir/$newname.mp3");
    $this->db->query("UPDATE audio set filepath='$uploads_dir/$newname.mp3', audio_name='$newname' where id=$id");
  });

  // Delete a recording from the bear
  $app->delete('/{id}', function(Request $request, Response $response) {
    $this->logger->addInfo("Updating deactivating an audio file");
    $id = $request->getAttribute('route')->getArgument('id');
    $uploads_dir = '/home/edwin/Music/uploads';
    $file = $this->db->query("SELECT * from audio where id=$id");
    print_r($newname);
    $name = NULL;
    $filepath = NULL;
    foreach( $file as $row) {
      $name = $row["audio_name"];
    }
    unlink("$uploads_dir/$name.mp3");
    $this->db->query("UPDATE audio set status='inactive' where id=$id");
  });

  // Delete all recordings from the bear
  $app->delete('/', function(Request $request, Response $response) {
    $uploads_dir = '/home/edwin/Music/uploads';
    unlink("$uploads_dir/*.mp3");
    $this->db->query("UPDATE audio set status='inactive'");
  });

});

 ?>
