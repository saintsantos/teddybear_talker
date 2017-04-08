<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/calendar', function () use ($app) {

  //Grab all events for an entire day
  $app->get('/{day}', function(Request $request, Response $response) {
      $this->logger->addInfo("Grabbing all events from a singe day");
      $day = $request->getAttribute('route')->getArgument('day');
      $events = $this->db->query("SELECT * from events where day='$day'");
      $result = array();
      foreach( $events as $row) {
        //print_r($row["username"]);
        $event = array(
          'id' => (int)$row["id"],
          'hour' => (int)$row["hour"],
          'minute' => (int)$row["min"],
          'file_id' => (int)$row["file_id"]
        );
        array_push($result, $event);
      }
      $json = json_encode($result, JSON_PRETTY_PRINT);
      $this->logger->addInfo("Events grabbed!");
      return $json;
  });

  // Add an event
  $app->post('/{day}/{hour}/{minute}', function(Request $request, Response $response) {
    $this->logger->addInfo("Grabbing all events from a singe day");
    $day = $request->getAttribute('route')->getArgument('day');
  });

  // Get a single event
  $app->get('/{day}/{hour}/{minute}', function(Request $request, Response $response) {

  });

  // Remove an EVENT
  $app->delete('/{day}/{hour}/{minute}', function(Request $request, Response $response) {

  });

  // Update an event
  $app->put('/{day}/{hour}/{minute}', function(Request $request, Response $response) {

  });

  $app->get('/', function(Request $request, Response $response) {

  });



});

 ?>
