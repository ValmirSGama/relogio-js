// Obter referências para elementos DOM 
const body = document.querySelector("body"),
    hourHand = document.querySelector(".hour"),
    minuteHand = document.querySelector(".minute"),
    secondHand = document.querySelector(".second"),
    modeSwitch = document.querySelector(".mode-switch"),
    soundSwitch = document.querySelector(".sound-switch"),
    clock = document.querySelector(".clock");

    let soundOn = true; // Variável para controlar o estado do som

// Verificar se o modo já está definido como "Dark Mode" no armazenamento local
if (localStorage.getItem("mode") === "Dark Mode") {
    // Adicionar a classe "dark" ao body e definir o texto modeSwitch como "Light Mode"
    body.classList.add("dark");
    modeSwitch.textContent = "Light Mode";
}

// Adicione um ouvinte de evento de clique ao modeSwitch
modeSwitch.addEventListener("click", () => {
    // Alterne a classe "dark" no elemento body
    body.classList.toggle("dark");
    // Verifique se a classe "dark" está presente no elemento body
    const isDarkMode = body.classList.contains("dark");
    // Defina o texto do modeSwitch com base na presença da classe "Dark Mode"
    modeSwitch.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    // Defina o valor de armazenamento local com base na presença da classe "Dark Mode"
    localStorage.setItem("mode", isDarkMode ? "Dark Mode" : "Light Mode");
});

// Função para criar marcas de 60 segundos ao redor do relógio, responsiva ao tamanho do relógio
const createSecondMarks = () => {
    const secondMarksContainer = document.createElement("div");
    secondMarksContainer.classList.add("second-marks");

    const updateMarks = () => {
        const clockDiameter = clock.offsetWidth; // Obter o diâmetro do relógio dinamicamente

        // Limpar marcas anteriores
        secondMarksContainer.innerHTML = "";

        // Criar marcas de 60 segundos
        for (let i = 0; i < 60; i++) {
            const mark = document.createElement("div");

            // Calcular o valor translateY dinamicamente com base no tamanho do relógio
            const translateYValue = -(clockDiameter / 2 - 10); // Ajuste para manter as marcas dentro do relógio

            // Gire cada marca e posicione-a responsivamente
            mark.style.transform = `rotate(${i * 6}deg) translateY(${translateYValue}px)`;

            // Cada 5ª marca recebe um estilo especial para visibilidade
            if (i % 5 === 0) {
                mark.classList.add("big-mark"); // Classe para marcas maiores
            }

            secondMarksContainer.appendChild(mark);
        }
    };

    // Anexe o segundo contêiner de marcas ao relógio
    clock.appendChild(secondMarksContainer);

    // Atualize as marcas quando a janela for redimensionada para mantê-las responsivas
    window.addEventListener("resize", updateMarks);

    // Chamada inicial para criar e posicionar as marcas
    updateMarks();
};

// Chame a função para criar as segundas marcas
createSecondMarks();

// Carregar o som "tic-tac"
const tickSound = new Audio("audio/tic-tac.mp3");

// Função para atualizar o tempo e tocar o som, se o som estiver ligado
const updateTime = () => {
    // Obter a hora atual e calcular graus para os ponteiros do relógio
    let date = new Date(),
        secToDeg = (date.getSeconds() / 60) * 360,
        minToDeg = (date.getMinutes() / 60) * 360,
        hrToDeg = (date.getHours() / 12) * 360;

    // Girar os ponteiros do relógio para o grau apropriado com base na hora atual
    secondHand.style.transform = `rotate(${secToDeg}deg)`;
    minuteHand.style.transform = `rotate(${minToDeg}deg)`;
    hourHand.style.transform = `rotate(${hrToDeg}deg)`;

       // Reproduzir o som de "tic-tac" apenas se o som estiver ligado
       if (soundOn) {
        tickSound.currentTime = 0;  // Reiniciar o som
        tickSound.play();           // Tocar o som
    }          
};

// Inicie a atualização do relógio a cada segundo
setInterval(updateTime, 1000);

// Chamar a função updateTime no carregamento da página
updateTime();

// Adicionar um ouvinte de evento de clique ao soundSwitch para ligar/desligar o som
soundSwitch.addEventListener("click", () => {
    soundOn = !soundOn; // Alterna o estado do som
    soundSwitch.textContent = soundOn ? "Som On" : "Som Off"; // Atualiza o texto do botão
});
