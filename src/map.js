import GameObject from "./gameObject";
import Renderable from "./renderable";
import Box from "./phybox";


export default class Map extends GameObject {
    constructor(mapJson, mapImg) {
        super();

        this.renderable = new Renderable(mapImg, 1, 0, 2208, 46, 48, 0);

        this.data = mapJson;
        this.colliders = [];

        this.data.layers.forEach(layer => {
            if (layer.type == "objectgroup") {
                layer.objects.forEach(obj => {
                    this.colliders.push(new Box(layer.name, obj.x, obj.y, obj.width, obj.height));
                });
            }
        });
    }

    getColliders() { return this.colliders; }

    draw(ctx) {
        this.data.layers.forEach(layer => {
            if (layer.type == "tilelayer") {
                let x = 0;
                let y = 0;
                layer.data.forEach((value, index) => {
                    ctx.save();
                    ctx.translate(
                        this.position.x + index % layer.width * this.renderable.subWidth * this.renderable.scale,
                        this.position.y + Math.floor(index / layer.width) * this.renderable.subHeight * this.renderable.scale);

                    this.renderable.frame = value - 1;
                    this.renderable.draw(ctx);
                    ctx.restore();
                });
            }
            super.draw(ctx);
        });
    }
}
