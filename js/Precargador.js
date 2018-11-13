GameState.Precargador = function (game) { };
GameState.Precargador.prototype = {
    //CARGA TODOS LOS ELEMENTOS DEL JUEGO
    preload: function () {
        this.progressbarF = this.add.sprite((GameState._WIDTH - 400) * 0.5, (GameState._HEIGHT - 145) * 0.5, 'progressbarF');
        this.load.setPreloadSprite(this.progressbarF);

        //FONDO, TEXTO Y OVERLAY
        this.load.image('screen-mainmenu', 'assets/fondo-menu.gif');
        this.load.image('screen-howtoplay', 'assets/how-to-play.jpeg');
        this.load.image('screen-howtoplay-2', 'assets/how-to-play-2.png');
        this.load.image('screen-sky', 'assets/sky.gif');
        this.load.image('island', 'assets/isla.gif');
        this.load.image('title', 'assets/titulo1.png');
        this.load.image('overlay', 'assets/Overlay-V0.png');

        //PROCESOS ESTOCÁSTICOS
        this.load.image('estocastico-1', 'assets/estocastico-1.png');
        this.load.image('estocastico-2', 'assets/estocastico-2.png');
        this.load.image('estocastico-3', 'assets/estocastico-3.jpg');

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

        //ACTO III
        this.load.image('A3-4.1.A', 'assets/escenas/acto III/A3-4.1.A.png');
        this.load.image('A3-4.1.B', 'assets/escenas/acto III/A3-4.1.B.png');
        this.load.image('A3-4.1.C', 'assets/escenas/acto III/A3-4.1.C.png');
        this.load.image('A3-4.A', 'assets/escenas/acto III/A3-4.A.png');
        this.load.image('A3-4.B', 'assets/escenas/acto III/A3-4.B.png');
        this.load.image('A3-4.C', 'assets/escenas/acto III/A3-4.C.png');
        this.load.image('A3-5', 'assets/escenas/acto III/A3-5.png');
        this.load.image('A3-6.A', 'assets/escenas/acto III/A3-6.A.png');
        this.load.image('A3-6.B', 'assets/escenas/acto III/A3-6.B.png');
        this.load.image('A3-6.C', 'assets/escenas/acto III/A3-6.C.png');
        this.load.image('A3-7.1', 'assets/escenas/acto III/A3-7.1.png');
        this.load.image('A3-7', 'assets/escenas/acto III/A3-7.png');
        this.load.image('A3-8', 'assets/escenas/acto III/A3-8.png');
        this.load.image('A3-10', 'assets/escenas/acto III/A3-10.png');
        this.load.image('A3-11.A', 'assets/escenas/acto III/A3-11.A.png');
        this.load.image('A3-11.B', 'assets/escenas/acto III/A3-11.B.png');
        this.load.image('A3-11.C', 'assets/escenas/acto III/A3-11.C.png');
        this.load.image('A3-12', 'assets/escenas/acto III/A3-12.png');
        this.load.image('A3-13.1.1.2', 'assets/escenas/acto III/A3-13.1.1.2.png');
        this.load.image('A3-13.1.A', 'assets/escenas/acto III/A3-13.1.A.png');
        this.load.image('A3-13.1.B', 'assets/escenas/acto III/A3-13.1.B.png');
        this.load.image('A3-13.1.C', 'assets/escenas/acto III/A3-13.1.C.png');
        this.load.image('A3-13.A', 'assets/escenas/acto III/A3-13.A.png');
        this.load.image('A3-13.B', 'assets/escenas/acto III/A3-13.B.png');
        this.load.image('A3-13.C', 'assets/escenas/acto III/A3-13.C.png');
        this.load.image('A3-13', 'assets/escenas/acto III/A3-13.png');
        this.load.image('A3-R1', 'assets/escenas/acto III/A3-R1.png');
        this.load.image('A3-R2', 'assets/escenas/acto III/A3-R2.png');
        this.load.image('A3-R3', 'assets/escenas/acto III/A3-R3.png');
        this.load.image('A3-R4', 'assets/escenas/acto III/A3-R4.png');
        this.load.image('A3-R5', 'assets/escenas/acto III/A3-R5.png');
        this.load.image('ACTO-3', 'assets/escenas/acto III/ACTO-3.png');
        this.load.tilemap('MapaFondo', 'assets/escenas/recoleccion/Mapa_Capa de Patrones 1.csv', null, Phaser.Tilemap.CSV);
        this.load.tilemap('MapaFondo2', 'assets/escenas/recoleccion/Mapa_Capa de patrones 2.csv', null, Phaser.Tilemap.CSV);
        this.load.image('TileMap', 'assets/escenas/recoleccion/tileset-shinygold2.png');
        this.load.image('Arthur', 'assets/escenas/recoleccion/characterGreen.png');

        //ACTO IV
        this.load.image('ACTO-4', 'assets/escenas/acto IV/ACTO-4.png');
        this.load.image('A3-14', 'assets/escenas/acto IV/A3-14.png');
        this.load.image('A3-15', 'assets/escenas/acto IV/A3-15.png');
        this.load.image('A3-16', 'assets/escenas/acto IV/A3-16.png');
        this.load.image('A3-17', 'assets/escenas/acto IV/A3-17.png');
        this.load.image('A3-18', 'assets/escenas/acto IV/A3-18.png');
        this.load.image('A3-19', 'assets/escenas/acto IV/A3-19.png');
        this.load.tilemap('MapaFondoA4', 'assets/escenas/recoleccion/mapa2_Capa de Patrones 1.csv', null, Phaser.Tilemap.CSV);
        this.load.tilemap('MapaFondoA42', 'assets/escenas/recoleccion/mapa2_Capa de patrones 2.csv', null, Phaser.Tilemap.CSV);


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