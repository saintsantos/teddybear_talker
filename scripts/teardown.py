#! /usr/bin/env python2.7
import subprocess
subprocess.call(['screen', '-X', '-S', 'angular', 'quit'])
subprocess.call(['screen', '-X', '-S', 'php', 'quit'])
