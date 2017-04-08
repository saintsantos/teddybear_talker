<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/calendar', function () use ($app) {

  //Grab all events for an entire day
  $app->get('/{day}', function(Request $request, Response $response) {
      $this->logger->addInfo("Grabbing all events from a singe day");
      $day = $request->getAttribute('route')->getArgument('day');
      $events = $this->db->query("SELECT * from events where day='$day' and status='active'");
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
  $app->post('/add', function(Request $request, Response $response) {
    //We gonna get the fill shit from the JSON object
    $this->logger->addInfo("Adding event");
    $body = $request->getParsedBody();
    $hour = $body["hour"];
    $minute = $body["minute"];
    $file_id = $body["file_id"];
    $day = $body["day"];
    $check = $this->db->query("SELECT * from events where hour=$hour and min=$minute and day='$day' and status='inactive'");
    if (empty($check)) {
      $this->db->query("INSERT into events (id, hour, min, file_id, day, status) values (default, $hour, $minute, $file_id, '$day', 'active')");
    } else {
      $id = NULL;
      foreach( $check as $row) {
        $id = $row["id"];
      }
      //Still slightly busted
      //print_r($id);
      //$this->db->query("UPDATE events set status='active', file_id=$file_id where id=$id");
    }

  });

  // Remove an EVENT
  $app->delete('/{id}', function(Request $request, Response $response) {
    $id = $request->getAttribute('route')->getArgument('id');
    $this->logger->addInfo("Deleting event id=$id");
    $events = $this->db->query("UPDATE events set status='inactive' where id='$id'");

  });

  // Update an event
  $app->put('/{id}', function(Request $request, Response $response) {
    // Get the shit to update the event from the JSON object
    $id = $request->getAttribute('route')->getArgument('id');
    $this->logger->addInfo("Updating event id=$id");
    $body = $request->getParsedBody();
    $hour = $body["hour"];
    $minute = $body["minute"];
    $file_id = $body["file_id"];
    $day = $body["day"];
    $events = $this->db->query("UPDATE events set hour=$hour, min=$minute, file_id=$file_id, day='$day' where id=$id");
  });

  // Get the entire week
  $app->get('/', function(Request $request, Response $response) {
    $this->logger->addInfo("Grabbing all events from a singe day");
    $day = $request->getAttribute('route')->getArgument('day');
    $events = $this->db->query("SELECT * from events");
    $result = array();
    $monday = array();
    $tuesday = array();
    $wednesday = array();
    $thursday = array();
    $friday = array();
    $saturday = array();
    $sunday = array();
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

  });



});

 ?>
