import Renderable from "./renderable";
import Box from "./phybox";
import Point from "./point";

export default class GameObject {
    constructor() {
        this.position = new Point(0, 0);
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
    }

    translate(x, y) {
        this.position.x += x;
        this.position.y += y;
    }

    update(engine, dt) {
        this.children.forEach(child => child.update(engine, dt));
        this.children.forEach(child => child.draw(engine.ctx));
        this.draw(engine.ctx);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y)

        this.children.forEach(child => {
            if (child instanceof GameObject) child.draw(ctx);
            else if (child instanceof Renderable) child.draw(ctx);
            else if (child instanceof Box) child.draw(ctx);
            else if (child instanceof Coin) child.draw(ctx);
            else console.log("Isn't renderable object");
        });

        ctx.restore();
    }
}
