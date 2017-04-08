<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/files', function () use ($app) {

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

  });

  // Delete a recording from the bear
  $app->delete('/{id}', function(Request $request, Response $response) {

  });

  // Delete all recordings from the bear
  $app->delete('/', function(Request $request, Response $response) {

  });

});

 ?>
