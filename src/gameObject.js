import Renderable from "./renderable";

export default class GameObject {
    constructor() {
        this.position = [0, 0];
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
    }

    translate(x, y) {
        this.position[0] += x;
        this.position[1] += y;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.position[0], this.position[1])

        this.children.forEach(child => {
            if (child instanceof GameObject) {
                child.draw(ctx);
            }

            if (child instanceof Renderable) {
                child.draw(ctx);
            }
        })
        ctx.restore();
    }
}
