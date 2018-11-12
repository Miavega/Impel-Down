GameState.TerceraEscenaA3 = function (game) { };
GameState.TerceraEscenaA3.prototype = {
    init: function (sobreviviente, medicina, vidaSobreviviente, valorAgua, valorComida, valorVida, valorSocial, vidaAmber, botiquin) {
        this.sobreviviente = sobreviviente;
        this.medicina = medicina;
        this.vidaSobreviviente = vidaSobreviviente;
        this.valorAgua = valorAgua;
        this.valorComida = valorComida;
        this.valorVida = valorVida;
        this.valorSocial = valorSocial;
        this.vidaAmber = vidaAmber;
        this.botiquin = botiquin;
    },
    create: function () {
        //DECLARAMOS LAS ESCENAS
        this.escenaImg = []
        if (this.sobreviviente == 0) {
            this.escenaImg = [this.add.sprite(0, 0, 'A3-6.A')];
            this.nombre = "McGREGOR";
        }
        else if (this.sobreviviente == 1) {
            this.escenaImg = [this.add.sprite(0, 0, 'A3-6.B')];
            this.nombre = "JEFF";
        }
        else if (this.sobreviviente == 2) {
            this.escenaImg = [this.add.sprite(0, 0, 'A3-6.C')];
            this.nombre = "BETTY";
        }


        //DECLARAMOS LOS DIALOGOS
        this.dialogo = [this.nombre + ": Sabía que la encontrarías", "ÁMBER: ¿Dónde estamos? (llora)",
            "ARTHUR: Lo último que vi en la pantalla del avión es que \n pasábamos por Bermudas, no debemos estar muy lejos.",
        this.nombre + ": Supongo que alguien nos debe estar buscando, ¿Verdad?", "ARTHUR: Eso espero, por ahora tenemos que" +
        "revisar éste lugar y ver \n que encontramos, necesitamos agua y comida.", "SOPHIE: Yo voy contigo.", "ARTHUR: No Sophie, " +
        "es peligroso, tú quédate con ellos y cuídalos, \n no iré muy lejos."
        ];

        this.text = this.add.text(32, 120, '', { font: "16px Play", fill: "#000000" });
        this.textOptionA = this.add.text(32, 750, '', { font: "18px Play", fill: "#000000" });

        //CLIC SOBRE LOS TEXTOS DE OPCIONES
        this.textOptionA.inputEnabled = true;

        //CONFIGURACIÓN DEL TEXTO
        this.line = [];

        this.wordIndex = 0;
        this.lineIndex = 0;

        this.wordDelay = 130;
        this.lineDelay = 400;

        this.buttonPress = 0;
        this.escena = 0;

        //CONFIGURACIÓN DEL TECLADO
        this.keys = this.game.input.keyboard.createCursorKeys();
        this.keyUp = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.keyDown = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.keyLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.keyRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.keyEnter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.keySpace = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //SE CONFIGURAN TODAS LAS VARIABLES DE MEDICION Y LAS BARRAS PARA EL ESTADO DE LAS VARIABLES;
        this.add.sprite(0, 0, 'barraProgreso');

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

        //AGREGAMOS EL OVERLAY
        this.add.sprite(0, 0, 'overlay');

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
    nextWord: function () {
        this.text.text = this.text.text.concat(this.line[this.wordIndex] + " ");
        this.wordIndex++;
    },
    updateText: function () {
        if (this.buttonPress == 0) {
            this.nextLine();
            this.buttonPress++;
        }
    },
    clearText: function () {
        if (this.wordIndex === this.line.length) {
            this.text.setText("");
            this.buttonPress = 0;
        }
    },
    startGame: function () {
        //CAMBIO DE ESTADO A JUEGO (El 0 del final es para saber si es la primera vez que se llama la siguiente escena)
        this.game.state.start('CuartaEscenaA3', true, false, this.sobreviviente, this.medicina, this.vidaSobreviviente,
            this.medidorAgua.getValor(), this.medidorComida.getValor(), this.medidorVida.getValor(), this.medidorSocial.getValor(),
            this.vidaAmber, this.botiquin, 0);
    },
    update: function () {
        if (this.escena == 0) {
            this.textOptionA.events.onInputUp.add(this.startGame, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("Continuar");
                this.clearText();
                this.updateText();
            }
        }

    }

};