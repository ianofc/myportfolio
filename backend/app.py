from flask import Flask, render_template, jsonify
import requests 
import os 

app = Flask(__name__, static_folder='../frontend/static', template_folder='../frontend')

# Definindo a rota principal
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/skills')
def skills():
    return render_template('skills.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/hireme')
def hireme():
    return render_template('hireme.html')

@app.route('/projects')
def projects():
    github_username = "ianofc"  # Substitua pelo seu username do GitHub
    url = f"https://api.github.com/users/{github_username}/repos"
    response = requests.get(url)
    projects = response.json()  # Lista de projetos do GitHub
    return render_template('projects.html', projects=projects)

# Rota para obter as imagens da pasta 'back'
@app.route('/api/images')
def get_images():
    images_dir = os.path.join(app.static_folder, 'memory', 'back')
    images = sorted([f for f in os.listdir(images_dir) if f.endswith('.png')])  # Filtra e ordena arquivos .png
    return jsonify(images)

if __name__ == '__main__':
    app.run(debug=True)