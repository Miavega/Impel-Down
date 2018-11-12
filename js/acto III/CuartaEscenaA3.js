GameState.CuartaEscenaA3 = function (game) { };
GameState.CuartaEscenaA3.prototype = {
    init: function (sobreviviente, medicina, vidaSobreviviente, valorAgua, valorComida, valorVida, valorSocial, vidaAmber, botiquin,
        escena) {
        this.sobreviviente = sobreviviente;
        this.medicina = medicina;
        this.vidaSobreviviente = vidaSobreviviente;
        this.valorAgua = valorAgua;
        this.valorComida = valorComida;
        this.valorVida = valorVida;
        this.valorSocial = valorSocial;
        this.vidaAmber = vidaAmber;
        this.botiquin = botiquin;
        //La siguiente variable indicará si la escena está en su primera o en su segunda parte
        this.primeraEscena = escena;
    },
    create: function () {
        //DECLARAMOS LAS ESCENAS
        this.escenaImg = [this.add.sprite(0, 0, 'A3-7'), this.add.sprite(0, 0, 'A3-7.1'), this.add.sprite(0, 0, 'A3-8')];

        this.escenaImg[1].visible = false;
        this.escenaImg[2].visible = false;

        //DECLARAMOS LOS DIALOGOS
        if (this.primeraEscena == 0) {
            this.dialogo = ["ARTHUR °Tengo que ser fuerte para Sophie°"];
        } else if (this.primeraEscena == 1) {
            this.dialogo = ["ARTHUR °Si subo a esa cima tal vez pueda ver algo, \n pero me alejaría más de los demás°"];
        }

        this.text = this.add.text(32, 120, '', { font: "16px Play", fill: "#fff" });
        this.textOptionA1 = this.add.text(32, 750, '', { font: "18px Play", fill: "#fff" });
        this.textOptionA = this.add.text(32, 750, '', { font: "18px Play", fill: "#fff" });
        this.textOptionB = this.add.text(32, 780, '', { font: "18px Play", fill: "#fff" });

        this.textOptionA7_1 = this.add.text(32, 750, '', { font: "18px Play", fill: "#fff" });
        this.textOptionB7_1 = this.add.text(32, 780, '', { font: "18px Play", fill: "#fff" });

        this.textOption8 = this.add.text(32, 780, '', { font: "18px Play", fill: "#fff" });

        //CLIC SOBRE LOS TEXTOS DE OPCIONES

        this.textOptionA.inputEnabled = true;
        this.textOptionA1.inputEnabled = true;
        this.textOptionB.inputEnabled = true;
        this.textOptionA7_1.inputEnabled = true;
        this.textOptionB7_1.inputEnabled = true;
        this.textOption8.inputEnabled = true;
        //CONFIGURACIÓN DEL TEXTO
        this.line = [];

        this.wordIndex = 0;
        this.lineIndex = 0;

        this.wordDelay = 130;
        this.lineDelay = 400;

        this.buttonPress = 0;
        this.auxMedidorAumenta = true;
        this.auxMedidorDisminuye = true;
        if (this.primeraEscena == 0) {
            this.escena = 0;
        } else if (this.primeraEscena == 1) {
            this.escena = 1;
        }
        this.auxEscena7_1 = 0;
        //VARIABLE PARA SABER A QUÉ ESCENA DEBE RETORNAR DESPUÉS DEL SUCESO ALEATORIO
        this.sucesoAleatorioNo = 0;

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
        //CAMBIO DE ESTADO A JUEGO
        alert("Siguiente escena")
        //this.game.state.start('SegundaEscenaA3', true, false, this.decisionA, this.sobreviviente);
    },
    startEscena8() {
        this.escena = 3;
        this.clearText();
    },
    callSucesoAleatorio() {
        if (this.escena == 3 && this.sucesoAleatorioNo == 0) {
            this.sucesoAleatorioNo++;
        }
        this.numeroSuceso = Math.floor((Math.random() * 5));
        this.game.state.start('SucesosAleatorios', true, false, this.sobreviviente, this.medicina, this.vidaSobreviviente,
            this.medidorAgua.getValor(), this.medidorComida.getValor(), this.medidorVida.getValor(), this.medidorSocial.getValor(),
            this.vidaAmber, this.botiquin, this.numeroSuceso, this.sucesoAleatorioNo);
    },
    callEscena8() {
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        this.updateMedidorDisminuir(this.medidorSocial, 0, 5, this.textMedidorSocial);
        this.startEscena8();
    },
    callEscena7_1() {
        if (this.auxEscena7_1 == 0) {
            this.auxEscena7_1++;
            this.textOptionA.setText("");
            this.textOptionB.setText("");
            this.updateMedidorAumentar(this.medidorSocial, 0, 5, this.textMedidorSocial);
            this.clearText();
            this.escena = 2;
        }
    },
    callEscena87_1() {
        this.updateMedidorDisminuir(this.medidorAgua, 0, 15, this.textMedidorAgua);
        this.textOptionA7_1.setText("");
        this.textOptionB7_1.setText("");
        this.startEscena8();
    },
    callEscena8Jeff() {
        this.auxMedidorAumenta = true;
        this.auxMedidorDisminuye = true;
        this.textOptionA7_1.setText("");
        this.textOptionB7_1.setText("");
        this.updateMedidorDisminuir(this.medidorAgua, 0, 5, this.textMedidorAgua);
        this.updateMedidorAumentar(this.medidorVida, 0, 5, this.textMedidorVida);
        this.startEscena8();
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
            this.textOptionA1.events.onInputUp.add(this.callSucesoAleatorio, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA1.setText("Continuar");
                this.clearText();
                this.updateText();
            }
        } else if (this.escena == 1) {
            this.textOptionA.events.onInputUp.add(this.callEscena7_1, this);
            this.textOptionB.events.onInputUp.add(this.callEscena8, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("a) Subir a la cima");
                this.textOptionB.setText("b) Volver con los demás");
                this.clearText();
                this.updateText();
            }
        } else if (this.escena == 2) {
            this.escenaImg[0].visible = false;
            this.escenaImg[1].visible = true;
            this.dialogo = ["ARTHUR °¿Será eso una isla? No estoy del \ntodo seguro, pero si lo es posiblemente tengamos\n" +
                "esperanza de salir con vida de aquí°"];
            this.textOptionA7_1.events.onInputUp.add(this.callEscena8Jeff, this);
            this.textOptionB7_1.events.onInputUp.add(this.callEscena87_1, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                if (this.sobreviviente == 1) {
                    this.textOptionA7_1.setText("a) Usar la brújula para volver con los demás");
                    this.clearText();
                    this.updateText();
                } else {
                    this.textOptionB7_1.setText("b) Volver con los demás");
                    this.clearText();
                    this.updateText();
                }

            }
        } else if (this.escena == 3) {
            this.escenaImg[1].visible = false;
            this.escenaImg[2].visible = true;
            this.dialogo = ["Arthur °Genial, estos cocos nos vendrá bien, pero… \n ¿Cómo voy a subir allá arriba? Necesitaré algo de ayuda°"];
            this.textOption8.events.onInputUp.add(this.callSucesoAleatorio, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOption8.setText("a) Continuar");
                this.clearText();
                this.updateText();
            }
        }

    }

};