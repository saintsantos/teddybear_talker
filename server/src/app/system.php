<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/system', function () use ($app) {
  $app->post('/down', function(Request $request, Response $response) {
    exec('screen -X -S angular quit');
    exec('screen -X -S php quit');
    //This will bring down the server when it's called
  });

  $app->post('/reboot', function(Request $request, Response $response) {
    exec("sudo reboot");
    //This will reboot the raspberry pi
  });

  $app->post('/sneeze', function(Request $request, Response $response) {
    //Make the bear sneeze
    print_r("echo sneeze");
  });

  $app->post('/date', function(Request $request, Response $response) {
    //Updates the date and time of the bear
    $body = $request->getParsedBody();
    $day = $body["day"];
    $month = $body["month"];
    $year = $body["year"];
    $hour = $body["hour"];
    $minute = $body["minute"];
    $string = $day . " " . $month . " " . $year . " " . $hour . ":" . $minute . ":00";
    //print_r($string);
    exec("sudo date --set='$string'");
  });
  $app->post('/drop', function(Request $request, Response $response) {
    $this->db->exec('DROP TABLE IF EXISTS events');
    $this->db->exec('DROP TABLE IF EXISTS voice');
    $this->db->exec('DROP TABLE IF EXISTS jingle');
    $this->db->exec('CREATE TABLE IF NOT EXISTS events (
      event_id INTEGER PRIMARY KEY AUTOINCREMENT,
      timeDay TEXT,
      voice_id INTEGER,
      jingle_id INTEGER,
      day TEXT,
      status TEXT,
      foreign key (voice_id) references voice(voice_id),
      foreign key (jingle_id) references jingle(jingle_id)
    )');
    $this->db->exec('CREATE TABLE IF NOT EXISTS voice (
      voice_id INTEGER PRIMARY KEY AUTOINCREMENT,
      voice_name TEXT,
      voicepath TEXT,
      status TEXT
    )');
    $this->db->exec('CREATE TABLE IF NOT EXISTS jingle (
      jingle_id INTEGER PRIMARY KEY AUTOINCREMENT,
      jingle_name TEXT,
      jinglepath TEXT,
      status TEXT
    )');
    exec('rm -rf /home/pi/voice/');
    exec('mkdir /home/pi/voice/');
    exec('rm -rf /home/pi/jingle/');
    exec('mkdir /home/pi/jingle');
  });
});
?>
