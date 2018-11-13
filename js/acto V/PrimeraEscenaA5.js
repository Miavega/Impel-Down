GameState.PrimeraEscenaA5= function (game) { };
GameState.PrimeraEscenaA5.prototype = {
    init: function (valorAgua, valorComida, valorVida, valorSocial) {
        this.valorAgua = valorAgua;
        this.valorComida = valorComida;
        this.valorVida = valorVida;
        this.valorSocial = valorSocial;
    },
    create: function () {
        //DECLARAMOS LAS ESCENAS
        this.escenaImg = [];
        this.escenaImg = [this.add.sprite(0, 0, 'A5-20'), this.add.sprite(0, 0, 'A5-21'), this.add.sprite(0, 0, 'A5-22'),
                this.add.sprite(0, 0, 'A5-23'), this.add.sprite(0, 0, 'A5-24')];



        this.escenaImg[1].visible = false;
        this.escenaImg[2].visible = false;
        this.escenaImg[3].visible = false;
        this.escenaImg[4].visible = false;
        //DECLARAMOS LOS DIALOGOS
        this.dialogo = ["SOPHIE: Espero que ésta sea la última vez que veamos ésta isla",
            "ARTHUR: Ya pronto estaremos en casa, toma un remo hija \ny ayúdame a dar dirección",
            "Ámber: Déjame a mi ayudar con eso", "ARTHUR: No quiero que tu herida se abra nuevamente, " +
            "\ndescuida, trata de dormir un rato, pronto\n" +
            "estaremos a salvo.", "ÁMBER: Ya quiero ver a mis hijos de nuevo"];


        this.text = this.add.text(32, 120, '', { font: "16px Play", fill: "#000" });
        this.textOptionA20 = this.add.text(32, 750, '', { font: "18px Play", fill: "#000" });
        this.textOptionA21 = this.add.text(32, 750, '', { font: "18px Play", fill: "#000" });
        this.textOptionB131 = this.add.text(32, 780, '', { font: "18px Play", fill: "#000" });
        this.textOptionA22 = this.add.text(32, 750, '', { font: "18px Play", fill: "#000" });
        this.textOptionA23= this.add.text(32, 780, '', { font: "18px Play", fill: "#000" });
        this.textOptionA24= this.add.text(32, 750, '', { font: "18px Play", fill: "#000" });

        //CLIC SOBRE LOS TEXTOS DE OPCIONES
        this.textOptionA20.inputEnabled = true;
        this.textOptionA21.inputEnabled = true;
        this.textOptionB131.inputEnabled = true;
        this.textOptionA22.inputEnabled = true;
        this.textOptionA23.inputEnabled = true;
        this.textOptionA24.inputEnabled = true;

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

        //Musica del juego
        this.musica = this.game.add.audio('musicActo5');
        this.musica.play();
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

        this.game.state.start('SegundaEscenaA5', true, false, this.medidorAgua.getValor(), this.medidorComida.getValor(),
            this.medidorVida.getValor(), this.medidorSocial.getValor(), this.musica);
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
    verificarVariables(){
        if(this.vidaAmber === 0 || this.medidorAgua.getValor() >= 100
            || this.medidorComida.getValor() >=100 || this.medidorVida.getValor() >=100 || this.medidorSocial.getValor() >=0){
            this.finDelJuego();
        }
    },
    verificarMedicina(){
        if(this.medicina > 0){
            this.escena = 1;
        }else{
            this.callEscena132();
        }
    },
    //METODO DESTINADO A MOSTRAR EL FINAL DEL JUEGO
    finDelJuego(){
        this.musica.stop();
        this.game.state.start('gameover');
    },
    callEscena21(){
        this.verificarVariables();
        this.clearText();
        this.textOptionA20.setText("");
        this.escena = 1;
    },
    callEscena22(){
        this.verificarVariables();
        this.clearText();
        this.textOptionA21.setText("");
        this.escena = 2;
    },
    callEscena23(){
        this.verificarVariables();
        this.clearText();
        this.textOptionA22.setText("");
        this.escena = 3;
    },
    callEscena24(){
        this.verificarVariables();
        this.clearText();
        this.textOptionA23.setText("");
        this.escena = 4;
    },
    update: function () {
        if (this.escena === 0) {
            this.textOptionA20.events.onInputUp.add(this.callEscena21, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA20.setText("a) Continuar");
                this.clearText();
                this.updateText();
            }
        }else if(this.escena === 1){
            this.escenaImg[0].visible = false;
            this.escenaImg[1].visible = true;
            this.dialogo = ["ARTHUR: Sophie deja de remar, amarra el remo a la balsa.", "SOPHIE: ¿Por qué? ¿Qué pasa?",
            "ARTHUR: El viento está cambiando, creo que \nse aproxima una tormenta."];
            this.textOptionA21.events.onInputUp.add(this.callEscena22, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA21.setText("a) Continuar");
                this.clearText();
                this.updateText();
            }
        }else if(this.escena === 2){
            this.escenaImg[1].visible = false;
            this.escenaImg[2].visible = true;
            this.dialogo = ["ARTHUR: Ámber despierta.", "ÁMBER: ¿Qué está pasando?",
                "ARTHUR: Una tormenta nos alcanzó, sujétense fuerte.",
            "SOPHIE: Papá, está entrando demasiada agua, \ndebemos sacarla o no aguantará el peso.",
            "ARTHUR: Yo me encargo, tu sujétate."];
            this.textOptionA22.events.onInputUp.add(this.callEscena23, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA22.setText("a) Continuar");
                this.clearText();
                this.updateText();
            }
        }else if(this.escena === 3){
            this.escenaImg[2].visible = false;
            this.escenaImg[3].visible = true;
            this.dialogo = ["ARTHUR: ¡Sophie! ¡Sophie! ¡Sophie!", "SOPHIE: Papá, ¡Ayuda!", "ARTHUR: Aguanta, iré por ti",
            "ÁMBER: Sophie toma mi mano"];
            this.textOptionA23.events.onInputUp.add(this.callEscena24, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA23.setText("a) Continuar");
                this.clearText();
                this.updateText();
            }
        }else if(this.escena === 4){
            this.escenaImg[3].visible = false;
            this.escenaImg[4].visible = true;
            this.dialogo = ["ARTHUR: Sophie sube, apóyate en mi.", "SOPHIE: Ya, Ámber no te sueltes, ¡Ámber!",
            "ARTHUR: Quédate aquí, yo la ayudaré.", "-Arthur se sumerge en busca de Ámber y la saca del agua-",
            "ARTHUR: Nada fuerte.", "ÁMBER: eso intento."];
            this.textOptionA24.events.onInputUp.add(this.startGame, this);
            if ((this.keyEnter.isDown || this.keySpace.isDown) && (this.keyEnter.downDuration(1) || this.keySpace.downDuration(1))) {
                this.textOptionA24.setText("a) Continuar");
                this.clearText();
                this.updateText();
            }
        }
    }
};