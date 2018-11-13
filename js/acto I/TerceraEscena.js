GameState.TerceraEscena = function (game) { };
//OSCURESE LA PANTALLA
//MUEVE LA PANTALLA
GameState.TerceraEscena.prototype = {
    init: function (decisionA, decisionB,musica) {
        this.decisionA = decisionA;
        this.decisionB = decisionB;
        this.musica = musica;
    },
    create: function () {
        //CARGAMOS EL FONDO Y EL SPRITE DEL AVIÓN
        this.screen = [this.add.sprite(0, 0, 'screen-sky'), this.add.sprite(0, 0, 'island')];
        this.airplane = this.add.sprite(160, 300, 'airplane');
        this.screen[1].visible = false;
        //this.airplane.scale.setTo(-1,1);
        this.humo = this.add.sprite(160, 325, 'humo');
        this.humo.visible = false;

        this.airplane.animations.add('volar', [0, 1, 2, 3, 4]);
        this.airplane.animations.add('rayo', [0, 1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15]);
        this.humo.animations.add('smoke');

        //CONTADOR DE TIEMPO
        this.timer = 0;
        this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this)
    },
    updateCounter: function () {
        this.timer++;
    },
    imgEstocastico: function () {
        this.estocasticos[0].visible = false;
        this.estocasticos[1].visible = true;
    },
    continue: function () {
        this.add.button(0, 0, 'ACTO-2', this.startGame, this);
    },
    startGame: function () {
        //CAMBIO DE ESTADO A JUEGO
        this.game.state.start('PrimeraEscenaA2', true, false, this.decisionA, this.decisionB);
    },
    shake: function () {
        this.game.camera.shake(0.05, 500);
    },
    fade: function () {
        this.game.camera.fade(0x000000, 4000);
    },
    resetFade: function () {
        this.game.camera.resetFX();
    },
    update: function () {
        if (this.timer < 3) {
            this.airplane.animations.play('volar', 10, true);
        }
        else if (this.timer == 3) {
            this.airplane.animations.play('rayo', 10, true);
        }
        else if (this.timer == 5) {
            this.airplane.animations.play('volar', 10, true);
            this.humo.visible = true;
            this.humo.animations.play('smoke', 10, true);
        }
        else if (this.timer == 6) {
            this.airplane.angle += 0.5;
            this.humo.angle += 0.5;
        }
        else if (this.timer > 6 && this.timer < 10) {
            this.airplane.x += 2;
            this.airplane.y += 2;
            this.humo.x += 2;
            this.humo.y += 2;
        }
        else if (this.timer == 10) {
            this.airplane.x = 0;
            this.airplane.y = 0;
            this.humo.x = 0;
            this.humo.y = 0;
            this.screen[0].visible = false;
            this.screen[1].visible = true;
        }
        else if (this.timer > 10 && this.timer < 17) {
            this.airplane.x += 2;
            this.airplane.y += 2;
            this.humo.x += 2;
            this.humo.y += 2;
        }
        else if (this.timer === 17) {
            this.shake();
            this.fade();
        }
        else if (this.timer === 21) {
            this.musica.stop();
            this.screen[1].visible = false;
            this.resetFade();
            this.estocasticos = [this.add.button(0, 0, 'estocastico-2', this.imgEstocastico, this),
            this.add.button(0, 0, 'estocastico-3', this.continue, this)];
            this.estocasticos[1].visible = false;
        }
    },

};