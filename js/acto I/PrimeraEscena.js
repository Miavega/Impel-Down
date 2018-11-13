GameState.PrimeraEscena = function (game) { };
GameState.PrimeraEscena.prototype = {
    create: function () {
        //DECLARAMOS EL FONDO Y EL SPRITE DEL AVIÓN
        this.screen = this.add.sprite(0, 0, 'screen-sky');

        //DECLARAMOS LAS ESCENAS
        this.escenaImg = []
        this.escenaImg = [this.add.sprite(0, 0, 'A1-1'), this.add.sprite(0, 0, 'A1-1.1')];

        this.escenaImg[1].visible = false;

        //DECLARAMOS LOS DIALOGOS
        this.dialogo = ["ARTHUR: °No puedo creer que finalmente haya hecho este viaje, " +
            "\n ¿qué pensará Sophie de todo esto?°"];

        //DECLARAMOS TIPO DE LETRA Y TODO ESO PARA EL CONTADOR Y EL PUNTAJE
        this.text = this.add.text(32, 120, '', { font: "16px Play", fill: "#ffffff" });
        this.textOptionA = this.add.text(32, 750, '', { font: "18px Play", fill: "#ffffff" });
        this.textOptionB = this.add.text(32, 780, '', { font: "18px Play", fill: "#ffffff" });

        //CLIC SOBRE LOS TEXTOS DE OPCIONES
        this.textOptionA.inputEnabled = true;
        this.textOptionB.inputEnabled = true;

        this.textOptionA.events.onInputUp.add(this.upA, this);
        this.textOptionB.events.onInputUp.add(this.upB, this);

        //CONFIGURACIÓN DEL TEXTO
        this.line = [];

        this.wordIndex = 0;
        this.lineIndex = 0;

        this.wordDelay = 130;
        this.lineDelay = 400;

        this.buttonPress = 0;
        this.escena = 0;
        this.auxMedidor = true;

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

        this.medidorAgua.setValor(0);
        this.medidorComida.setValor(0);
        this.medidorSocial.setValor(0);
        this.medidorVida.setValor(0);

        this.textMedidorAgua = this.add.text(35, 50, 100 - this.medidorAgua.getValor() + "%", { font: "18px Play", fill: "#ffffff" });
        this.textMedidorComida = this.add.text(175, 40, 100 - this.medidorComida.getValor() + "%", { font: "18px Play", fill: "#ffffff" });
        this.textMedidorVida = this.add.text(305, 45, 100 - this.medidorVida.getValor() + "%", { font: "18px Play", fill: "#ffffff" });
        this.textMedidorSocial = this.add.text(445, 35, 100 - this.medidorSocial.getValor() + "%", { font: "18px Play", fill: "#ffffff" });

        //Agregamos el Overlay
        this.add.sprite(0, 0, 'overlay');

        //Musica de la escena
        this.musica = this.game.add.audio('musicActo1');
        this.musica.play();

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
    upA: function () {
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        this.escena++;
        this.clearText();
        this.wordIndex = 0;
        this.lineIndex = 0;
    },
    upB: function () {
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        this.escena += 2;
        this.clearText();
        this.wordIndex = 0;
        this.lineIndex = 0;
    },
    updateMedidorSocial(medidor) {
        if (this.auxMedidor) {
            this.numero = Math.floor((Math.random() * 10) + 25);
            medidor.setValor(this.numero);
            this.auxMedidor = false;
            this.textMedidorSocial.setText(100 - medidor.getValor() + "%");
        }
    },
    update: function () {
        //COMIENZA EL JUEGO, NO SE HA TOMADO NINGUNA DECISIÓN
        if (this.escena == 0) {
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.clearText();
                this.updateText();
                this.textOptionA.setText("a) Preguntar a Sophie por el viaje.");
                this.textOptionB.setText("b) Dejar que Sophie siga durmiendo.");
            }
        }
        else if (this.escena == 1) {
            this.escenaImg[0].visible = false;
            this.escenaImg[1].visible = true;
            this.dialogo = ["SOPHIE: ¿Que pasa?", "ARTHUR: Nada, pensé que querrías hablar del viaje, \n tu madre estará contenta de verte.",
                "SOPHIE: Sabes que odio que hayas tomado ésta decisión.", "SOPHIE: zZzZz"
            ];
            this.updateMedidorSocial(this.medidorSocial);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("Continuar");
                this.textOptionB.setText("");
                this.clearText();
                this.updateText();
            }
        }
        else if (this.escena = 2) {
            this.game.state.start('SegundaEscena', false, false, this.medidorAgua.getValor(), this.medidorComida.getValor(),
                this.medidorVida.getValor(), this.medidorSocial.getValor(), this.musica);
        }
    },

};