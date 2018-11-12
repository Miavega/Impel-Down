GameState.SeptimaEscenaA3 = function (game) { };
GameState.SeptimaEscenaA3.prototype = {
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
        if (this.sobreviviente === 0) {
            this.escenaImg = [this.add.sprite(0, 0, 'A3-13'), this.add.sprite(0, 0, 'A3-12')];
            this.nombre = "McGREGOR";
        }
        else if (this.sobreviviente === 1) {
            this.escenaImg = [this.add.sprite(0, 0, 'A3-13'), this.add.sprite(0, 0, 'A3-12')];
            this.nombre = "JEFF";
        }
        else if (this.sobreviviente === 2) {
            this.escenaImg = [this.add.sprite(0, 0, 'A3-13'), this.add.sprite(0, 0, 'A3-12')];
            this.nombre = "BETTY";
        }

        this.escenaImg[1].visible = false;
        //DECLARAMOS LOS DIALOGOS
        this.dialogo = ["ARTHUR: ¡Sophie! ¿Estás bien? \n¿Qué pasó?",
            "ÁMBER: No lo sé, dijo que le dolía el pecho y cayó, \npero no me dijo nada más."];


        this.text = this.add.text(32, 120, '', { font: "16px Play", fill: "#000" });
        this.textOptionA1 = this.add.text(32, 750, '', { font: "18px Play", fill: "#000" });
        this.textOptionA131 = this.add.text(32, 750, '', { font: "18px Play", fill: "#000" });
        this.textOptionB131 = this.add.text(32, 780, '', { font: "18px Play", fill: "#000" });
        this.textOptionA11 = this.add.text(32, 750, '', { font: "18px Play", fill: "#000" });
        this.textOptionB11 = this.add.text(32, 780, '', { font: "18px Play", fill: "#000" });
        this.textOption12 = this.add.text(32, 780, '', { font: "18px Play", fill: "#000" });

        //CLIC SOBRE LOS TEXTOS DE OPCIONES
        this.textOptionA1.inputEnabled = true;
        this.textOptionA131.inputEnabled = true;
        this.textOptionB131.inputEnabled = true;
        this.textOptionA11.inputEnabled = true;
        this.textOptionB11.inputEnabled = true;
        this.textOption12.inputEnabled = true;

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
    startGame: function () {
        //CAMBIO DE ESTADO A JUEGO
        alert("Escena 14")
        //this.game.state.start('SegundaEscenaA3', true, false, this.decisionA, this.sobreviviente);
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
    verificarVariables() {
        if (this.vidaAmber === 0 || this.vidaSobreviviente === 0 || this.medidorAgua.getValor() === 0
            || this.medidorComida.getValor() === 0 || this.medidorVida.getValor() === 0 || this.medidorSocial.getValor() === 0) {
            alert("Aca termina el juego");
        }
    },
    callEscena132() {
        this.escena = 2;
    },
    verificarMedicina() {
        if (this.medicina === 0) {
            this.escena = 1;
        } else {
            this.callEscena132();
        }
    },
    callEscena1311() {
        this.escena = 3;
    },
    update: function () {
        if (this.escena == 0) {
            this.textOptionA1.events.onInputUp.add(this.verificarMedicina, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA1.setText("a) Continuar");
                this.clearText();
                this.updateText();
            }
        } else if (this.escena == 1) {
            this.dialogo = ["ARTHUR: °Maldición, Sophie necesita sus medicinas, \npero si se la doy los demás sabrán que las tenía\n" +
                " y no va a ser bueno, ¿qué hago?°"];
            this.textOptionA131.events.onInputUp.add(this.verificarMedicina, this);
            this.textOptionB131.events.onInputUp.add(this.verificarMedicina, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA131.setText("a) Dar medicina a Sophie y tratar de explicar a los demás");
                this.textOptionB131.setText("b) No dar la medicina a Sophie");
                this.clearText();
                this.updateText();
            }
        } else if (this.escena == 2) {
            alert("Escena 13.2")
        } else if (this.escena == 3) {
            this.dialogo = [this.nombre + ": Eres un… Sabías que Ámber y yo \nnecesitábamos medicina y la tuviste guardada\n" +
                "todo este tiempo", "ARTHUR: Mi hija la necesitaba, cómo querías que no pensara en ella",
            this.nombre + ": Pues ahora es momento de pensar en \nnosotros también"];
        }
    }
};