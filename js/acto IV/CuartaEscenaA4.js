GameState.CuartaEscenaA4 = function (game) { };
GameState.CuartaEscenaA4.prototype = {
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
        //DECLARAMOS LAS ESCENAS
        this.escenaImg = [this.add.sprite(0, 0, 'A4-18'), this.add.sprite(0, 0, 'A4-19')];
        this.escenaImg[1].visible = false;

        //DECLARAMOS LOS DIALOGOS
        this.dialogo = ["ARTHUR: Con esto podremos terminar la balsa.", "ÁMBER: ¿Estás seguro que esto funcionará?",
            "ARTHUR: Es nuestra mejor opción.", "SOPHIE: Yo sé que lo vamos a lograr."
        ];

        this.text = this.add.text(32, 120, '', { font: "16px Play", fill: "#000" });
        this.textOption = this.add.text(32, 750, '', { font: "18px Play", fill: "#000" });

        //CLIC SOBRE LOS TEXTOS DE OPCIONES
        this.textOption.inputEnabled = true;

        //CONFIGURACIÓN DEL TEXTO
        this.line = [];

        this.wordIndex = 0;
        this.lineIndex = 0;

        this.wordDelay = 130;
        this.lineDelay = 400;

        this.buttonPress = 0;
        this.auxMedidorAumenta = true;
        this.auxMedidorDisminuye = true;
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
    callEscena19: function () {
        this.verificarVariables();
        this.escena = 1;
        this.clearText();
        this.textOption.setText("");
    },
    callActoV: function () {
        this.verificarVariables();
        this.escenaImg[1].visible = false;
        this.add.button(0, 0, 'ACTO-5', this.startGame, this)
    },
    startGame: function () {
        //CAMBIO DE ESTADO A JUEGO
        this.musica.stop();
        this.game.state.start('PrimeraEscenaA5', true, false, this.medidorAgua.getValor(), this.medidorComida.getValor(),
            this.medidorVida.getValor(), this.medidorSocial.getValor());
    },
    verificarVariables() {
        if (this.vidaAmber === 0 || this.medidorAgua.getValor() >= 100
            || this.medidorComida.getValor() >=100 || this.medidorVida.getValor() >=100 || this.medidorSocial.getValor() >=0) {
            this.musica.stop();
            this.game.state.start('gameover');
        }
    },
    update: function () {
        if (this.escena == 0) {
            this.textOption.events.onInputUp.add(this.callEscena19, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOption.setText("Continuar");
                this.clearText();
                this.updateText();
            }
        }
        else if (this.escena == 1) {
            this.escenaImg[0].visible = false;
            this.escenaImg[1].visible = true;
            this.dialogo = ["ARTHUR: Tomen todo lo que crean que nos pueda ayudar, \nhice éstos remos con partes del avión, " +
                "así podremos \nguiar la balsa hacía la isla.", "ÁMBER: Creo que estoy lista, todo saldrá bien, lo sé.",
            "SOPHIE: Era en serio lo de ir a casa tú y yo.", "ARTHUR: Solo si tú quieres.", "SOPHIE: Ya sabes la respuesta."
            ];
            this.textOption.events.onInputUp.add(this.callActoV, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOption.setText("Continuar");
                this.clearText();
                this.updateText();
            }
        }
    }
};