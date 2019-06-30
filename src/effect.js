import Point from "./point";
import Renderable from "./renderable";
import flameImg from './assets/effects/flame.png';

export default class Effect {
    constructor() {
        this.effects = [];
        this.effect = {
            flame : new Renderable(flameImg, .25, 0, 70, 12, 6, 30)
        };

        this.effects.push({ renderable: this.effect.flame, opacity: 1, position: new Point(113, 102) });
        this.effects.push({ renderable: this.effect.flame, opacity: 1, position: new Point(177, 102) });
        this.effects.push({ renderable: this.effect.flame, opacity: 1, position: new Point(113, 142) });
        this.effects.push({ renderable: this.effect.flame, opacity: 1, position: new Point(177, 142) });
    }

    update(engine) {
        this.draw(engine.ctx);
    }

    draw(ctx) {
        this.effects.forEach(effect => {
            ctx.save()
            ctx.translate(effect.position.x, effect.position.y);

            effect.renderable.draw(ctx, effect.opacity);

            ctx.restore();
            ctx.save()
        });
    }
}
