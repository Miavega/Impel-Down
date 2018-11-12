GameState.QuintaEscenaA3 = function (game) { };
GameState.QuintaEscenaA3.prototype = {
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
            this.escenaImg = [this.add.sprite(0, 0, 'A3-6.A'), this.add.sprite(0, 0, 'A3-10')];
            this.nombre = "McGREGOR";
        }
        else if (this.sobreviviente == 1) {
            this.escenaImg = [this.add.sprite(0, 0, 'A3-6.B'), this.add.sprite(0, 0, 'A3-10')];
            this.nombre = "JEFF";
        }
        else if (this.sobreviviente == 2) {
            this.escenaImg = [this.add.sprite(0, 0, 'A3-6.C'), this.add.sprite(0, 0, 'A3-10')];
            this.nombre = "BETTY";
        }

        this.escenaImg[1].visible = false;
        //DECLARAMOS LOS DIALOGOS
        this.dialogo = ["“SOPHIE: Papá, volviste, sabes dónde estamos, \ndime que encontraste algo que nos ayude.",
            this.nombre + ": Qué encontraste, ¿Sabes dónde estamos?",
            "ARTHUR: No estoy seguro, pero si encontré algo de comida, \naunque necesito de la ayuda de alguien\n" +
            "para bajarla.", "SOPHIE: Yo te ayudo, déjame ir",
            "ÁMBER: Creo que es mejor que vaya yo, \nsupongo que necesitas de alguien alto, \n tu hija estará asalvo aquí",
            "ARTHUR: Hija ella tiene razón, quédate aquí, \npero puedes ayudar con algo, ¿Has visto esas señales\n" +
            "de las películas de S.O.S con piedras? \nTal vez eso nos pueda ayudar",
            "SOPHIE: De acuerdo", this.nombre + ": Creo que mi pierna está empeorando, \nel dolor está aumentando"];

        this.text = this.add.text(32, 120, '', { font: "16px Play", fill: "#000" });
        this.text10 = this.add.text(32, 120, '', { font: "16px Play", fill: "#fff" });
        this.textOptionA = this.add.text(32, 750, '', { font: "18px Play", fill: "#000" });
        this.textOptionB = this.add.text(32, 780, '', { font: "18px Play", fill: "#000" });
        this.textOptionA10 = this.add.text(32, 750, '', { font: "18px Play", fill: "#fff" });


        //CLIC SOBRE LOS TEXTOS DE OPCIONES

        this.textOptionA.inputEnabled = true;
        this.textOptionB.inputEnabled = true;
        this.textOptionA10.inputEnabled = true;
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
        if (this.escena == 1) {
            this.text10.text = this.text10.text.concat(this.line[this.wordIndex] + " ");
            this.wordIndex++;
        } else {
            this.text.text = this.text.text.concat(this.line[this.wordIndex] + " ");
            this.wordIndex++;
        }

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
            this.text10.setText("");
            this.buttonPress = 0;
        }
    },
    startGame: function () {
        //CAMBIO DE ESTADO A JUEGO
        this.game.state.start('SextaEscenaA3', true, false, this.sobreviviente, this.medicina, this.vidaSobreviviente,
            this.medidorAgua.getValor(), this.medidorComida.getValor(), this.medidorVida.getValor(), this.medidorSocial.getValor(),
            this.vidaAmber, this.botiquin);
    },
    callEscena10A() {
        this.updateMedidorAumentar(this.medidorSocial, 0, 10, this.textMedidorSocial);
        this.medicina--;
        this.clearText();
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        if (this.sobreviviente == 1) {
            this.updateMedidorDisminuir(this.medidorAgua, 0, 5, this.textMedidorAgua);
            this.auxMedidorDisminuye = true;
            this.updateMedidorDisminuir(this.medidorComida, 0, 5, this.textMedidorComida);
        } else {
            this.updateMedidorDisminuir(this.medidorAgua, 0, 10, this.textMedidorAgua);
            this.auxMedidorDisminuye = true;
            this.updateMedidorDisminuir(this.medidorComida, 0, 10, this.textMedidorComida);
        }
        this.escena = 1;
    },
    callEscena10B() {
        this.vidaSobreviviente--;
        this.clearText();
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        if (this.sobreviviente == 1) {
            this.updateMedidorDisminuir(this.medidorAgua, 0, 5, this.textMedidorAgua);
            this.auxMedidorDisminuye = true;
            this.updateMedidorDisminuir(this.medidorComida, 0, 5, this.textMedidorComida);
        } else {
            this.updateMedidorDisminuir(this.medidorAgua, 0, 10, this.textMedidorAgua);
            this.auxMedidorDisminuye = true;
            this.updateMedidorDisminuir(this.medidorComida, 0, 10, this.textMedidorComida);
        }
        this.escena = 1;
    },
    callEscena11() {
        this.updateMedidorAumentar(this.medidorComida, 10, 5, this.textMedidorComida);
        this.auxMedidorAumenta = true;
        this.updateMedidorAumentar(this.medidorAgua, 10, 5, this.textMedidorAgua);
        this.startGame();
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
    update: function () {
        if (this.escena == 0) {
            this.textOptionA.events.onInputUp.add(this.callEscena10A, this);
            this.textOptionB.events.onInputUp.add(this.callEscena10B, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("a) Dar medicamentos para el dolor");
                this.textOptionB.setText("b) Dar esperanzas y guardar la medicina");
                this.clearText();
                this.updateText();
            }
        } else if (this.escena == 1) {
            this.escenaImg[0].visible = false;
            this.escenaImg[1].visible = true;
            this.dialogo = ["ARTHUR: Y ¿Llevas mucho trabajando como azafata?",
                "ÁMBER: De hecho, es mi primer vuelo, \ny que manera de arrancar en éste trabajo, \nantes me" +
                " ocupada solo de operaciones en el aeropuerto,", "ÁMBER: Apero como azafata se gana más y tengo dos hijos\n" +
                "que necesitan mi apoyo, \ny ahora estoy aquí y tal vez nunca los vuelva a ver.",
                "ARTHUR: No pienses eso, pronto estarás de nuevo con ellos. \nMira, allá está la palmera que vi.",
                "Arthur: Supongo que esto es suficiente por ahora \nserá mejor que volvamos, va a anochecer y no\n" +
                "quiero que estémos acá."];
            this.textOptionA10.events.onInputUp.add(this.callEscena11, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA10.setText("a) Llevar los cocos que puedan con las manos");
                this.clearText();
                this.updateText();
            }
        }

    }

};