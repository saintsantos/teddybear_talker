#!/bin/bash

echo "This script will deploy all dependencies of teddybear talker"

sudo apt update
sudo apt install python3-dev python3-venv nginx hostapd dnsmasq device-tree-compiler git
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
mkdir ~/audio
