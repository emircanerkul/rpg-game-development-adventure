import GameObject from "./gameObject";
import Renderable from "./renderable";
import coinImg1 from './assets/coins/1.png';
import coinImg2 from './assets/coins/2.png';
import coinImg3 from './assets/coins/3.png';
import coinImg4 from './assets/coins/4.png';

export default class Coin extends GameObject {
    constructor(x, y) {
        super();
        this.type = 0;
        this.position = [x, y];
        this.renderables = [
            new Renderable(coinImg1, .8, 0, 0, 1, 1, 0),
            new Renderable(coinImg2, .8, 0, 0, 1, 1, 0),
            new Renderable(coinImg3, .8, 0, 0, 1, 1, 0),
            new Renderable(coinImg4, .8, 0, 0, 1, 1, 0)
        ];
    }

    draw(ctx) {
        ctx.save()
        ctx.translate(this.position[0], this.position[1]);
        this.renderables[this.type].draw(ctx);
        ctx.restore();
    }
}
