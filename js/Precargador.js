GameState.Precargador = function (game) { };
GameState.Precargador.prototype = {
    //CARGA TODOS LOS ELEMENTOS DEL JUEGO
    preload: function () {
        this.progressbarE = this.add.sprite((GameState._WIDTH - 297) * 0.5, (GameState._HEIGHT - 145) * 0.5, 'progressbarE');
        this.progressbarF = this.add.sprite((GameState._WIDTH - 158) * 0.5, (GameState._HEIGHT - 50) * 0.5, 'progressbarF');
        this.load.setPreloadSprite(this.progressbarF);

        //FONDO, TEXTO Y OVERLAY
        this.load.image('screen-mainmenu', 'assets/fondo-menu.gif');
        this.load.image('screen-howtoplay', 'assets/how-to-play.jpeg');
        this.load.image('screen-sky', 'assets/sky.gif');
        this.load.image('island', 'assets/isla.gif');
        this.load.image('title', 'assets/titulo1.png');
        this.load.image('overlay', 'assets/Overlay-V0.png');

        //ESCENAS
        //ACTO I
        this.load.image('ACTO-1', 'assets/escenas/acto I/ACTO-1.png');
        this.load.image('A1-1.1', 'assets/escenas/acto I/A1-1.1.png');
        this.load.image('A1-1', 'assets/escenas/acto I/A1-1.png');
        this.load.image('A1-2.1.1', 'assets/escenas/acto I/A1-2.1.1.png');
        this.load.image('A1-2.1.2.1', 'assets/escenas/acto I/A1-2.1.2.1.png');
        this.load.image('A1-2.1.2.2', 'assets/escenas/acto I/A1-2.1.2.2.png');
        this.load.image('A1-2.1', 'assets/escenas/acto I/A1-2.1.png');
        this.load.image('A1-2.2.1.1', 'assets/escenas/acto I/A1-2.2.1.1.png');
        this.load.image('A1-2.2.1.2', 'assets/escenas/acto I/A1-2.2.1.2.png');
        this.load.image('A1-2.2', 'assets/escenas/acto I/A1-2.2.png');
        this.load.image('A1-2', 'assets/escenas/acto I/A1-2.png');
        this.load.image('A1-GIF1', 'assets/escenas/acto I/A1-GIF1.gif');
        this.load.image('A1-GIF2', 'assets/escenas/acto I/A1-GIF2.gif');

        //ACTO II
        this.load.image('A2-3.1.1', 'assets/escenas/acto II/A2-3.1.1.png');
        this.load.image('A2-3.1.2', 'assets/escenas/acto II/A2-3.1.2.png');
        this.load.image('A2-3.1', 'assets/escenas/acto II/A2-3.1.png');
        this.load.image('A2-3.2.2', 'assets/escenas/acto II/A2-3.2.2.png');
        this.load.image('A2-3.2', 'assets/escenas/acto II/A2-3.2.png');
        this.load.image('ACTO-2', 'assets/escenas/acto II/ACTO-2.png');

        //SPRITESHEETS
        this.load.spritesheet('button-start', 'assets/button-start1.png', 286, 84);
        this.load.spritesheet('airplane', 'assets/airplane.png', 150, 100, 10);
        this.load.spritesheet('humo', 'assets/humo.png', 77, 77, 3);

        //BARRA DE MEDICIÓN DE LAS VARIABLES
        this.load.image('barraProgreso', 'assets/barra.png');
        this.load.image('barraIndividual', 'assets/barraIndividual.png');

    },
    create: function () {
        //CAMBIO DE ESTADO AL MENU
        this.game.state.start('Menu');
    }
};