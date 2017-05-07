<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->group('/test', function () use ($app) {
  $app->post('/event/{id}', function(Request $request, Response $response) {
    $id = $request->getAttribute('route')->getArgument('id');
    exec("/home/edwin/git/school/cse453/teddy_bear_talker/scripts/testaudio.py event $id");
  });
  $app->post('/voice/{id}', function(Request $request, Response $response) {
    $id = $request->getAttribute('route')->getArgument('id');
    exec("/home/edwin/git/school/cse453/teddy_bear_talker/scripts/testaudio.py voice $id");
  });
  $app->post('/jingle/{id}', function(Request $request, Response $response) {
    $id = $request->getAttribute('route')->getArgument('id');
    exec("/home/edwin/git/school/cse453/teddy_bear_talker/scripts/testaudio.py jingle $id");
  });
});
?>
