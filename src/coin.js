import GameObject from "./gameObject";
import Renderable from "./renderable";
import coinImg from './assets/coins/1.png';

export default class Coin extends GameObject {
    constructor(x, y) {
        super();
        this.position = [x, y];
        this.renderables = new Renderable(coinImg, .8, 0, 0, 1, 1, 0);
    }

    draw(ctx) {
        ctx.save()
        ctx.translate(this.position[0], this.position[1]);
        this.renderables.draw(ctx);
        ctx.restore();
    }
}
