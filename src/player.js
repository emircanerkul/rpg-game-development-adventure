import GameObject from "./gameObject";
import Renderable from "./renderable";
import playerImg from './assets/characters/healer_m.png';

export default class Player extends GameObject {
    constructor(engine, x, y) {
        super();
        this.engine = engine;
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

    translate(x, y) {
        if (this.engine.getCollision(this.position[0] + x+ this.renderables[0].subWidth / 4, this.position[1] +y+ this.renderables[0].subHeight /2) !== false) {
            x = 0;
            y = 0;
        }
        super.translate(x, y);
    }

    draw(ctx) {
        ctx.save()
        ctx.translate(this.position[0], this.position[1]);

        this.renderables[this.facing].draw(ctx);
        ctx.restore();
    }
}
