GameState.SextaEscenaA3 = function (game) { };
GameState.SextaEscenaA3.prototype = {
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
            this.escenaImg = [this.add.sprite(0, 0, 'A3-11.A'), this.add.sprite(0, 0, 'A3-12')];
            this.nombre = "McGREGOR";
        }
        else if (this.sobreviviente == 1) {
            this.escenaImg = [this.add.sprite(0, 0, 'A3-11.B'), this.add.sprite(0, 0, 'A3-12')];
            this.nombre = "JEFF";
        }
        else if (this.sobreviviente == 2) {
            this.escenaImg = [this.add.sprite(0, 0, 'A3-11.C'), this.add.sprite(0, 0, 'A3-12')];
            this.nombre = "BETTY";
        }

        this.escenaImg[1].visible = false;
        //DECLARAMOS LOS DIALOGOS
        this.dialogo = ["ARTHUR: Hola Sophie, trajimos algo de comer. \n¿Cómo sigue su pierna?",
            "SOPHIE: Nada bien me temo, tiene fiebre, \ncreo que se está infectando la herida"];

        this.text = this.add.text(32, 120, '', { font: "16px Play", fill: "#000" });
        this.textOptionA = this.add.text(32, 750, '', { font: "18px Play", fill: "#000" });
        this.textOptionB = this.add.text(32, 780, '', { font: "18px Play", fill: "#000" });
        this.textOptionA11 = this.add.text(32, 750, '', { font: "18px Play", fill: "#000" });
        this.textOptionB11 = this.add.text(32, 780, '', { font: "18px Play", fill: "#000" });
        this.textOption12 = this.add.text(32, 780, '', { font: "18px Play", fill: "#000" });


        //CLIC SOBRE LOS TEXTOS DE OPCIONES
        this.textOptionA.inputEnabled = true;
        this.textOptionB.inputEnabled = true;
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
        this.updateMedidorDisminuir(this.medidorComida, 0, 10, this.textMedidorComida);
        this.auxMedidorDisminuye = true;
        this.updateMedidorDisminuir(this.medidorAgua, 0, 10, this.textMedidorAgua);
        alert("Escena Recoleccion")
        this.game.state.start('Recoleccion', true, false, this.sobreviviente, this.medicina, this.vidaSobreviviente,
            this.medidorAgua.getValor(), this.medidorComida.getValor(), this.medidorVida.getValor(), this.medidorSocial.getValor(),
            this.vidaAmber, this.botiquin);
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
    callEscena11A() {
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        this.clearText();
        this.updateMedidorAumentar(this.medidorSocial, 0, 10, this.textMedidorSocial);
        this.medicina--;
        alert(this.medicina)
        this.escena = 1;
    },
    callEscena11B() {
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        this.clearText();
        this.sobreviviente--;
        alert(this.sobreviviente)
        this.escena = 1;
    },
    callEscena12A() {
        this.textOptionA11.setText("");
        this.textOptionB11.setText("");
        this.clearText();
        this.medicina--;
        this.verificarVariables();
        this.escena = 2;
    },
    callEscena12B() {
        this.textOptionA11.setText("");
        this.textOptionB11.setText("");
        this.clearText();
        this.vidaAmber--;
        this.verificarVariables();
        this.escena = 2;
    },
    verificarVariables() {
        if (this.vidaAmber === 0 || this.vidaSobreviviente === 0 || this.medidorAgua.getValor() === 0
            || this.medidorComida.getValor() === 0 || this.medidorVida.getValor() === 0 || this.medidorSocial.getValor() === 0) {
            alert("Aca termina el juego");
        }
    },
    update: function () {
        if (this.escena == 0) {
            this.textOptionA.events.onInputUp.add(this.callEscena11A, this);
            this.textOptionB.events.onInputUp.add(this.callEscena11B, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("a) Dar medicamento a " + this.nombre);
                this.textOptionB.setText("b) Guardar la medicina");
                this.clearText();
                this.updateText();
            }
        } else if (this.escena == 1) {
            this.textOptionA11.events.onInputUp.add(this.callEscena12A, this);
            this.textOptionB11.events.onInputUp.add(this.callEscena12B, this);
            this.dialogo = ["ÁMBER: Mira Arthur, la marea está creciendo, \ndebemos movernos o cuando estemos durmiendo el\n" +
                " agua nos cubrirá, mi herida creo que está empeorando", "ARTHUR: Vayamos más adentro de los árboles, \npero antes comamos algo"];
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA11.setText("a) Dar medicina a Ámber");
                this.textOptionB11.setText("b) Guardar medicina");
                this.clearText();
                this.updateText();
            }
        } else if (this.escena == 2) {
            this.escenaImg[0].visible = false;
            this.escenaImg[1].visible = true;
            this.textOption12.events.onInputUp.add(this.startGame, this);
            this.dialogo = ["SOPHIE: Viste la señal que hice, \nespero que la puedan ver desde algún lugar",
                "ARTHUR: Sophie si algún avión pasa por ésta isla, \ncréeme que la verán.", "ARTHUR: ¡Bueno! Creo que éste es un" +
                " buen lugar, \niré por ramas y algunas piedras para hacer algo \ncon lo que nos podamos cubrir"];
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOption12.setText("a) Continuar");
                this.clearText();
                this.updateText();
            }

        }

    }

};