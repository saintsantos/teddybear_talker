#!/usr/bin/env bash

sudo cp /home/pi/teddybear_talker/router/tabil /etc/nginx/sites-available/tabil
sudo ln -s /etc/nginx/sites-available /stc/nginx/sites-enabled

sudo cp /home/pi/teddybear_talker/router/tabil.service /etc/systemd/system/tabil.service
sudo systemctl daemon-reload
sudo systemctl start tabil
