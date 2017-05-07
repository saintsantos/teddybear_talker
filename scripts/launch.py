#! /usr/bin/env python2.7
import subprocess
subprocess.call(['screen', '-d', '-m', '-S', 'angular', './frontend.sh'])
subprocess.call(['screen', '-d', '-m', '-S', 'php', './backend.sh'])
