GameState.RecoleccionA4 = function (game) { };
GameState.RecoleccionA4.prototype = {
    init: function (valorAgua, valorComida, valorVida, valorSocial, vidaAmber, medicina, musica) {
        this.valorAgua = valorAgua;
        this.valorComida = valorComida;
        this.valorVida = valorVida;
        this.valorSocial = valorSocial;
        this.vidaAmber = vidaAmber;
        this.medicina = medicina;
        this.musica = musica;
    },
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //DECLARAMOS LAS ESCENAS
        this.map = this.game.add.tilemap('MapaFondoA4');
        this.map2 = this.game.add.tilemap('MapaFondoA42');

        this.map.addTilesetImage('TileMap');
        this.map2.addTilesetImage('TileMap');

        //COLISIÓN CON EL MAR
        this.map.setCollisionBetween(232, 232);
        this.map.setCollisionBetween(233, 233);
        this.map.setCollisionBetween(234, 234);
        this.map.setCollisionBetween(240, 240);
        this.map.setCollisionBetween(241, 241);
        this.map.setCollisionBetween(242, 242);
        this.map.setCollisionBetween(248, 248);
        this.map.setCollisionBetween(249, 249);
        this.map.setCollisionBetween(250, 250);

        //COLISIONES CON OBJETOS DEL MAPA
        //this.map.setCollisionBetween(8, 8);

        this.layer = this.map.createLayer(0);
        this.map2.createLayer(0);

        this.layer.resizeWorld();

        this.sprite = this.game.add.sprite(800, 800, 'Arthur');
        this.sprite.anchor.setTo(0.5, 0.5);

        this.game.physics.enable(this.sprite);

        this.game.camera.follow(this.sprite);

        this.map.setTileIndexCallback(10, this.getTile, this);
        this.map.setTileLocationCallback(2, 0, 1, 1, this.getTile, this);

        //DECLARAMOS LOS DIALOGOS
        this.textOption = this.add.text(32, 750, '', { font: "18px Play", fill: "#000" });
        this.textOption.setText("Continuar")
        this.textOption.events.onInputUp.add(this.startGame, this);
        this.textOption.fixedToCamera = true;

        //CLIC SOBRE LOS TEXTOS DE OPCIONES
        this.textOption.inputEnabled = true;

        //CONFIGURACIÓN DEL TECLADO
        this.keys = this.game.input.keyboard.createCursorKeys();
        this.keyUp = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.keyDown = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.keyLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.keyRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.keyEnter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.keySpace = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //SE CONFIGURAN TODAS LAS VARIABLES DE MEDICION Y LAS BARRAS PARA EL ESTADO DE LAS VARIABLES;
        this.barraProgreso = this.add.sprite(0, 0, 'barraProgreso');
        this.barraProgreso.fixedToCamera = true;

        //SE INICIALIZAN MEDIDORES
        this.medidorAgua = new StatusBar(this.game, 0, 15);
        this.medidorComida = new StatusBar(this.game, 135, 15);
        this.medidorVida = new StatusBar(this.game, 270, 15);
        this.medidorSocial = new StatusBar(this.game, 405, 15);

        this.medidorAgua.setValor(this.valorAgua);
        this.medidorComida.setValor(this.valorComida);
        this.medidorSocial.setValor(this.valorSocial);
        this.medidorVida.setValor(this.valorVida);

        this.textMedidorAgua = this.add.text(35, 50, 100 - this.medidorAgua.getValor() + "%", { font: "18px Play", fill: "#ffffff" });
        this.textMedidorComida = this.add.text(175, 40, 100 - this.medidorComida.getValor() + "%", { font: "18px Play", fill: "#ffffff" });
        this.textMedidorVida = this.add.text(305, 45, 100 - this.medidorVida.getValor() + "%", { font: "18px Play", fill: "#ffffff" });
        this.textMedidorSocial = this.add.text(445, 35, 100 - this.medidorSocial.getValor() + "%", { font: "18px Play", fill: "#ffffff" });

        this.medidorAgua.fixedToCamera = true;
        this.medidorComida.fixedToCamera = true;
        this.medidorSocial.fixedToCamera = true;
        this.medidorVida.fixedToCamera = true;

        this.textMedidorAgua.fixedToCamera = true;
        this.textMedidorComida.fixedToCamera = true;
        this.textMedidorVida.fixedToCamera = true;
        this.textMedidorSocial.fixedToCamera = true;

        //AGREGAMOS EL OVERLAY
        this.overlay = this.add.sprite(0, 0, 'overlay');
        this.overlay.fixedToCamera = true;
        this.recogidos = 0;
        this.faltantes = 20;
    },
    //TEXTO
    nextLine: function () {
        this.line = this.dialogo[this.lineIndex].split(' ');
        this.wordIndex = 0;
        this.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);
        this.lineIndex++;
        if (this.lineIndex === this.dialogo.length) {
            this.wordIndex = 0;
            this.lineIndex = 0;
        }
    },
    getTile: function () {
        this.map2.fill(11, this.layer.getTileX(this.sprite.x), this.layer.getTileY(this.sprite.y), 1, 1);
        this.map.fill(11, this.layer.getTileX(this.sprite.x), this.layer.getTileY(this.sprite.y), 1, 1);
        this.recogidos++;
        this.recogidos--;
    },
    startGame: function () {
        this.game.state.start('CuartaEscenaA4', true, false, this.medidorAgua.getValor(), this.medidorComida.getValor(),
            this.medidorVida.getValor(), this.medidorSocial.getValor(), this.vidaAmber, this.medicina,this.musica);
    },
    update: function () {
        this.game.physics.arcade.collide(this.sprite, this.layer);

        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        this.sprite.body.angularVelocity = 0;

        if (this.keyLeft.isDown) {
            this.sprite.body.angularVelocity = -200;
        }
        else if (this.keyRight.isDown) {
            this.sprite.body.angularVelocity = 200;
        }

        if (this.keyUp.isDown) {
            this.sprite.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.sprite.angle, 300));
        }
        else if (this.keyDown.isDown) {
            this.sprite.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.sprite.angle, -100));
        }
    },

    render: function () {
        this.game.debug.text('Objetos recogidos: ' + this.recogidos, 32, 120, 'rgb(0,0,0)');
        this.game.debug.text('Objetos faltantes: ' + this.faltantes, 32, 136, 'rgb(0,0,0)');
        this.game.debug.text('Click en continuar para saltar', 32, 152, 'rgb(0,0,0)');
    },

};