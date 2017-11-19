#!/bin/bash

# Install necessary packages
sudo apt install python3-dev git python3-venv nginx hostapd dnsmasq
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
source ~/.bashrc
nvm install node

# build frontend
cd /home/pi/teddybear_talker/frontend
npm run build

# nginx configuration
sudo cp tabil /etc/nginx/sites-available/tabil
sudo ln -s /etc/nginx/sites-available/tabil /etc/nginx/sites-enabled/tabil
sudo rm /etc/nginx/sites-enabled/default
sudo rm /etc/nginx/sites-available/default

#backup all essentials
sudo mv /etc/network/interfaces /etc/network/interfaces.orig
sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig
sudo mv /etc/hostapd/hostapd.conf /etc/hostapd/hostapd.conf.orig

# networking setup
sudo mv /home/pi/teddybear_talker/router/interfaces /etc/network/interfaces
sudo mv /home/pi/teddybear_talker/router/dnsmasq.conf /etc/dnsmasq.conf
sudo mv /home/pi/teddybear_talker/router/hostapd.conf /etc/hostapd/hostapd.conf
sudo systemctl restart dnsmasq
sudo systemctl restart hostapd

# Service setup
sudo cp /home/pi/teddybear_talker/services/tabil.service /etc/systemd/system/tabil.service
sudo cp /home/pi/teddybear_talker/services/flex.service /etc/systemd/system/flex.service
sudo systemctl restart nginx
sudo systemctl daemon-reload
sudo systemctl enable tabil
sudo systemctl enable flex
sudo systemctl start tabil
sudo systemctl start flex
