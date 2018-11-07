GameState.TerceraEscena = function (game) { };
GameState.TerceraEscena.prototype = {
    init: function (decisionA, decisionB) {
        this.decisionA = decisionA;
        this.decisionB = decisionB;
    },
    create: function () {
        //CARGAMOS EL FONDO Y EL SPRITE DEL AVIÓN
        this.screen = this.add.sprite(0, 0, 'screen-sky');
        this.airplane = this.add.sprite(160, 300, 'airplane');
        //this.airplane.scale.setTo(-1,1);
        this.humo = this.add.sprite(160, 325, 'humo');
        this.humo.visible = false;

        this.airplane.animations.add('volar', [0, 1, 2, 3, 4]);
        this.airplane.animations.add('rayo', [0, 1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15]);
        this.humo.animations.add('smoke');

        //CONTADOR DE TIEMPO
        this.timer = 0;
        this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this)

        /*this.buttonContinue = [this.add.button(0, 0, 'screen-howtoplay', this.updateImg, this),
        this.add.button(0, 0, 'ACTO-2', this.startGame, this)
        ];
        this.buttonContinue[1].visible = false;*/
    },
    updateCounter: function () {
        this.timer++;
    },
    updateImg: function () {
        this.buttonContinue[0].visible = false;
        this.buttonContinue[1].visible = true;
    },
    startGame: function () {
        //CAMBIO DE ESTADO A JUEGO
        this.game.state.start('PrimeraEscenaA2', false, false, this.decisionA, this.decisionB);
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
            this.airplane.angle += 1;
            this.humo.angle += 0.5;
        }
        else if (this.timer > 6 && this.timer <= 10) {
            this.airplane.x += 2;
            this.airplane.y += 2;
            this.humo.x += 2;
            this.humo.y += 2;
        }
        else if (this.timer > 10) {
            this.airplane.x = 0;
            this.airplane.y = 0;
            this.humo.x = 0;
            this.humo.y = 0;
            this.screen = this.add.sprite(0, 0, 'island');
        }

    },
};