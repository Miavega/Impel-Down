class StatusBar extends Phaser.Group {

    constructor(game, x, y) {
        super(game);
        this.bar = this.create(x, y, "barraIndividual");
        this.valor = 0;
        this.bar.height = 0;
    }
    setValor(v) {
        if (this.valor + v > 100) {
            this.valor = 100;
        } else if (this.valor + v < 0) {
            this.valor = 0;

        }else{
            this.valor = (this.valor + v);
        }
        this.bar.height = 78 * (this.valor/100);
    }
    getValor() {
        return (this.valor);
    }
}
