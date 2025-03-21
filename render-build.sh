#!/bin/bash
cd backend
pip install -r requirements.txt
echo "Iniciando o servidor Flask..."
python -m flask run --host=0.0.0.0 --port=5000