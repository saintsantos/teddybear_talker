<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/system', function () use ($app) {
  $app->get('/', function(Request $request, Response $response) {
    //print_r("Got it!");
    exec('/home/edwin/git/school/cse453/teddy_bear_talker/scripts/launch.sh');
  });
  $app->post('/down', function(Request $request, Response $response) {
    exec('/home/edwin/git/school/cse453/teddy_bear_talker/scripts/teardown.sh');
    //This will bring down the server when it's called
  });

  $app->post('/audio', function(Request $request, Response $response) {
    print_r("echo test audio");
    //This will test the audio
  });

  $app->post('/time', function(Request $request, Response $response) {
    print_r("echo update time");
    //This will update the time for the raspberry pi zero
  });

  $app->post('/reboot', function(Request $request, Response $response) {
    print_r("echo reboot bear");
    //This will reboot the raspberry pi
  });

  $app->post('/sneeze', function(Request $request, Response $response) {
    print_r("echo sneeze");
    //Testing sneeze functionality
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
