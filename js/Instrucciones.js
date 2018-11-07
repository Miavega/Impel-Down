GameState.Instrucciones = function (game) { };
GameState.Instrucciones.prototype = {
	create: function () {
		this.contador = 0;
		this.buttonContinue = [this.add.button(0, 0, 'screen-howtoplay', this.updateImg, this),
		this.add.button(0, 0, 'screen-howtoplay-2', this.updateImg, this),
		this.add.button(0, 0, 'ACTO-1', this.startGame, this)
		];
		this.buttonContinue[1].visible = false;
		this.buttonContinue[2].visible = false;
	},
	updateImg: function () {
		if (this.contador == 0) {
			this.buttonContinue[0].visible = false;
			this.buttonContinue[1].visible = true;
		}
		else if (this.contador == 1) {
			this.buttonContinue[1].visible = false;
			this.buttonContinue[2].visible = true;
		}
		this.contador++;
	},
	startGame: function () {
		//CAMBIO DE ESTADO A JUEGO
		this.game.state.start('PrimeraEscena');
	}
};