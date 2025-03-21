#!/bin/bash
cd backend
pip install -r requirements.txt
echo "Iniciando o servidor com Waitress..."
waitress-serve --port=5000 app:app