var GameState = {
    _WIDTH: 540,
    _HEIGHT: 810
};
GameState.Inicio = function (game) { };
GameState.Inicio.prototype = {
    //BARRA DE PROGRESO MIETRAS SE CARGAN LOS ELEMENTOS DEL JUEGO
    preload: function () {
        this.load.image('progressbarF', 'assets/progressbar-full.png');
    },
    create: function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        //CAMBIO DE ESTADO AL PRE CARGADOR
        this.game.state.start('Precargador');
    }
};