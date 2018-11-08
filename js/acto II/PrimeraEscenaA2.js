GameState.PrimeraEscenaA2 = function (game) { };
GameState.PrimeraEscenaA2.prototype = {
    init: function (decisionA, decisionB) {
        this.decisionA = decisionA;
        this.decisionB = decisionB;
    },
    create: function () {
        //DECLARAMOS TIPO DE LETRA Y TODO ESO PARA EL CONTADOR Y EL PUNTAJE
        this.text = this.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65" });

        //DECLARAMOS LAS ESCENAS
        this.escenaImg = []
        this.escenaImg = [this.add.sprite(0, 0, 'A2-3.1'), this.add.sprite(0, 0, 'A2-3.1.1'),
        this.add.sprite(0, 0, 'A2-3.1.2'), this.add.sprite(0, 0, 'A2-3.2'), this.add.sprite(0, 0, 'A2-3.2.2')
        ];

        this.escenaImg[0].visible = false;
        this.escenaImg[1].visible = false;
        this.escenaImg[2].visible = false;
        this.escenaImg[3].visible = false;
        this.escenaImg[4].visible = false;

        //DECLARAMOS LOS DIALOGOS
        this.dialogo = [];

        this.text = this.add.text(32, 120, '', { font: "16px Play", fill: "#ffffff" });
        this.textOptionA = this.add.text(32, 750, '', { font: "18px Play", fill: "#ffffff" });
        this.textOptionB = this.add.text(32, 780, '', { font: "18px Play", fill: "#ffffff" });
        this.textA = this.add.text(32, 750, '', { font: "18px Play", fill: "#ffffff" });
        this.textB = this.add.text(32, 780, '', { font: "18px Play", fill: "#ffffff" });

        //CLIC SOBRE LOS TEXTOS DE OPCIONES
        this.textOptionA.inputEnabled = true;
        this.textOptionB.inputEnabled = true;
        this.textA.inputEnabled = true;
        this.textB.inputEnabled = true;

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
        this.medidorVida = new StatusBar(this.game, 270), 15;
        this.medidorSocial = new StatusBar(this.game, 405, 15);

        this.medidorAgua.setValor(50);
        this.medidorComida.setValor(50);
        this.medidorSocial.setValor(50);
        this.medidorVida.setValor(50);

        this.textMedidorAgua = this.add.text(35, 50, 100 - this.medidorAgua.getValor() + "%", { font: "18px Play", fill: "#ffffff" });
        this.textMedidorComida = this.add.text(175, 40, 100 - this.medidorComida.getValor() + "%", { font: "18px Play", fill: "#ffffff" });
        this.textMedidorVida = this.add.text(305, 45, 100 - this.medidorVida.getValor() + "%", { font: "18px Play", fill: "#ffffff" });
        this.textMedidorSocial = this.add.text(445, 35, 100 - this.medidorSocial.getValor() + "%", { font: "18px Play", fill: "#ffffff" });

        //AGREGAMOS EL OVERLAY
        this.add.sprite(0, 0, 'overlay');

        //SOBREVIVIENTE (MCGREGOR = 0, JEFF = 1, BETTY = 2)
        this.sobreviviente = 0;

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
    callEscena311o312: function () {
        if (this.decisionB) {
            this.escena = 1;
            this.clearText();
        } else {
            this.escena = 2;
            this.clearText();
        }
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        this.textA.setText("");
        this.textB.setText("");
        this.auxMedidorAumenta = true;
    },
    callEscena321o322: function () {
        if (!this.decisionB) {
            this.escena = 3;
            this.clearText();
        } else {
            this.escena = 4;
            this.clearText();
        }
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        this.textA.setText("");
        this.textB.setText("");
        this.auxMedidorDisminuye = true;
    },
    callActoIII: function () {
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        this.textA.setText("");
        this.textB.setText("");
        this.escena = 5;
        this.clearText();
    },
    startGame: function () {
        //CAMBIO DE ESTADO A JUEGO
        this.game.state.start('PrimeraEscenaA3', true, false, this.decisionA, this.sobreviviente, this.medidorAgua.getValor(),
            this.medidorComida.getValor(), this.medidorVida.getValor(), this.medidorSocial.getValor());
    },
    update: function () {
        //ESCENA INICIAL
        if (this.escena == 0) {
            //SE LEVANTÓ POR UNA BEBIDA
            if (this.decisionA) {
                this.escenaImg[0].visible = true;
                this.dialogo = ["SOPHIE: ¡Papá! ¡Papá!, despierta, ¿me escuchas?, Papá \n por favor háblame",
                    "ARTHUR: Sophie, ¿estás bien?, ¿estás herida? Tenemos que salir \n de acá, hay demasiada agua entrando",
                    "SOPHIE: ¿Qué hago?", "ARTHUR: Toma tu mochila y no me sueltes, veamos si alguien más \n está con vida."
                ];
                this.textA.events.onInputUp.add(this.callEscena311o312, this);
                this.textB.events.onInputUp.add(this.callEscena311o312, this);
                this.updateMedidorAumentar(this.medidorVida, 10, 1, this.textMedidorVida);
                //TOMÓ EL FOLLETO
            } else {
                this.escenaImg[3].visible = true;
                this.textA.events.onInputUp.add(this.callEscena321o322, this);
                this.textB.events.onInputUp.add(this.callEscena321o322, this);
                this.dialogo = ["ARTHUR: Sophie quédate conmigo, todo estará bien"];
                this.updateMedidorDisminuir(this.medidorVida, 5, 1, this.textMedidorVida);
            }
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textA.setText("Continuar");
                this.textB.setText("");
                this.clearText();
                this.updateText();
            }
        }
        //ESCENA 3.1.1
        else if (this.escena == 1) {
            this.sobreviviente = 0;
            this.escenaImg[0].visible = false;
            this.escenaImg[3].visible = false;
            this.escenaImg[1].visible = true;
            this.dialogo = ["SOPHIE: Sophie: Papá, el aún respira.", "ARTHUR: Él estaba sentado frente a nosotros"];
            this.textOptionA.events.onInputUp.add(this.callActoIII, this);
            this.textOptionB.events.onInputUp.add(this.callActoIII, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("a) Tomar el arma del agente McGregor y despertarlo");
                this.textOptionB.setText("b) Despertar al agente McGregor");
                this.clearText();
                this.updateText();
            }
        }
        //ESCENA 3.1.2
        else if (this.escena == 2) {
            this.sobreviviente = 1;
            this.escenaImg[0].visible = false;
            this.escenaImg[3].visible = false;
            this.escenaImg[2].visible = true;
            this.dialogo = ["SOPHIE: Sophie: Papá, el aún respira.", "ARTHUR: Él estaba sentado junto a nosotros"];
            this.textOptionA.events.onInputUp.add(this.callActoIII, this);
            this.textOptionB.events.onInputUp.add(this.callActoIII, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("a) Tomar el reproductor y ayudar a Jeff");
                this.textOptionB.setText("b) Ayudar a Jeff");
                this.clearText();
                this.updateText();
            }
        }
        //ESCENA 3.2.1
        else if (this.escena == 3) {
            this.sobreviviente = 1;
            this.escenaImg[0].visible = false;
            this.escenaImg[3].visible = false;
            this.escenaImg[2].visible = true;
            this.dialogo = ["ARTHUR: Jeff, ¿me escuchas?"];
            this.textOptionA.events.onInputUp.add(this.callActoIII, this);
            this.textOptionB.events.onInputUp.add(this.callActoIII, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("a) Tomar el reproductor y ayudar a Jeff");
                this.textOptionB.setText("b) Ayudar a Jeff");
                this.clearText();
                this.updateText();
            }
        }
        //ESCENA 3.2.2
        else if (this.escena == 4) {
            this.sobreviviente = 2;
            this.escenaImg[0].visible = false;
            this.escenaImg[3].visible = false;
            this.escenaImg[4].visible = true;
            this.dialogo = ["ARTHUR: Señorita, ¿me escucha?"];
            this.textOptionA.events.onInputUp.add(this.callActoIII, this);
            this.textOptionB.events.onInputUp.add(this.callActoIII, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("a) Tomar el bolso y ayudar a Betty");
                this.textOptionB.setText("b) Ayudar a Betty");
                this.clearText();
                this.updateText();
            }
        }
        //ESCENA ACTO III
        else if (this.escena == 5) {
            this.escenaImg[1].visible = false;
            this.escenaImg[2].visible = false;
            this.escenaImg[4].visible = false;
            this.add.button(0, 0, 'ACTO-3', this.startGame, this);
        }
    },

};