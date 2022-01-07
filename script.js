let canvas = document.getElementById("canvas");//canvas faz renderizações gráficas no site
let contexto = canvas.getContext("2d");
let caixa = 32;
let cobra = [];
cobra[0] = {
    x: 8*caixa,
    y: 8*caixa
}
let direcao = "direita"; //controla a direção da cobrinha.
let comida ={
    x: Math.floor(Math.random()* 15 +1)* caixa, //Math.random escolhe um número aleatório até 1.
    y: Math.floor(Math.random()* 15 +1)* caixa //Math.floor tira a parte flutuante (0.) desse número.
}; //Vai gerar números aleatórios tirando a parte flutuante até o número que foi setado.

let pontuacao = 0; //Define o valor da pontuação.

let pontos = document.getElementById('pontos'); //Coloca a pontuação no index.

let b = document.getElementById('b'); //Botão de borda

let borda = false //Declara a borda


b.onclick= () => {
    if (borda==false){
        borda = true 
        moldura.innerHTML = 'SIM'
    }
    else{
        borda = false
        moldura.innerHTML = 'NÃO'
    }
} //Função que ativa e desativa a borda

function criarBG(){
    contexto.fillStyle = "lightblue"; //Trabalha com o estilo do canvas.
    contexto.fillRect(0,0,16 * caixa, 16 * caixa); //Desenhará o espaço onde ocorrerá a renderização e trabalha com 4 parâmetros: posição de x e y, altura e largura.
}

function criarCobra() {
    for(i=0; i<cobra.length; i++) {
        contexto.fillStyle="green";
        contexto.fillRect(cobra[i].x, cobra[i].y, caixa, caixa);
    }
}

function maca (){
    contexto.fillStyle = "red";
    contexto.fillRect(comida.x, comida.y, caixa, caixa)
}

document.addEventListener('keydown', atualizar); //pega o evento de clique dos botões do teclado e vai chamar a função update.
document.addEventListener('keydown', tecla);
document.addEventListener('keydown', restart);

function tecla(b){
    if (b.keyCode==32){
        borda = true 
        moldura.innerHTML = 'SIM'
    }
    else{
        borda = false
        moldura.innerHTML = 'NÃO'
    }
} //Configura tecla de formação de borda

function restart(r){
    if (r.keyCode==82){
        reiniciar()
    }
} //configura tecla restart

function atualizar(event){
    if(event.keyCode == 37 && direcao != "direita") direcao = "esquerda"; 
    if(event.keyCode == 38 && direcao != "baixo") direcao = "cima";
    if(event.keyCode == 39 && direcao != "esquerda") direcao = "direita";//condicional não é utilizado para não haver a formação de duas cabeças
    if(event.keyCode == 40 && direcao != "cima") direcao = "baixo";
} //cria o movimento da cobrinha, apenas funcionará com esses botões.

function reiniciar (){
    clearInterval(play)
    window.location.reload()
}

function play(){
    if(!borda){
        if(cobra[0].x > 15*caixa && direcao =="direita") cobra[0].x = 0; //Faz a cobrinha atravessar de um lado ao outro da tela, na verdade é uma ilusão de ótica, o programa cria uma nova propriedade
        if(cobra[0].x < 0 && direcao =="esquerda") cobra[0].x = 16*caixa; //Podemos trocar a ação desse condicional pelo comando exit(), assim podemos encerrar nosso jogo.
        if(cobra[0].y > 15*caixa && direcao =="baixo") cobra[0].y = 0;
        if(cobra[0].y < 0 && direcao =="cima") cobra[0].y = 16*caixa;
    }else{
        if(cobra[0].x > 15*caixa && direcao =="direita") {
            reiniciar();
            alert('Fim de Jogo :( \n' + 'Jogar Novamente?');
        }
        if(cobra[0].x < 0 && direcao =="esquerda") {
            reiniciar();
            alert('Fim de Jogo :( \n' + 'Jogar Novamente?');
        }
        if(cobra[0].y > 15*caixa && direcao =="baixo") {
            reiniciar();
            alert('Fim de Jogo :( \n' + 'Jogar Novamente?');
        }
        if(cobra[0].y < 0 && direcao =="cima") {
            reiniciar();
            alert('Fim de Jogo :( \n' + 'Jogar Novamente?');
        }
    }

    for (i = 1; i < cobra.length; i++) {
        if(cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y){
            reiniciar();
            alert('Fim de Jogo :( \n' + 'Jogar Novamente?');
        }
    }
    
    criarBG();
    criarCobra();
    maca();

    let cobraX = cobra[0].x; //adiciona os movimentos para que a cobrinha tenha um ponto de partida
    let cobraY = cobra[0].y;

    if(direcao== "direita") cobraX += caixa;
    if(direcao== "esquerda") cobraX -= caixa;
    if(direcao== "cima") cobraY -= caixa;
    if(direcao== "baixo") cobraY += caixa;

    if(cobraX != comida.x || cobraY != comida.y) {
        cobra.pop();//tira o último elemento do array
    } else{
        comida.x = Math.floor(Math.random()* 15 + 1)* caixa;
        comida.y = Math.floor(Math.random()* 15 + 1)* caixa;

        pontuacao=pontuacao+ 100;
        pontos.innerHTML = pontuacao //Adiciona a pontuação.
    }

    let cabecaNova = {
        x: cobraX,
        y: cobraY
    }

    cobra.unshift(cabecaNova);//adiciona sempre um novo elemento.

}

let jogo = setInterval(play, 100); //passa o tempo de renovação da função dando continuidade ao jogo sem travamentos.


