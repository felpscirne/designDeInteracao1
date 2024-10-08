const terrain = document.getElementById('terrain');
const bgColorInput = document.getElementById('bgColor');
const addVenomButton = document.getElementById('addVenom');
const removeVenomButton = document.getElementById('removeVenom');
const terrainSizeControl = document.getElementById('terrainSize');
const speedControl = document.getElementById('speedControl');
const increaseAntsButton = document.getElementById('increaseAnts');
const decreaseAntsButton = document.getElementById('decreaseAnts');
const usernameInput = document.getElementById('username');
const startCounterButton = document.getElementById('startCounter');
const survivalTimeDisplay = document.getElementById('survivalTime');
const increaseTamanduasButton = document.getElementById('increaseTamanduas');
const decreaseTamanduasButton = document.getElementById('decreaseTamanduas');
const tamanduaSpeedControl = document.getElementById('tamanduaSpeedControl');

let ants = [];
let venomAreas = [];
let tamanduas = [];
let antCount = 10; // Contador de formigas
let tamanduaCount = 0; // Contador de tamanduás
let speed = 25; // Velocidade das formigas 
let tamanduaSpeed = 25; // Velocidade dos tamanduás
let survivalTime = 0; // Tempo de sobrevivência
let timer; // Timer para contar o tempo
let allAntsDead = false; // Estado para verificar se todas as formigas estão mortas
let gameStarted = false; // Estado para verificar se o jogo começou

// Função para criar formigas
function createAnts(num) {
    for (let i = 0; i < num; i++) {
        let ant = document.createElement('img'); 
        ant.classList.add('ant');
        ant.src = './img/ant.png';
        ant.style.position = 'absolute'; // Garantindo que a imagem seja posicionada corretamente
        ant.style.top = Math.random() * terrain.offsetHeight + 'px';
        ant.style.left = Math.random() * terrain.offsetWidth + 'px';
        terrain.appendChild(ant);
        ants.push(ant);
    }
}

// Função para criar tamanduás
function createTamanduas(num) {
    for (let i = 0; i < num; i++) {
        let tamandua = document.createElement('img');
        tamandua.classList.add('tamandua');
        tamandua.src = './img/tamandua.png';
        tamandua.style.position = 'absolute'; // Garantindo que a imagem seja posicionada corretamente
        tamandua.style.top = Math.random() * (terrain.offsetHeight - 30) + 'px';
        tamandua.style.left = Math.random() * (terrain.offsetWidth - 30) + 'px';
        terrain.appendChild(tamandua);
        tamanduas.push(tamandua);
    }
}

// Atualiza a cor de fundo do terreno
bgColorInput.addEventListener('input', function () {
    terrain.style.backgroundColor = bgColorInput.value;
});

// Remover todas as áreas venenosas
removeVenomButton.addEventListener('click', function () {
    venomAreas.forEach(venom => {
        terrain.removeChild(venom);
    });
    venomAreas = [];
});

// Botão adicionar área venenosa
addVenomButton.addEventListener('click', function () {
    let x = Math.random() * (terrain.offsetWidth - 40); // Ajusta para o tamanho da área venenosa
    let y = Math.random() * (terrain.offsetHeight - 40);
    addVenomArea(x, y);
});

// Adicionar área venenosa
function addVenomArea(x, y) {
    let venom = document.createElement('img');
    venom.src = '../img/venom.png';
    venom.classList.add('venom');
    venom.style.top = y + 'px';
    venom.style.left = x + 'px';
    terrain.appendChild(venom);
    venomAreas.push(venom);
}

// Ajustar tamanho do terreno
terrainSizeControl.addEventListener('input', function () {
    const newSize = terrainSizeControl.value;
    terrain.style.height = newSize + 'px';
    terrain.style.width = newSize + 'px'; // Adicionando ajuste de largura

    // Ajustar a posição das formigas para não sair dos limites do novo tamanho
    ants.forEach(ant => {
        let x = parseFloat(ant.style.left);
        let y = parseFloat(ant.style.top);
        if (x >= newSize) ant.style.left = (newSize - 30) + 'px';
        if (y >= newSize) ant.style.top = (newSize - 30) + 'px';
    });

    // Ajustar a posição dos tamanduás para não sair dos limites do novo tamanho
    tamanduas.forEach(tamandua => {
        let x = parseFloat(tamandua.style.left);
        let y = parseFloat(tamandua.style.top);
        if (x >= newSize) tamandua.style.left = (newSize - 30) + 'px';
        if (y >= newSize) tamandua.style.top = (newSize - 30) + 'px';
    });
});

// Aumentar formigas
increaseAntsButton.addEventListener('click', function () {
    antCount += 1; // Aumenta o número de formigas
    createAnts(1);
});

// Diminuir formigas
decreaseAntsButton.addEventListener('click', function () {
    if (ants.length > 0) {
        terrain.removeChild(ants.pop());
    }
});

// Aumentar tamanduás
increaseTamanduasButton.addEventListener('click', function () {
    tamanduaCount += 1; // Aumenta o número de tamanduás
    createTamanduas(1);
});

// Diminuir tamanduás
decreaseTamanduasButton.addEventListener('click', function () {
    if (tamanduas.length > 0) {
        terrain.removeChild(tamanduas.pop());
    }
});

// Iniciar contador
startCounterButton.addEventListener('click', function () {
    if (!gameStarted) {

      if(ants.length === 0) { alert("Adicione formigas para começar o jogo!"); return;}
      if(tamanduas.length === 0) { alert("Adicione tamanduás para começar o jogo!"); return;}
        
        const username = usernameInput.value || "Jogador"; // Captura o nome do jogador
        survivalTime = 0; // Reinicia o tempo de sobrevivência
        allAntsDead = false; // Reinicia o estado das formigas
        survivalTimeDisplay.textContent = survivalTime;
        gameStarted = true; // Marca que o jogo começou

        // Inicia o contador
        timer = setInterval(() => {
            if (!allAntsDead) {
                survivalTime++;
                survivalTimeDisplay.textContent = survivalTime;
            }
        }, 1000);

        // Inicia a movimentação das formigas e tamanduás
        setInterval(() => {
            if (!allAntsDead) {
                moveAnts();
                moveTamanduas();
            }
        }, 100);
    }
});

// Função para mover formigas
function moveAnts() {
    ants.forEach(ant => {
        let x = parseFloat(ant.style.left);
        let y = parseFloat(ant.style.top);
        let moveX = (Math.random() - 0.5) * speed * 2; 
        let moveY = (Math.random() - 0.5) * speed * 2; 

        // Impede que as formigas saiam dos limites do terreno
        if (x + moveX >= 0 && x + moveX <= terrain.offsetWidth - 30) {
            ant.style.left = (x + moveX) + 'px';
        }
        if (y + moveY >= 0 && y + moveY <= terrain.offsetHeight - 30) {
            ant.style.top = (y + moveY) + 'px';
        }

        // Verifica se a formiga está na área venenosa
        venomAreas.forEach(venom => {
            if (
                x < parseFloat(venom.style.left) + 40 &&
                x + 30 > parseFloat(venom.style.left) &&
                y < parseFloat(venom.style.top) + 40 &&
                y + 30 > parseFloat(venom.style.top)
            ) {
                terrain.removeChild(ant);
                ants = ants.filter(a => a !== ant); // Remove a formiga da lista
            }
        });
    });

    // Verifica se todas as formigas estão mortas
    if (ants.length === 0 && !allAntsDead) {
        allAntsDead = true;
        clearInterval(timer); // Para o contador
        alert(`Parabéns ${usernameInput.value || "Jogador"}, suas formigas viveram ${survivalTime} segundos!`);
        gameStarted = false; // Marca que o jogo terminou
    }
}

// Função para mover tamanduas
function moveTamanduas() {
    tamanduas.forEach(tamandua => {
        let x = parseFloat(tamandua.style.left);
        let y = parseFloat(tamandua.style.top);
        let moveX = (Math.random() - 0.5) * tamanduaSpeed * 1.5; 
        let moveY = (Math.random() - 0.5) * tamanduaSpeed * 1.5; 

        // Impede que os tamanduas saiam dos limites do terreno
        if (x + moveX >= 0 && x + moveX <= terrain.offsetWidth - 30) {
            tamandua.style.left = (x + moveX) + 'px';
        }
        if (y + moveY >= 0 && y + moveY <= terrain.offsetHeight - 30) {
            tamandua.style.top = (y + moveY) + 'px';
        }

        // Verifica se o tamandua toca alguma formiga
        ants.forEach(ant => {
            if (
                x < parseFloat(ant.style.left) + 30 &&
                x + 30 > parseFloat(ant.style.left) &&
                y < parseFloat(ant.style.top) + 30 &&
                y + 30 > parseFloat(ant.style.top)
            ) {
                terrain.removeChild(ant);
                ants = ants.filter(a => a !== ant); // Remove a formiga da lista
            }
        });
    });
}

// Atualiza a velocidade das formigas quando o controle é alterado
speedControl.addEventListener('input', function () {
    speed = parseFloat(speedControl.value);
});

// Atualiza a velocidade dos tamanduas quando o controle é alterado
tamanduaSpeedControl.addEventListener('input', function () {
    tamanduaSpeed = parseFloat(tamanduaSpeedControl.value);
});

// Inicializa o terreno e cria as formigas
createAnts(antCount);
