#!/bin/bash
pip install --upgrade pip setuptools wheel
pip install flask==2.3.3 flask-cors==4.0.0 qrcode==7.4.2 gunicorn==21.2.0
pip install --only-binary=Pillow "Pillow>=10.4.0"