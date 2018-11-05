class StatusBar extends Phaser.Group {

    constructor(game, x, y) {
        super(game);
        this.bar = this.create(x, y, "barraIndividual");
        this.valor = 0;
        this.bar.height = 0;
    }
    setValor(v) {
        if (v >= 0) {
            this.valor = (v - this.valor);
        } else {
            this.valor = (this.valor + v);
        }
        this.bar.height = 135 * (this.valor/100);
    }
    getValor() {
        return (this.valor);
    }
}
