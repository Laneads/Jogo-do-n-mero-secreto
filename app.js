let listadenumsorteados = [];
let numeroLimite = 100;
let numeroAleatorio = numAleatorio();
let tentativas = 1 ;

function enviartexto (tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirmensaginicial (){
    enviartexto('h1', 'Jogo do número secreto');
    enviartexto('p', 'Escolha um numero entre 1 e 100!');
}

exibirmensaginicial();

function verificarChute(){
    //console.log('O botão foi clicado');
    /*alert('Eu amo JS');
    let cidade = prompt('Insira uma cidade do Brasil');
    alert(`Estive em ${cidade} e lembrei de você`);
    let valor1 = parseInt(prompt('Insira um valor'));
    let valor2 = parseInt(prompt('Insira outro valor'));
    let resultado = valor1 + valor2;
    console.log(resultado);
    alert(`A soma dos valores é ${resultado}`);*/
    console.log(numeroAleatorio);
    let chute = document.querySelector('input').value;
    
        if (chute == numeroAleatorio){
            enviartexto ('h1', 'Acertou !!');
            let palavratent = tentativas > 1 ? 'tentativas' : 'tentativa';
            let mensagemTent = `Você descobriu o número secreto com ${tentativas} ${palavratent}`;
            enviartexto ('p', mensagemTent);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else{
            if (chute > numeroAleatorio){
                enviartexto('p', 'O número é menor');
            }else{
                enviartexto('p', 'O número é maior');
            }
            tentativas++;
            limparCampo();
        }
}

function numAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listadenumsorteados.length;
   
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listadenumsorteados = [];
    }
    if (listadenumsorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }else{
        listadenumsorteados.push(numeroEscolhido);
        console.log(listadenumsorteados)
        return numeroEscolhido;
    }
}

function limparCampo (){
    chute = document.querySelector('input');
    chute.value = '';

}

function reiniciarJogo() {
    numeroAleatorio = numAleatorio();
    limparCampo();
    tentativas = 1 ;
    exibirmensaginicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}