GameState.SegundaEscena = function (game) { };
GameState.SegundaEscena.prototype = {
    init: function (agua, comida, vida, social) {
        this.valorAgua = agua;
        this.valorComida = comida;
        this.valorVida = vida;
        this.valorSocial = social;
    },
    create: function () {
        //DECLARAMOS TIPO DE LETRA Y TODO ESO PARA EL CONTADOR Y EL PUNTAJE
        this.text = this.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65" });

        //DECLARAMOS EL FONDO Y EL SPRITE DEL AVIÓN
        this.screen = this.add.sprite(0, 0, 'screen-sky');

        //DECLARAMOS LAS ESCENAS
        this.escenaImg = []
        this.escenaImg = [this.add.sprite(0, 0, 'A1-2'), this.add.sprite(0, 0, 'A1-2.1'),
        this.add.sprite(0, 0, 'A1-2.1.1'), this.add.sprite(0, 0, 'A1-GIF1'), this.add.sprite(0, 0, 'A1-2.1.2.1'),
        this.add.sprite(0, 0, 'A1-2.1.2.2'), this.add.sprite(0, 0, 'A1-2.2'), this.add.sprite(0, 0, 'A1-2'),
        this.add.sprite(0, 0, 'A1-2.2.1.1'), this.add.sprite(0, 0, 'A1-2.2.1.2'), this.add.sprite(0, 0, 'A1-GIF2'),
        ];

        this.escenaImg[1].visible = false;
        this.escenaImg[2].visible = false;
        this.escenaImg[3].visible = false;
        this.escenaImg[4].visible = false;
        this.escenaImg[5].visible = false;
        this.escenaImg[6].visible = false;
        this.escenaImg[7].visible = false;
        this.escenaImg[8].visible = false;
        this.escenaImg[9].visible = false;
        this.escenaImg[10].visible = false;

        //DECLARAMOS LOS DIALOGOS
        this.dialogo = ["CAPITÁN: Señores pasajeros, les habla su capitán, nos encontramos " +
            "\n a 3 horas de nuestro destino, recuerden que pueden hacer uso del " +
            "\n mini bar."];

        this.text = this.add.text(32, 120, '', { font: "16px Play", fill: "#ffffff" });
        this.textOptionA = this.add.text(32, 750, '', { font: "18px Play", fill: "#ffffff" });
        this.textOptionB = this.add.text(32, 780, '', { font: "18px Play", fill: "#ffffff" });
        this.textOptionDecisionA = this.add.text(32, 750, '', { font: "18px Play", fill: "#ffffff" });
        this.textOptionDecisionB = this.add.text(32, 780, '', { font: "18px Play", fill: "#ffffff" });
        this.textOptionADecisionA = this.add.text(32, 750, '', { font: "18px Play", fill: "#ffffff" });
        this.textOptionBDecisionB = this.add.text(32, 780, '', { font: "18px Play", fill: "#ffffff" });

        //CLIC SOBRE LOS TEXTOS DE OPCIONES
        this.textOptionA.inputEnabled = true;
        this.textOptionB.inputEnabled = true;
        this.textOptionDecisionA.inputEnabled = true;
        this.textOptionDecisionB.inputEnabled = true;
        this.textOptionADecisionA.inputEnabled = true;
        this.textOptionBDecisionB.inputEnabled = true;

        //CONFIGURACIÓN DEL TEXTO
        this.line = [];

        this.wordIndex = 0;
        this.lineIndex = 0;

        this.wordDelay = 130;
        this.lineDelay = 400;

        this.buttonPress = 0;
        this.escena = 0;
        //BANDERA DE DECISIÓN
        this.decision = 0;
        this.auxMedidor = true;
        this.decisionA = true;
        this.decisionB = true;

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

        this.medidorAgua = new StatusBar(this.game, 0, 0);
        this.medidorComida = new StatusBar(this.game, 135, 0);
        this.medidorVida = new StatusBar(this.game, 270);
        this.medidorSocial = new StatusBar(this.game, 405);

        this.medidorAgua.setValor(this.valorAgua);
        this.medidorComida.setValor(this.valorComida);
        this.medidorVida.setValor(this.valorVida);
        this.medidorSocial.setValor(this.valorSocial);

        //Agregamos el Overlay
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
    callEscena21: function () {
        this.textOptionDecisionA.setText("");
        this.textOptionDecisionB.setText("");
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        this.textOptionADecisionA.setText("");
        this.textOptionBDecisionB.setText("");
        this.decisionA = true;
        this.decision = 0;
        this.escena = 1;
        this.clearText();
    },
    callEscena211: function () {
        this.textOptionDecisionA.setText("");
        this.textOptionDecisionB.setText("");
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        this.textOptionADecisionA.setText("");
        this.textOptionBDecisionB.setText("");
        this.escena = 3;
        this.clearText();
    },
    callEscena212: function () {
        this.textOptionDecisionA.setText("");
        this.textOptionDecisionB.setText("");
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        this.textOptionADecisionA.setText("");
        this.textOptionBDecisionB.setText("");
        this.auxMedidor = true;
        this.escena = 4;
        this.clearText();
    },
    callEscena2121: function () {
        this.textOptionDecisionA.setText("");
        this.textOptionDecisionB.setText("");
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        this.textOptionADecisionA.setText("");
        this.textOptionBDecisionB.setText("");
        this.textOptionADecisionA.destroy();
        this.textOptionBDecisionB.destroy();
        this.decisionB = true;
        this.escena = 5;
        this.clearText();
    },
    callEscena2122: function () {
        this.textOptionDecisionA.setText("");
        this.textOptionDecisionB.setText("");
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        this.textOptionADecisionA.setText("");
        this.textOptionBDecisionB.setText("");
        this.textOptionADecisionA.destroy();
        this.textOptionBDecisionB.destroy();
        this.decisionB = false;
        this.escena = 6;
        this.clearText();
    },
    callEscena21211: function () {
        this.textOptionDecisionA.setText("");
        this.textOptionDecisionB.setText("");
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        this.textOptionADecisionA.setText("");
        this.textOptionBDecisionB.setText("");
        this.escena = 7;
        this.clearText();
    },
    callEscena22: function () {
        this.textOptionDecisionA.setText("");
        this.textOptionDecisionB.setText("");
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        this.textOptionADecisionA.setText("");
        this.textOptionBDecisionB.setText("");
        this.decisionA = false;
        this.decision = 1;
        this.escena = 2;
        this.clearText();
    },
    callEscena23: function () {
        this.textOptionDecisionA.setText("");
        this.textOptionDecisionB.setText("");
        this.textOptionA.setText("");
        this.textOptionB.setText("");
        this.textOptionADecisionA.setText("");
        this.textOptionBDecisionB.setText("");
        this.escena = 8;
        this.clearText();
    },
    updateMedidorDisminuir(medidor, rangoa, rangob) {
        if (this.auxMedidor) {
            this.numero = Math.floor((Math.random() * rangoa) + rangob);
            medidor.setValor(this.numero);
            this.auxMedidor = false;
        }
    },
    updateMedidorAumentar(medidor, rangoa, rangob) {
        if (this.auxMedidor) {
            this.numero = (Math.floor((Math.random() * rangoa) + rangob) * -1);
            medidor.setValor(this.numero);
            this.auxMedidor = false;
        }
    },
    update: function () {
        //ESCENA 2
        if (this.escena == 0) {
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.clearText();
                this.updateText();
                this.textOptionDecisionA.events.onInputUp.add(this.callEscena21, this);
                this.textOptionDecisionB.events.onInputUp.add(this.callEscena22, this);
                this.textOptionDecisionA.setText("a) Levantarse de la silla por una bebida.");
                this.textOptionDecisionB.setText("b) Permanecer en el asiento.");
            }
        }
        //ESCENA 2.1
        else if (this.escena == 1) {
            this.escenaImg[0].visible = false;
            this.escenaImg[1].visible = true;
            this.textOptionA.events.onInputUp.add(this.callEscena211, this);
            this.textOptionB.events.onInputUp.add(this.callEscena211, this);
            this.textOptionB.setText("");
            this.dialogo = ["AZAFATA ÁMBER: Me preocupa que el capitán no durmió bien \n anoche, y el clima no está nada bien.",
                "AZAFATA BETTY: Y ¿tú cómo sabes que no durmió bien?.", "ARTHUR: °No sonó nada bien eso, será mejor que despierte " +
                "a \n Sophie, le llevaré algo de beber°"
            ];
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("Continuar");
                this.clearText();
                this.updateText();
            }
        }
        //ESCENA 2.2
        else if (this.escena == 2) {
            this.escenaImg[0].visible = false;
            this.escenaImg[6].visible = true;
            this.textOptionA.events.onInputUp.add(this.callEscena212, this);
            this.textOptionB.setText("");
            this.dialogo = ["FOLLETO DE REACCIÓN DE EMERGENCIAS", "ARTHUR: °Pensar que muchas veces nunca nos tomamos ni la \n molestia de leer éstas cosas.°"
            ];
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("Continuar");
                this.clearText();
                this.updateText();
            }
        }
        //ESCENA 2.1.1
        else if (this.escena == 3) {
            this.escenaImg[1].visible = false;
            this.escenaImg[2].visible = true;
            this.textOptionA.events.onInputUp.add(this.callEscena212, this);
            this.textOptionB.setText("");
            this.dialogo = ["SOPHIE: ¿Ya llegamos?", "ARTHUR: Estamos cerca, traje algo de beber, tu jugo favorito.",
                "SOPHIE: Gracias, ¿Estás bien?, tienes cara de haber visto un \n gremlin en la ventana del avión.",
                "ARTHUR: Solo es ansiedad, toma tu jugo."
            ];
            this.updateMedidorAumentar(this.medidorSocial, 5, 5);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("Continuar");
                this.clearText();
                this.updateText();
            }
        }
        //ESCENA 2.1.2
        else if (this.escena == 4) {
            if (this.decision == 0) {
                this.escenaImg[2].visible = false;
                this.escenaImg[3].visible = true;
            }
            else if (this.decision == 1) {
                this.escenaImg[6].visible = false;
                this.escenaImg[7].visible = true;
            }
            this.textOptionA.setText("");
            this.textOptionB.setText("");
            this.textOptionADecisionA.events.onInputUp.add(this.callEscena2121, this);
            this.textOptionBDecisionB.events.onInputUp.add(this.callEscena2122, this);
            this.dialogo = ["CAPITÁN: Señores pasajeros les habla su capitán, estamos pasando  \n por una tormenta y habrá " +
                "turbulencia, por favor abróchense \n los cinturones y permanezcan en calma."
            ];
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionADecisionA.setText("a) Hablar con la azafata");
                this.textOptionBDecisionB.setText("b) Hablar con el pasajero del lado");
                this.clearText();
                this.updateText();
            }
        }
        //ESCENA 2.1.2.1
        else if (this.escena == 5) {
            this.textOptionA.events.onInputUp.add(this.callEscena21211, this);
            if (this.decision == 0) {
                this.escenaImg[3].visible = false;
                this.escenaImg[4].visible = true;
                this.dialogo = ["ARTHUR: Disculpe señorita, no quisiera molestar, pero escuché \n lo que hablaba con su compañera " +
                    "hace un momento \n y quisiera saber si todo está bien..", "AZAFATA ÁMBER: Eso no es de su incumbencia, abróchese el \n cinturón.",
                    "ARTHUR: Es de mi incumbencia desde el momento en que subimos \n a éste avión",
                    "AZAFATA BETTY: Que sucede, señor por favor vuelva a su asiento \n y tranquilícese",
                    "ARTHUR: ¡No me voy a tranquilizar hasta que responda mi pregunta!",
                    "AGENTE McGREGOR: Señor, soy el agente encargado de éste vuelo, \n por favor vuelva a su asiento o tendré que esposarlo."
                ];
            }
            else if (this.decision == 1) {
                this.escenaImg[6].visible = false;
                this.escenaImg[8].visible = true;
                this.dialogo = ["ARTHUR: Señorita que está ocurriendo, ¿está todo bien? \n Su compañera luce algo alterada", "AZAFATA BETTY: Tranquilo señor, éstas cosas son normales, " +
                    "\n mantenga la calma.", "ARTHUR: De acuerdo."
                ];
            }
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("Continuar");
                this.textOptionB.setText("");
                this.clearText();
                this.updateText();
            }
        }
        //ESCENA 2.1.2.2
        else if (this.escena == 6) {
            this.escenaImg[3].visible = false;
            this.textOptionA.events.onInputUp.add(this.callEscena21211, this);
            if (this.decision == 0) {
                this.escenaImg[5].visible = true;
                this.dialogo = ["ARTHUR: Odio cuando pasan éstas cosas en un vuelo.", "JEFF: ¿Disculpa? Lo siento, estaba con mi música.",
                    "ARTHUR: Está bien, es solo que no me agradan las turbulencias, \n y menos sabiendo que el capitán tuvo una noche agitada.",
                    "JEFF: De que hablas, por qué dices eso.", "ARTHUR: hace un rato escuche a una de las azafatas y se le \n escapó mencionarlo.",
                    "JEFF: No lo puedo creer, ¿cuál de ellas, la que viene ahí verdad? \n De seguro fue ella.", "ARTHUR: Espera…",
                    "JEFF: Señorita, que clase de profesional es usted, como se atreve \n a trabajar en ese estado.", "AZAFATA ÁMBER: Señor no sé de " +
                    "qué me habla, por favor cálmese y…"
                ];
            }
            else if (this.decision == 1) {
                this.escenaImg[9].visible = true;
                this.dialogo = ["ARTHUR: Odio cuando pasan éstas cosas en un vuelo.", "Jeff: ¿Disculpa? Lo siento, estaba con mi música.",
                    "ARTHUR: Está bien, es solo que no me agradan las turbulencias.",
                    "JEFF: ¿Primer vuelo? Éstas cosas suelen pasar, el tema del \n cinturón es solo por protocolo, me lo " +
                    "quitaré y así estarás \n más seguro", "ARTHUR: No es necesario, descuida estoy bien, ponte esa cosa."
                ];
            }
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("Continuar");
                this.textOptionB.setText("");
                this.clearText();
                this.updateText();
            }
        }
        //ESCENA FIN DE ACTO
        else if (this.escena == 7) {
            this.escenaImg[4].visible = false;
            this.escenaImg[5].visible = false;
            this.escenaImg[8].visible = false;
            this.escenaImg[9].visible = false;
            this.escenaImg[10].visible = true;
            this.textOptionA.events.onInputUp.add(this.callEscena23, this);
            this.dialogo = ["CAPITÁN: Señores pasajeros, por favor usen las mascarillas que \n están sobre sus cabezas y " +
                "permanezcan en sus asientos, \n ¡Mayday! ¡Mayday! Los controles del avión no responden", "ARTHUR: Sophie toma mi mano, no la sueltes",
                "SOPHIE: Papá tengo miedo, que está pasando", "ARTHUR: Todo va a estar bien"
            ];
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("Continuar");
                this.textOptionB.setText("");
                this.clearText();
                this.updateText();
            }
        }
        //ESCENA 2.3
        else if (this.escena == 8) {
            this.game.state.start('TerceraEscena', false, false, this.decisionA, this.decisionB);
        }
    },

};