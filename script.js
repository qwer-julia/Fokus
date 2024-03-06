const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
let tempoDecorridoEmSegundos = 5;
const startPauseBt = document.querySelector('#start-pause');
let intervaloId = null;
const somPause = new Audio('./sons/pause.mp3');
const somPlay = new Audio('./sons/play.wav');
const somZerar = new Audio('./sons/beep.mp3');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const imagemBotaoComecarOuPausar = document.querySelector('.app__card-primary-butto-icon')
const divTimer = document.querySelector('#timer')

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
            musica.play()
        } else {
            musica.pause()
        }
})
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 5
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    
    switch (contexto){
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        //somZerar.play()
        alert('Tempo finalizado');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo){
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        zerar();
        somPause.play();
        return;
    }
    somPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000);
    imagemBotaoComecarOuPausar.setAttribute ('src','./imagens/pause.png');
    iniciarOuPausarBt.innerHTML = "<strong>Pausar</strong>";
}

function zerar(){
    clearInterval(intervaloId);
    imagemBotaoComecarOuPausar.setAttribute ('src','./imagens/play_arrow.png');
    iniciarOuPausarBt.innerHTML = "<strong>Começar</strong>";
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    divTimer.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();