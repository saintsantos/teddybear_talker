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
          'id' => $row["id"],
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

});

 ?>
