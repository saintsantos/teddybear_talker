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
});
?>
