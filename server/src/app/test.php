<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/test', function () use ($app) {
  $app->post('/event/{id}', function(Request $request, Response $response) {
    //Test the event audio
  });
  $app->post('/voice/{id}', function(Request $request, Response $response) {
    //Test the voice audio
  });
  $app->post('/jingle/{id}', function(Request $request, Response $response) {
    //Test the jingle audio
  });
});
?>
