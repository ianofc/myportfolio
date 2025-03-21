import os

class Config:
    SECRET_KEY = os.urandom(24)  # Chave secreta para o Flask
