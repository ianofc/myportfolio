// Adiciona um efeito de scroll suave para links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Previne o comportamento padrão do link
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth' // Efeito de scroll suave
    });
  });
});

// Função para animar as partículas na cena
function animate() {
  requestAnimationFrame(animate); // Chama a função repetidamente
  particleSystem.rotation.y += 0.01; // Rotaciona o sistema de partículas
  renderer.render(scene, camera); // Renderiza a cena
}

// Inicializa a animação
animate(); // Chama a função para iniciar a animação

// Função para mudar o nome no cabeçalho
function changeHeaderName() {
  const headerName = document.getElementById("header-name"); // Seleciona o elemento do cabeçalho
  const currentText = headerName.textContent; // Obtém o texto atual
  // Troca o texto entre "Ian Santos" e sua representação hexadecimal
  if (currentText === "Ian Santos") {
    headerName.textContent = "49616e2053616e746f73"; // Representação hexadecimal
    headerName.classList.add("hexadecimal"); // Adiciona a classe para aplicar estilo
  } else {
    headerName.textContent = "Ian Santos"; // Retorna ao texto original
    headerName.classList.remove("hexadecimal"); // Remove a classe ao voltar
  }
}

// Adiciona o evento mouseenter para o botão "Contrate-me!"
const button = document.getElementById('hire-me'); // Seleciona o botão "Contrate-me"
button.addEventListener('mouseenter', () => {
  button.classList.add('animate-explode'); // Adiciona a classe de animação

  // Redireciona após 5 segundos
  setTimeout(() => {
    window.location.href = 'contact'; // Altera para o caminho correto da sua página de contato
  }, 5000); // Tempo para esperar antes de redirecionar
});

// GSAP para a animação dos links de navegação
const navLinks = document.querySelectorAll('.nav-link'); // Seleciona todos os links de navegação

// Adiciona animação de escala ao passar o mouse nos links
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    gsap.to(link, { scale: 1.1, duration: 0.2 }); // Aumenta a escala do link
  });

  link.addEventListener('mouseleave', () => {
    gsap.to(link, { scale: 1, duration: 0.2 }); // Retorna a escala ao normal
  });
});

// Configuração básica do Three.js
const scene = new THREE.Scene(); // Cria uma nova cena
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Cria uma câmera
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Cria um renderizador
renderer.setSize(window.innerWidth, window.innerHeight); // Define o tamanho do renderizador
document.body.appendChild(renderer.domElement); // Adiciona o renderizador ao corpo do documento

// Criar partículas
const particleGeometry = new THREE.BufferGeometry(); // Cria a geometria das partículas
const particleCount = 1000; // Define o número de partículas
const positions = new Float32Array(particleCount * 3); // Array para armazenar as posições das partículas

// Preenche as posições das partículas com valores aleatórios
for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 100; // Posição X
  positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // Posição Y
  positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // Posição Z
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)); // Define as posições na geometria

const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 }); // Material para as partículas
const particleSystem = new THREE.Points(particleGeometry, particleMaterial); // Cria o sistema de partículas
scene.add(particleSystem); // Adiciona o sistema de partículas à cena

// Ajusta a posição da câmera
camera.position.z = 50; // Define a posição da câmera

// Adiciona um evento de redimensionamento da janela
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight; // Atualiza a proporção da câmera
  camera.updateProjectionMatrix(); // Atualiza a matriz de projeção
  renderer.setSize(window.innerWidth, window.innerHeight); // Atualiza o tamanho do renderizador
});

// Inicializa a animação
animate(); // Chama a função para iniciar a animação

fetch('https://ianofc-portfolio.onrender.com/api/images')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Manipule os dados recebidos
    })
    .catch(error => {
        console.error('Erro ao buscar imagens:', error);
    });
