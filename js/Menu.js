GameState.Menu = function (game) { };
GameState.Menu.prototype = {
    create: function () {
        //FONDO DE PANTALLA
        this.add.sprite(0, 0, 'screen-mainmenu');
        //TEXTO NOMBRE JUEGO
        this.gameTitle = this.add.sprite(GameState._WIDTH*0.02, 100, 'title');
        //BOTON DE INICIO
        this.startButton = this.add.button(GameState._WIDTH * 0.53, 600, 'button-start', this.startGame, this, 0, 1, 2);
        this.startButton.anchor.set(0.5, 0);
        this.startButton.input.useHandCursor = true;
    },
    startGame: function () {
        this.game.state.start('Instrucciones');
    }
};