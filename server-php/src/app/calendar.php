<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/calendar', function () use ($app) {

  // Get the entire week
  $app->get('/', function(Request $request, Response $response) {
    $this->logger->addInfo("Grabbing all events from a singe day");
    $day = $request->getAttribute('route')->getArgument('day');
    $day = strtolower($day);
    $events = $this->db->query("SELECT * from events inner join audio on audio.audio_id=events.file_id where events.status='active'");
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
      if($row["day"] == 'monday') {
        $event = array(
          'id' => (int)$row["id"],
          'timeDay' => $row["timeDay"],
          'file_id' => (int)$row["file_id"],
          'file_name' => $row["audio_name"]
        );
        array_push($monday, $event);
      } else if($row["day"] == 'tuesday') {
        $event = array(
          'id' => (int)$row["id"],
          'timeDay' => $row["timeDay"],
          'file_id' => (int)$row["file_id"],
          'file_name' => $row["audio_name"]
        );
        array_push($tuesday, $event);
      } else if($row["day"] == 'wednesday') {
        $event = array(
          'id' => (int)$row["id"],
          'timeDay' => $row["timeDay"],
          'file_id' => (int)$row["file_id"],
          'file_name' => $row["audio_name"]
        );
        array_push($wednesday, $event);
      } else if($row["day"] == 'thursday') {
        $event = array(
          'id' => (int)$row["id"],
          'timeDay' => $row["timeDay"],
          'file_id' => (int)$row["file_id"],
          'file_name' => $row["audio_name"]
        );
        array_push($thursday, $event);
      } else if($row["day"] == 'friday') {
        $event = array(
          'id' => (int)$row["id"],
          'timeDay' => $row["timeDay"],
          'file_id' => (int)$row["file_id"],
          'file_name' => $row["audio_name"]
        );
        array_push($friday, $event);
      } else if($row["day"] == 'saturday') {
        $event = array(
          'id' => (int)$row["id"],
          'timeDay' => $row["timeDay"],
          'file_id' => (int)$row["file_id"],
          'file_name' => $row["audio_name"]
        );
        array_push($saturday, $event);
      } else {
        $event = array(
          'id' => (int)$row["id"],
          'timeDay' => $row["timeDay"],
          'file_id' => (int)$row["file_id"],
          'file_name' => $row["audio_name"]
        );
        array_push($sunday, $event);
      }
    }
    $week = array(
      'monday' => $monday,
      'tuesday' => $tuesday,
      'wednesday' => $wednesday,
      'thursday' => $thursday,
      'friday' => $friday,
      'saturday' => $saturday,
      'sunday' => $sunday,
    );
    $json = json_encode($week, JSON_PRETTY_PRINT);
    $this->logger->addInfo("Events grabbed!");
    return $json;
  });

  // Add an event
  $app->post('/add', function(Request $request, Response $response) {
    //We gonna get the fill shit from the JSON object
    $this->logger->addInfo("Adding event");
    $body = $request->getParsedBody();
    $timeDay = $body["timeDay"];
    $file_id = $body["file_id"];
    $day = $body["day"];
    $day = strtolower($day);
    $check = $this->db->query("SELECT * from events where timeDay='$timeDay' and day='$day'");
    //print_r("SELECT * from events where timeDay='$timeDay' and day='$day'");
    if ($check->rowCount() > 0) {
      $id = NULL;
      foreach($check as $row) {
        $id = (int)$row["id"];
      }
      //print_r("UPDATE events set status='active', file_id=$file_id where id=$id");
      $this->db->query("UPDATE events set status='active', file_id=$file_id where id=$id");
    } else {
      //print_r("INSERT INTO events (timeDay, file_id, day, status) VALUES ('$timeDay', $file_id, '$day', 'active')");
      $this->db->query("INSERT INTO events (timeDay, file_id, day, status) VALUES ('$timeDay', $file_id, '$day', 'active')");
    }
  });

  // Testing endpoint
  $app->post('/test', function(Request $request, Response $response) {
    $body = $request->getParsedBody();
    $event = array(
      'timeDay' => $body["timeDay"],
      'file_id' => $body["file_id"],
      'day' => $body["day"]
    );
    print_r($body["timeDay"]);
  });

  //Grab all events for an entire day
  $app->get('/{day}', function(Request $request, Response $response) {
      $this->logger->addInfo("Grabbing all events from a singe day");
      $day = $request->getAttribute('route')->getArgument('day');
      $day = strtolower($day);
      $events = $this->db->query("SELECT * from events inner join audio on audio.audio_id=events.file_id where events.day='$day' and events.status='active'");
      $result = array();
      foreach( $events as $row) {
        $event = array(
          'id' => (int)$row["id"],
          'timeDay' => $row["timeDay"],
          'file_name' => $row["audio_name"]
        );
        array_push($result, $event);
      }
      $json = json_encode($result, JSON_PRETTY_PRINT);
      $this->logger->addInfo("Events grabbed!");
      return $json;
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
    $timeDay = $body["timeDay"];
    $file_id = $body["file_id"];
    $day = strtolower($body["day"]);
    //print_r("UPDATE events set timeDay='$timeDay', file_id=$file_id, day='$day' where id=$id");
    $events = $this->db->query("UPDATE events set timeDay='$timeDay', file_id=$file_id, day='$day' where id=$id");
  });

});

 ?>
