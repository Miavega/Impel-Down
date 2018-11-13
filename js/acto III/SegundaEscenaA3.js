GameState.SegundaEscenaA3 = function (game) { };
GameState.SegundaEscenaA3.prototype = {
    init: function (sobreviviente, medicina, vidaSobreviviente, valorAgua, valorComida, valorVida, valorSocial, musica) {
        this.sobreviviente = sobreviviente;
        this.medicina = medicina;
        this.vidaSobreviviente = vidaSobreviviente;
        this.valorAgua = valorAgua;
        this.valorComida = valorComida;
        this.valorVida = valorVida;
        this.valorSocial = valorSocial;
        this.musica = musica;
    },
    create: function () {
        //DECLARAMOS LAS ESCENAS
        this.escenaImg = []
        this.escenaImg = [this.add.sprite(0, 0, 'A3-5')];


        //DECLARAMOS LOS DIALOGOS
        this.dialogo = ["ARTHUR: ¡Sophie!", "SOPHIE: ¡Papá!", "-Se abrazan-",
            "ARTHUR: Sabía que te encontraría, ¿Estás bien, estás herida?", "SOPHIE: Solo algo de mareo, pero creo que ella necesita ayuda.",
            "ARTHUR: Soy Arthur, déjame ver tu herida", "ÁMBER: Soy Ámber, no creo que sea nada grave."];

        this.text = this.add.text(32, 120, '', { font: "16px Play", fill: "#000000" });
        this.textOptionA = this.add.text(32, 750, '', { font: "18px Play", fill: "#000000" });
        this.textOptionB = this.add.text(32, 780, '', { font: "18px Play", fill: "#000000" });
        this.textOptionA2 = this.add.text(32, 750, '', { font: "18px Play", fill: "#000000" });

        //CLIC SOBRE LOS TEXTOS DE OPCIONES
        this.textOptionA.inputEnabled = true;
        this.textOptionB.inputEnabled = true;
        this.textOptionA2.inputEnabled = true;

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

        //SE INICIALIZA EL CONTADOR DEL BOTIQUIN Y LA VIDA DE AMBER
        if(this.sobreviviente === 2) {
            this.botiquin = 3;
        }else{
            this.botiquin = 0;
        }
        this.vidaAmber = 3;

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

        //INICIAR LA ESCENA TENIENDO EN CUENTA SI HAY BOTIQUIN O NO
        this.iniciarEscena();
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
        this.game.state.start('TerceraEscenaA3', true, false, this.sobreviviente, this.medicina, this.vidaSobreviviente,
            this.medidorAgua.getValor(), this.medidorComida.getValor(), this.medidorVida.getValor(), this.medidorSocial.getValor(),
            this.vidaAmber, this.botiquin, this.musica);
    },
    callEscena6: function () {
        this.vidaAmber--;
        this.startGame();
    },
    callEscena6Botiquin: function () {
        this.updateMedidorAumentar(this.medidorSocial, 10, 1, this.textMedidorSocial);
        this.botiquin--;
        this.startGame();
    },
    iniciarEscena(){
        if(this.botiquin === 0){
            this.escena = 1;
        }else{
            this.escena = 0;
        }
    },
    update: function () {
        if (this.escena == 0) {
            this.textOptionA.events.onInputUp.add(this.callEscena6Botiquin, this);
            this.textOptionB.events.onInputUp.add(this.callEscena6, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA.setText("a) Hacer curación a Ámber");
                this.textOptionB.setText("b) Guardar vendajes para otra ocasión");
                this.clearText();
                this.updateText();
            }
        }
        if (this.escena === 1) {
            this.textOptionA2.events.onInputUp.add(this.callEscena6, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA2.setText("a) Continuar");
                this.clearText();
                this.updateText();
            }
        }
    }

};