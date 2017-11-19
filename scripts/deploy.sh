#!/bin/bash

sudo cp tabil /etc/nginx/sites-available/tabil
sudo ln -s /etc/nginx/sites-available/tabil /etc/nginx/sites-enabled/tabil
sudo rm /etc/nginx/sites-enabled/default
sudo rm /etc/nginx/sites-available/default

sudo cp /home/pi/teddybear_talker/services/tabil.service /etc/systemd/system/tabil.service
sudo cp /home/pi/teddybear_talker/services/flex.service /etc/systemd/system/flex.service
sudo systemctl daemon-reload
sudo systemctl enable tabil
sudo systemctl enable flex
sudo systemctl start tabil
sudo systemctl start flex
