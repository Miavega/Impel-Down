GameState.SucesosAleatorios = function (game) { };
GameState.SucesosAleatorios.prototype = {
    init: function (sobreviviente, medicina, vidaSobreviviente, valorAgua, valorComida, valorVida, valorSocial,
        vidaAmber, botiquin, evento, esceanaRetorno) {
        this.sobreviviente = sobreviviente;
        this.medicina = medicina;
        this.vidaSobreviviente = vidaSobreviviente;
        this.valorAgua = valorAgua;
        this.valorComida = valorComida;
        this.valorVida = valorVida;
        this.valorSocial = valorSocial;
        this.vidaAmber = vidaAmber;
        this.botiquin = botiquin;
        this.evento = evento;
        this.escenaRetorno = esceanaRetorno;
    },
    create: function () {
        //DECLARAMOS LAS ESCENAS
        this.escenaImg = []
        this.escenaImg = [this.add.sprite(0, 0, 'A3-R1'), this.add.sprite(0, 0, 'A3-R2'),
        this.add.sprite(0, 0, 'A3-R3'), this.add.sprite(0, 0, 'A3-R4'), this.add.sprite(0, 0, 'A3-R5')
        ];

        this.escenaImg[0].visible = false;
        this.escenaImg[1].visible = false;
        this.escenaImg[2].visible = false;
        this.escenaImg[3].visible = false;
        this.escenaImg[4].visible = false;

        //DECLARAMOS LOS DIALOGOS
        this.dialogo = [];

        this.text = this.add.text(32, 120, '', { font: "16px Play", fill: "#000000" });
        this.textOptionA = this.add.text(32, 720, '', { font: "18px Play", fill: "#000000" });
        this.textOptionB = this.add.text(32, 750, '', { font: "18px Play", fill: "#000000" });
        this.textOptionC = this.add.text(32, 780, '', { font: "18px Play", fill: "#000000" });

        //CLIC SOBRE LOS TEXTOS DE OPCIONES
        this.textOptionA.inputEnabled = true;
        this.textOptionB.inputEnabled = true;
        this.textOptionC.inputEnabled = true;

        //CONFIGURACIÓN DEL TEXTO
        this.line = [];

        this.wordIndex = 0;
        this.lineIndex = 0;

        this.wordDelay = 130;
        this.lineDelay = 400;

        this.buttonPress = 0;
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
        if (this.escenaRetorno == 0) {
            this.game.state.start('CuartaEscenaA3', true, false, this.sobreviviente, this.medicina, this.vidaSobreviviente,
                this.medidorAgua.getValor(), this.medidorComida.getValor(), this.medidorVida.getValor(), this.medidorSocial.getValor(),
                this.vidaAmber, this.botiquin, 1);
        } else if (this.escenaRetorno == 1) {
            this.game.state.start('QuintaEscenaA3', true, false, this.sobreviviente, this.medicina, this.vidaSobreviviente,
                this.medidorAgua.getValor(), this.medidorComida.getValor(), this.medidorVida.getValor(), this.medidorSocial.getValor(),
                this.vidaAmber, this.botiquin);
        }
    },
    //OPCIONES SUCESO TIPO I
    callSucesoTipoIA: function () {
        this.updateMedidorAumentar(this.medidorComida, 20, 1, this.textMedidorComida);
        this.auxMedidorAumenta = true;
        this.updateMedidorAumentar(this.medidorSocial, 10, 1, this.textMedidorSocial);
        this.startGame();
    },
    callSucesoTipoIB: function () {
        this.updateMedidorDisminuir(this.medidorVida, 15, 1, this.textMedidorVida);
        this.updateMedidorAumentar(this.medidorComida, 20, 1, this.textMedidorComida);
        this.auxMedidorDisminuye = true;
        this.updateMedidorDisminuir(this.medidorAgua, 15, 1, this.textMedidorAgua);
        if (this.sobreviviente == 2) {
            this.textOptionA.events.onInputUp.add(this.callSucesoB1, this);
            this.textOptionB.events.onInputUp.add(this.callSucesoB2, this);
            this.textOptionC.events.onInputUp.add(this.callSucesoB1, this);
            this.textOptionA.setText("a) Usar vendaje");
            this.textOptionB.setText("b) Guardar vendaje para otra ocasión");
            this.textOptionC.setText("");
        } else {
            this.startGame();
        }
    },
    callSucesoTipoIC: function () {
        this.updateMedidorDisminuir(this.medidorComida, 10, 1, this.textMedidorComida);
        this.auxMedidorDisminuye = true;
        this.updateMedidorDisminuir(this.medidorAgua, 10, 1, this.textMedidorAgua);
        this.startGame();
    },
    //OPCIONES SI TOME ELEGI LA OPCIÓN B
    callSucesoB1: function () {
        this.updateMedidorDisminuir(this.medidorVida, 5, 1, this.textMedidorVida);
        this.botiquin--;
        this.updateMedidorDisminuir(this.medidorSocial, 10, 1, this.textMedidorSocial);
        this.startGame();
    },
    callSucesoB2: function () {
        this.startGame();
    },
    //OPCIONES SUCESO TIPO II
    callSucesoTipoIIA: function () {
        this.updateMedidorAumentar(this.medidorComida, 20, 1, this.textMedidorComida);
        this.auxMedidorAumenta = true;
        this.updateMedidorAumentar(this.medidorSocial, 10, 1, this.textMedidorSocial);
        this.startGame();
    },
    callSucesoTipoIIB: function () {
        //BETTY VIVE TENEMOS BOTIQUÍN
        this.updateMedidorDisminuir(this.medidorVida, 15, 1, this.textMedidorVida);
        this.updateMedidorAumentar(this.medidorComida, 20, 1, this.textMedidorComida);
        this.auxMedidorDisminuye = true;
        this.updateMedidorDisminuir(this.medidorAgua, 15, 1, this.textMedidorAgua);
        if (this.sobreviviente == 2) {
            this.textOptionA.events.onInputUp.add(this.callSucesoB1, this);
            this.textOptionB.events.onInputUp.add(this.callSucesoB2, this);
            this.textOptionC.events.onInputUp.add(this.callSucesoB1, this);
            this.textOptionA.setText("a) Usar vendaje");
            this.textOptionB.setText("b) Guardar vendaje para otra ocasión");
            this.textOptionC.setText("");
        } else {
            this.startGame();
        }
    },
    callSucesoTipoIIC: function () {
        this.updateMedidorDisminuir(this.medidorComida, 10, 1, this.textMedidorComida);
        this.auxMedidorDisminuye = true;
        this.updateMedidorDisminuir(this.medidorAgua, 10, 1, this.textMedidorAgua);
        this.startGame();
    },
    //OPCIONES SUCESO TIPO III
    callSucesoTipoIIIA: function () {
        this.updateMedidorDisminuir(this.medidorVida, 5, 1, this.textMedidorVida);
        this.medicina--;
        this.startGame();
    },
    callSucesoTipoIIIB: function () {
        this.updateMedidorDisminuir(this.medidorVida, 1, 15
            , this.textMedidorVida);
        this.startGame();
    },
    //OPCIONES SUCESO TIPO IV
    callSucesoTipoIV: function () {
        this.updateMedidorAumentar(this.medidorAgua, 10, 1, this.textMedidorAgua);
        this.startGame();
    },
    //OPCIONES SUCESO TIPO V
    callSucesoTipoV: function () {
        this.medicina++;
        this.startGame();
    },
    update: function () {
        //SUCESOS ALEATORIOS (TIPO I = 0, TIPO II = 1, TIPO III = 2, TIPO IV = 3, TIPO V = 4)
        //LA VARIABLE LLEGA DESDE EL JS DONDE LLAMEN A ESTE, DEBE VALIDARSE QUE LA ESCENA NO FUE LLAMADA ANTERIORMENTE
        //SUCESO ALEATORIO TIPO I
        if (this.evento == 0) {
            this.escenaImg[this.evento].visible = true;
            this.dialogo = ["ARTHUR: Si lo hago bien, obtendremos algo de comida"];
            this.textOptionA.events.onInputUp.add(this.callSucesoTipoIA, this);
            this.textOptionB.events.onInputUp.add(this.callSucesoTipoIB, this);
            this.textOptionC.events.onInputUp.add(this.callSucesoTipoIC, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                //McGREGOR VIVE TENEMOS ARMA
                if (this.sobreviviente == 0) {
                    this.textOptionA.setText("a) Usar el arma para matar al cocodrilo");
                } else {
                    this.textOptionA.setText("");
                }
                this.textOptionB.setText("b) Combatir con el cocodrilo");
                this.textOptionC.setText("c) Escapar del cocodrilo");
                this.clearText();
                this.updateText();
            }
        }
        //SUCESO ALEATORIO TIPO II
        if (this.evento == 1) {
            this.escenaImg[this.evento].visible = true;
            this.dialogo = ["ARTHUR: Ésta es una buena oportunidad de obtener algo de carne"];
            this.textOptionA.events.onInputUp.add(this.callSucesoTipoIIA, this);
            this.textOptionB.events.onInputUp.add(this.callSucesoTipoIIB, this);
            this.textOptionC.events.onInputUp.add(this.callSucesoTipoIIC, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                //McGREGOR VIVE TENEMOS ARMA
                if (this.sobreviviente == 0) {
                    this.textOptionA.setText("a) Usar el arma para matar a la hiena");
                } else {
                    this.textOptionA.setText("");
                }
                this.textOptionB.setText("b) Combatir con la hiena");
                this.textOptionC.setText("c) Escapar de la hiena");
                this.clearText();
                this.updateText();
            }
        }
        //SUCESO ALEATORIO TIPO III
        if (this.evento == 2) {
            this.escenaImg[this.evento].visible = true;
            this.dialogo = ["ARTHUR: ¡Aghhhhhhh! Que fue eso, esto me puede traer \n problemas si no hago algo"];
            this.textOptionA.events.onInputUp.add(this.callSucesoTipoIIIA, this);
            this.textOptionB.events.onInputUp.add(this.callSucesoTipoIIIB, this);
            this.textOptionC.events.onInputUp.add(this.callSucesoTipoIIIA, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                //NO DEPENDE DE NINGÚN SOBREVIVIENTE; SE CONTINUA LA EJECUCIÓN NORMAL
                this.textOptionA.setText("a) Usar medicamento para la picadura");
                this.textOptionB.setText("b) Guardar medicamento para otra ocasión");
                this.textOptionC.setText("");
                this.clearText();
                this.updateText();
            }
        }
        //SUCESO ALEATORIO TIPO IV
        if (this.evento == 3) {
            this.escenaImg[this.evento].visible = true;
            this.dialogo = ["ARTHUR: Por fin la suerte me sonríe, el agua nos vendrá muy bien"];
            this.textOptionA.events.onInputUp.add(this.callSucesoTipoIV, this);
            this.textOptionB.events.onInputUp.add(this.callSucesoTipoIV, this);
            this.textOptionC.events.onInputUp.add(this.callSucesoTipoIV, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                //NO DEPENDE DE NINGÚN SOBREVIVIENTE; SE CONTINUA LA EJECUCIÓN NORMAL
                this.textOptionA.setText("Continuar ");
                this.textOptionB.setText("");
                this.textOptionC.setText("");
                this.clearText();
                this.updateText();
            }
        }
        //SUCESO ALEATORIO TIPO V
        if (this.evento == 4) {
            this.escenaImg[this.evento].visible = true;
            this.dialogo = ["ARTHUR: Genial, esto vendrá bien con las heridas de los demás"];
            this.textOptionA.events.onInputUp.add(this.callSucesoTipoV, this);
            this.textOptionB.events.onInputUp.add(this.callSucesoTipoV, this);
            this.textOptionC.events.onInputUp.add(this.callSucesoTipoV, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("Continuar");
                this.textOptionB.setText("");
                this.textOptionC.setText("");
                this.clearText();
                this.updateText();
            }
        }
    }

};