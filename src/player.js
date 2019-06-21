import GameObject from "./gameObject";
import Renderable from "./renderable";
import playerImg from './assets/characters/healer_m.png';

export default class Player extends GameObject {
    constructor(x, y) {
        super();
        this.position = [x, y];
        this.facing = 6;
        this.renderables = [
            new Renderable(playerImg, 0.5, 0, 2, 3, 4, 7),
            new Renderable(playerImg, 0.5, 3, 2, 3, 4, 7),
            new Renderable(playerImg, 0.5, 6, 2, 3, 4, 7),
            new Renderable(playerImg, 0.5, 9, 2, 3, 4, 7),
            new Renderable(playerImg, 0.5, 1, 0, 3, 4, 7),
            new Renderable(playerImg, 0.5, 4, 0, 3, 4, 7),
            new Renderable(playerImg, 0.5, 7, 0, 3, 4, 7),
            new Renderable(playerImg, 0.5, 10, 0, 3, 4, 7),
        ]
    }

    draw(ctx) {
        ctx.save()
        ctx.translate(this.position[0], this.position[1]);

        this.renderables[this.facing].draw(ctx);
        ctx.restore();
    }
}
