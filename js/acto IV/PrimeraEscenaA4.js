GameState.PrimeraEscenaA4 = function (game) { };
GameState.PrimeraEscenaA4.prototype = {
    init: function (valorAgua, valorComida, valorVida, valorSocial, vidaAmber, medicina) {
        this.valorAgua = valorAgua;
        this.valorComida = valorComida;
        this.valorVida = valorVida;
        this.valorSocial = valorSocial;
        this.vidaAmber = vidaAmber;
        this.medicina = medicina;
    },
    create: function () {
        //DECLARAMOS LAS ESCENAS
        this.escenaImg = [this.add.sprite(0, 0, 'A4-14'), this.add.sprite(0, 0, 'A4-15')];
        this.escenaImg[1].visible = false;

        //DECLARAMOS LOS DIALOGOS
        this.dialogo = ["SOPHIE: No estoy molesta contigo.", "ARTHUR: ¿A qué te refieres?",
            "SOPHIE: Entiendo porque decidiste que viviera \n con mamá, es solo que me es difícil dejarte.",
            "ARTHUR: No significa que no nos volvamos a ver.", "SOPHIE: Lo sé, tampoco hablaré jamás de lo que pasó acá, \nsé que me protegías",
            "ÁMBER: No creerán lo que acabo de ver, Arthur, Sophie \ntienen que ver esto conmigo."
        ];

        this.text = this.add.text(32, 120, '', { font: "16px Play", fill: "#fff" });
        this.textOption = this.add.text(32, 750, '', { font: "18px Play", fill: "#fff" });

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

        //Musica del juego
        this.musica = this.game.add.audio('musicActo4');
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
    updateMedidorDisminuir(medidor, rangoa, rangob, texto) {
        if (this.auxMedidorDisminuye) {
            this.numero = Math.floor((Math.random() * rangoa) + rangob);
            medidor.setValor(this.numero);
            this.auxMedidorDisminuye = false;
            texto.setText(100 - medidor.getValor() + "%");
        }
    },
    updateMedidorAumentar(medidor, rangoa, rangob, texto) {
        if (this.auxMedidorAumenta) {
            this.numero = (Math.floor((Math.random() * rangoa) + rangob) * -1);
            medidor.setValor(this.numero);
            this.auxMedidorAumenta = false;
            texto.setText(100 - medidor.getValor() + "%");
        }
    },
    callEscena15: function () {
        this.clearText();
        this.verificarVariables();
        this.updateMedidorDisminuir(this.medidorComida, 10, 1, this.textMedidorComida);
        this.auxMedidorDisminuye = true;
        this.updateMedidorDisminuir(this.medidorAgua, 10, 1, this.textMedidorAgua);
        this.escena = 1;
        this.auxMedidorDisminuye = true;
    },
    callSucesoAleatorio: function () {
        this.clearText();
        this.verificarVariables();
        this.numeroSuceso = Math.floor((Math.random() * 5));
        this.game.state.start('SucesosAleatorios', true, false, 1, this.medicina, 0,
            this.medidorAgua.getValor(), this.medidorComida.getValor(), this.medidorVida.getValor(), this.medidorSocial.getValor(),
            this.vidaAmber, 0, this.numeroSuceso, 2, this.musica);
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
            this.textOption.events.onInputUp.add(this.callEscena15, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOption.setText("Continuar");
                this.clearText();
                this.updateText();
            }
        } else if (this.escena == 1) {
            this.escenaImg[0].visible = false;
            this.escenaImg[1].visible = true;
            this.dialogo = ["ÁMBER: Díganme que ustedes también lo ven.", "SOPHIE: ¿Qué cosa?", "ÁMBER: A lo lejos, mira, es humo.",
                "SOPHIE: Parece más bien una nube.", "ARTHUR: No Sophie, creo que Ámber tiene razón, es humo, \nsabía que debíamos estar " +
                "cerca de otra isla, tenemos que llegar allá", "ÁMBER: Pero ¿Cómo?", "ARTHUR: Tengo una idea..."
            ];
            this.textOption.events.onInputUp.add(this.callSucesoAleatorio, this)
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOption.setText("Continuar");
                this.clearText();
                this.updateText();
            }
        }
    }
};