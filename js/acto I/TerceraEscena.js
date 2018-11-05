GameState.TerceraEscena = function (game) { };
GameState.TerceraEscena.prototype = {
    init: function (decisionA, decisionB) {
        this.decisionA = decisionA;
        this.decisionB = decisionB;
    },
    create: function () {
        this.buttonContinue = [this.add.button(0, 0, 'screen-howtoplay', this.updateImg, this),
        this.add.button(0, 0, 'ACTO-2', this.startGame, this)
        ];
        this.buttonContinue[1].visible = false;
    },
    updateImg: function () {
        this.buttonContinue[0].visible = false;
        this.buttonContinue[1].visible = true;
    },
    startGame: function () {
        //CAMBIO DE ESTADO A JUEGO
        this.game.state.start('PrimeraEscenaA2', false, false, this.decisionA, this.decisionB);
    }
};