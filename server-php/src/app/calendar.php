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
          'id' => $row["id"],
          'hour' => $row["hour"],
          'minute' => $row["min"],
          'file_id' => $row["file_id"]
        );
        array_push($result, $event);
      }
      $json = json_encode($result, JSON_PRETTY_PRINT);
      $this->logger->addInfo("Events grabbed!");
      return $json;
  });

});

 ?>
