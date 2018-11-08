GameState.PrimeraEscenaA3 = function (game) { };
GameState.PrimeraEscenaA3.prototype = {
    init: function (decisionA, sobreviviente, valorAgua, valorComida, valorVida, valorSocial) {
        this.decisionA = decisionA;
        this.sobreviviente = sobreviviente;
        this.valorAgua = valorAgua;
        this.valorComida = valorComida;
        this.valorVida = valorVida;
        this.valorSocial = valorSocial;
    },
    create: function () {
        //DECLARAMOS LAS ESCENAS
        this.escenaImg = []
        if (this.sobreviviente == 0) {
            this.nombre = "McGREGOR";
            this.escenaImg = [this.add.sprite(0, 0, 'A3-4.A'), this.add.sprite(0, 0, 'A3-4.1.A')];
        }
        else if (this.sobreviviente == 1) {
            this.nombre = "JEFF";
            this.escenaImg = [this.add.sprite(0, 0, 'A3-4.B'), this.add.sprite(0, 0, 'A3-4.1.B')];
        }
        else if (this.sobreviviente == 2) {
            this.nombre = "BETTY";
            this.escenaImg = [this.add.sprite(0, 0, 'A3-4.C'), this.add.sprite(0, 0, 'A3-4.1.C')];
        }

        this.escenaImg[1].visible = false;

        //DECLARAMOS LOS DIALOGOS
        this.dialogo = [];

        this.text = this.add.text(32, 120, '', { font: "16px Play", fill: "#000000" });
        this.textOptionA = this.add.text(32, 750, '', { font: "18px Play", fill: "#000000" });
        this.textOptionB = this.add.text(32, 780, '', { font: "18px Play", fill: "#000000" });

        //CLIC SOBRE LOS TEXTOS DE OPCIONES
        this.textOptionA.inputEnabled = true;
        this.textOptionB.inputEnabled = true;

        //CONFIGURACIÓN DEL TEXTO
        this.line = [];

        this.wordIndex = 0;
        this.lineIndex = 0;

        this.wordDelay = 130;
        this.lineDelay = 400;

        this.buttonPress = 0;
        this.escena = 0;
        this.auxMedidorAumenta = true;
        this.auxMedidorDisminuye = true;
        //Variable para saber si dio medicina
        this.darMedicina = false;

        //VSE DECLARAN LAS VARIABLES QUE LLEVAN LA CUENTA DE LA VIDA DEL SOBREVIVIENTE, EL BOTIQUIN Y LA MEDICINA
        this.medicina = 3;
        this.vidaSobreviviente = 3;

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
    startGame: function () {
        //CAMBIO DE ESTADO A JUEGO
        this.game.state.start('SegundaEscenaA3', true, false, this.sobreviviente, this.medicina, this.vidaSobreviviente,
            this.medidorAgua.getValor(), this.medidorComida.getValor(), this.medidorVida.getValor(), this.medidorSocial.getValor());
    },
    callEscena41: function () {
        this.updateMedidorAumentar(this.medidorSocial, 10, 1, this.textMedidorSocial);
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        this.escena = 1;
        this.clearText();
    },
    callEscena5: function () {
        if(this.darMedicina){
            this.vidaSobreviviente--;
            this.darMedicina = false;
        }
        this.updateMedidorDisminuir(this.medidorSocial, 10, 1, this.textMedidorSocial);
        this.startGame();
    },
    callEscena5Medicina: function(){
        if(this.darMedicina){
            this.updateMedidorAumentar(this.medidorSocial,0,5,this.textMedidorSocial);
            this.medicina--;
            this.startGame();
        }
    },
    update: function () {
        if (this.escena == 0) {
            this.dialogo = ["ARTHUR: °Dónde estoy, que ha pasado, tengo que encontrar \n a Sophie°.",
                "-Arthur camina por la playa en busca de Sophie y encuentra \n a " + this.nombre + " -",
                "ARTHUR: ¡Hey! ¿Estás bien?", this.nombre + ": Creo que me rompí la pierna, no la puedo mover."
            ];
            this.textOptionA.events.onInputUp.add(this.callEscena41, this);
            this.textOptionB.events.onInputUp.add(this.callEscena5, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("a) Ayudar a " + this.nombre + " y dejarlo lejos de la orilla");
                this.textOptionB.setText("b) Ir en busca de Sophie");
                this.clearText();
                this.updateText();
            }
        }
        else if (this.escena == 1) {
            this.escenaImg[0].visible = false;
            this.escenaImg[1].visible = true;
            this.dialogo = ["ARTHUR: Te dejaré lejos de la orilla, tengo que buscar a mi hija."
                ,this.nombre+": Tranquilo, déjame junto a ese árbol, estaré bien.",
            "ARTHUR: Aquí estás.",this.nombre+": Gracias. Espero que encuentres a tu hija.",
            "ARTHUR: Sé que ella está bien, ahora vuelvo."];
            this.textOptionA.events.onInputUp.add(this.callEscena5Medicina, this);
            this.textOptionB.events.onInputUp.add(this.callEscena5, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                if(this.decisionA) {
                    this.darMedicina = true;
                    this.textOptionA.setText("a) Dar medicina");
                    this.textOptionB.setText("b) Guardar medicina");
                    this.auxMedidorAumenta = true;
                    this.clearText();
                    this.updateText();
                }else{
                    this.textOptionB.setText("a) Continuar");
                }
            }
        }
    }

};