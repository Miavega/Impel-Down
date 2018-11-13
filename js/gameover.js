GameState.gameover = function (game) { };
GameState.gameover.prototype = {
    create: function () {

        this.buttonContinue = [this.add.button(0, 0, 'gameover',this.callCreditos,this),this.add.button(0, 0, 'creditos',this.startGame,this)];
        this.buttonContinue[1].visible = false;

        this.musica = this.game.add.audio('musicCreditos');
        this.musica.play();
    },
    callCreditos(){
      this.buttonContinue[0].visible = false;
      this.buttonContinue[1].visible = true;
    },
    startGame: function () {
        //CAMBIO DE ESTADO A JUEGO
        this.musica.stop();
        this.game.state.start('Inicio');
    }
};