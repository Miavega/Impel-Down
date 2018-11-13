GameState.SegundaEscenaA5= function (game) { };
GameState.SegundaEscenaA5.prototype = {
    init: function (valorAgua, valorComida, valorVida, valorSocial, musica) {
        this.valorAgua = valorAgua;
        this.valorComida = valorComida;
        this.valorVida = valorVida;
        this.valorSocial = valorSocial;
        this.musica = musica;
    },
    create: function () {
        //DECLARAMOS LAS ESCENAS
        this.escenaImg = [];
        this.escenaImg = [this.add.sprite(0, 0, 'A5-25'), this.add.sprite(0, 0, 'A5-25.1'), this.add.sprite(0, 0, 'A5-25.1.1'),
            this.add.sprite(0, 0, 'A5-25.2'), this.add.sprite(0, 0, 'A5-25.2.1')];



        this.escenaImg[1].visible = false;
        this.escenaImg[2].visible = false;
        this.escenaImg[3].visible = false;
        this.escenaImg[4].visible = false;
        //DECLARAMOS LOS DIALOGOS
        this.dialogo = ["ARTHUR: La tormenta es muy fuerte, hay demasiada agua",
            "ÁMBER: Esto no nos aguantará a los 3, Arthur, sube con Sophie", "ARTHUR: No te dejaremos aquí, sujétate",
        "SOPHIE: ¡Papá no te sueltes!"];


        this.text = this.add.text(32, 120, '', { font: "16px Play", fill: "#000" });
        this.textOptionA25 = this.add.text(32, 750, '', { font: "18px Play", fill: "#000" });
        this.textOptionB25 = this.add.text(32, 780, '', { font: "18px Play", fill: "#000" });
        this.textOptionA251 = this.add.text(32, 750, '', { font: "18px Play", fill: "#000" });
        this.textOptionA2511 = this.add.text(32, 750, '', { font: "18px Play", fill: "#000" });
        this.textOptionA252= this.add.text(32, 780, '', { font: "18px Play", fill: "#000" });
        this.textOptionA2521= this.add.text(32, 750, '', { font: "18px Play", fill: "#000" });

        //CLIC SOBRE LOS TEXTOS DE OPCIONES
        this.textOptionA25.inputEnabled = true;
        this.textOptionB25.inputEnabled = true;
        this.textOptionA251.inputEnabled = true;
        this.textOptionA2511.inputEnabled = true;
        this.textOptionA252.inputEnabled = true;
        this.textOptionA2521.inputEnabled = true;

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
        if (this.buttonPress === 0) {
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
        //this.game.state.start('gameover');
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
    //METODO DESTINADO A MOSTRAR EL FINAL DEL JUEGO
    finDelJuego(){
        this.musica.stop();
        this.game.state.start('gameover');
    },
    callEscena251(){
        this.clearText();
        this.textOptionA25.setText("");
        this.textOptionB25.setText("");
        this.escena = 1;
    },
    callEscena252(){
        this.clearText();
        this.textOptionA25.setText("");
        this.textOptionB25.setText("");
        this.escena = 2;
    },
    callEscena2511(){
        this.clearText();
        this.textOptionA251.setText("");
        this.escena = 3;
    },
    callEscena2521(){
        this.clearText();
        this.textOptionA252.setText("");
        this.escena = 4;
    },
    update: function () {
        if (this.escena === 0) {
            this.textOptionA25.events.onInputUp.add(this.callEscena251, this);
            this.textOptionB25.events.onInputUp.add(this.callEscena252, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA25.setText("a) Ayudar a Ámber a subir a los restos de la balsa y soltarse");
                this.textOptionB25.setText("b) Soltar a Ámber y subir con Sophie");
                this.clearText();
                this.updateText();
            }
        }else if(this.escena === 1){
            this.escenaImg[0].visible = false;
            this.escenaImg[1].visible = true;
            this.dialogo = ["ARTHUR: Sophie ayúdala a subir", "ÁMBER: La balsa se va a voltear", "ARTHUR: Aguantará, sube",
            "SOPHIE: ¡Papá no te sueltes!", "ARTHUR: Sophie, recuerda siempre que te amo", "SOPHIE: ¡Papá!...",
            "....", "-Una ola choca con la balsa y arrastra a Arthur-"];
            this.textOptionA251.events.onInputUp.add(this.callEscena2511, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA251.setText("a) Continuar");
                this.clearText();
                this.updateText();
            }
        }else if(this.escena === 2){
            this.escenaImg[0].visible = false;
            this.escenaImg[3].visible = true;
            this.dialogo = ["ARTHUR: Ámber no puedo sostenerte.", "ÁMBER: Dile a mis hijos que los amo.",
            "ARTHUR: Ámber no.", "SOPHIE: ¡Papá toma mi mano!", "-Una ola choca con la balsa y arrastra a Ámber-"];
            this.textOptionA252.events.onInputUp.add(this.callEscena2521, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA252.setText("a) Continuar");
                this.clearText();
                this.updateText();
            }
        }else if(this.escena === 3){
            this.escenaImg[1].visible = false;
            this.escenaImg[2].visible = true;
            this.dialogo = ["EXTRAÑO: ¡Ayuda! Hay dos mujeres acá, señorita ¿me escucha?" ,
            "SOPHIE: ¿Dónde estoy?", "EXTRAÑO: Estamos en Bermudas, ¿Que les pasó?", "SOPHIE: Dónde está mi papá",
            "ÁMBER: ¡Sophie!, estás bien", "SOPHIE: Ámber, ¿Dónde está mi papá? Dime que está bien",
            "ÁMBER: Lo siento, solo nosotras dos llegamos acá, \nArthur fue un héroe, y nunca lo olvidaré."];
            this.textOptionA2511.events.onInputUp.add(this.finDelJuego, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA2511.setText("a) Continuar");
                this.clearText();
                this.updateText();
            }
        }else if(this.escena === 4){
            this.escenaImg[3].visible = false;
            this.escenaImg[4].visible = true;
            this.dialogo = ["EXTRAÑO: ¡Ayuda! Hay dos personas acá, señorita ¿me escucha?",
            "SOPHIE: ¿Dónde estoy?", "EXTRAÑO: Estamos en Bermudas, que les pasó.", "SOPHIE: ¿Dónde está mi papá?",
            "ÁRTHUR: ¡Sophie!, ¿Estás bien?", "SOPHIE: Ámber, ¿Dónde está ella?",
                "ARTHUR: Creo que no lo logró, estamos vivos gracias a ella"];
            this.textOptionA2521.events.onInputUp.add(this.finDelJuego, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA2521.setText("a) Continuar");
                this.clearText();
                this.updateText();
            }
        }
    }
};