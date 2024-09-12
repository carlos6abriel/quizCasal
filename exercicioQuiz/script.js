let questaoAtual = 0;
function mostrarConteudo() {
    if (questions[questaoAtual]) {
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.questionArea .question').innerHTML = questions[questaoAtual].question;
        let option = '';
        for (let i in questions[questaoAtual].options) {
            option += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>${questions[questaoAtual].options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = option;

        document.querySelectorAll('.option').forEach((item) => {
            item.addEventListener('click', opcaoClicada);
        });

        let pctBarra = (questaoAtual / questions.length) * 100;
        document.querySelector('.progress--bar').style.width = `${pctBarra}%`;

        trocarPhotos();
    } else {
        finalizarQuiz();
    }
}



mostrarConteudo();



let audioAcertou = document.querySelector('#audio-acertou');
let audioErrou = document.querySelector('#audio-errou');

let opcoesCorretas = 0;

function opcaoClicada(event) {
    let opClicada = parseInt(event.target.getAttribute('data-op'));

    if (questions[questaoAtual].answer === opClicada) {
        opcoesCorretas++;
        if (audioAcertou) {
            audioErrou.pause();
            audioAcertou.currentTime = 0;
            audioAcertou.play();
        }
    } else {
        if (audioErrou) {
            audioAcertou.pause();
            audioErrou.currentTime = 0;
            audioErrou.play();
        }
    }

    questaoAtual++;
    mostrarConteudo();
}


let audioAcertouTodas = document.querySelector('#audio-acertou-todas');
let audioErrouAinda1 = document.querySelector('#audio-errou-alguma1');
let audioErrouAinda2 = document.querySelector('#audio-errou-alguma2');

let pctUsuario = 0;

function finalizarQuiz() {
    let pctUsuario = (opcoesCorretas / questions.length) * 100;

    document.querySelector('.progress--bar').style.width = '100%';

    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.scoreArea').style.display = 'block';

    let congrats = '';
    if (opcoesCorretas < 10) {
        audioErrou.pause();
        audioAcertou.pause();
        audioErrouAinda1.play();
        setTimeout(() => {
            audioErrouAinda2.play();
        }, 2500)
        congrats = 'Você não me ama mais?'
        document.querySelector('.photos').style.backgroundImage = `url('assets/imgs/celebrity-cry-faces-10182013-19-820x518.webp')`;
        document.querySelector('.scorePct').innerHTML = `Acertou apenas ${pctUsuario}%... já entendi tudo.`;
    } else {
        audioErrou.pause();
        audioAcertou.pause();
        audioAcertouTodas.play();
        congrats = 'Te amo, te amo, te amo!</br> Ai de você se não acertasse todas.'
        document.querySelector('.photos').style.display = 'none'
        document.querySelector('body').style.backgroundImage = `url('assets/imgs/WhatsApp\ Image\ 2024-09-12\ at\ 2.28.54\ PM.jpeg')`;
        // document.querySelector('body').style.backgroundRepeat = 'no-repeat';
        document.querySelector('body').style.backgroundSize = 'contain';
        document.querySelector('body').style.backgroundPosition = 'center';
        document.querySelector('.scorePct').innerHTML = `Acertou ${pctUsuario}%`;
    }
    document.querySelector('.scoreText1').innerHTML = congrats;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu 10 questões e acertou ${opcoesCorretas}.`;
}



document.querySelector('button').addEventListener('click', resetarQuiz);

function resetarQuiz() {
    questaoAtual = 0;
    opcoesCorretas = 0;
    pctUsuario = 0;

    document.querySelector('.progress--bar').style.width = '0%';

    mostrarConteudo();

    audioAcertouTodas.pause();
    audioErrouAinda1.pause();
    audioErrouAinda2.pause();
}

function trocarPhotos(){
    if(questaoAtual === 0){
        document.querySelector('.photos').style.backgroundImage = `url('assets/imgs/foto1.jfif')`;
        document.querySelector('body').style.backgroundColor = '#d7ebf1';
    } else if (questaoAtual === 1){
        document.querySelector('.photos').style.backgroundImage = `url('assets/imgs/foto2.jfif')`;
        document.querySelector('body').style.backgroundColor = '#87ceeb';
    }else if (questaoAtual === 2){
        document.querySelector('.photos').style.backgroundImage = `url('assets/imgs/foto3.jfif')`;
        document.querySelector('body').style.backgroundColor = '#00bfff';
    }else if (questaoAtual === 3){
        document.querySelector('.photos').style.backgroundImage = `url('assets/imgs/foto4.jfif')`;
        document.querySelector('body').style.backgroundColor = '#f0fff0';
    }else if (questaoAtual === 4){
        document.querySelector('.photos').style.backgroundImage = `url('assets/imgs/foto5.jfif')`;
        document.querySelector('body').style.backgroundColor = '#fffff0';
    }else if (questaoAtual === 5){
        document.querySelector('.photos').style.backgroundImage = `url('assets/imgs/foto6.jfif')`;
        document.querySelector('body').style.backgroundColor = '#96b4c4';
    }else if (questaoAtual === 6){
        document.querySelector('.photos').style.backgroundImage = `url('assets/imgs/foto7.jfif')`;
        document.querySelector('body').style.backgroundColor = '#ba986b';
    }else if (questaoAtual === 7){
        document.querySelector('.photos').style.backgroundImage = `url('assets/imgs/foto8.jfif')`;
        document.querySelector('body').style.backgroundColor = '#f0fff0';
    }else if (questaoAtual === 8){
        document.querySelector('.photos').style.backgroundImage = `url('assets/imgs/foto9.jfif')`;
        document.querySelector('body').style.backgroundColor = '#87ceeb';
    } else {
        document.querySelector('.photos').style.backgroundImage = `url('assets/imgs/foto10.jfif')`;
        document.querySelector('body').style.backgroundColor = '#add8e6';
    }
}