import GameObject from "./gameObject";
import Renderable from "./renderable";


export default class Map extends GameObject {
    constructor(mapJson, mapImg) {
        super();

        this.renderable = new Renderable(mapImg, 1, 0, 2208, 46, 48, 0);
        console.log(this.renderable.subWidth);
        console.log(this.renderable.subHeight);

        this.data = mapJson;
    }

    draw(ctx) {
        super.draw(ctx);

        this.data.layers.forEach(layer => {
            let x = 0;
            let y = 0;
            layer.data.forEach((value, index) => {

                x = index % layer.width;
                y = Math.floor(index / layer.width)
                ctx.save();
                ctx.translate(
                    this.position[0] + x * this.renderable.subWidth * this.renderable.scale,
                    this.position[1] + y * this.renderable.subHeight * this.renderable.scale);

                this.renderable.frame = value-1;
                this.renderable.draw(ctx);
                ctx.restore();
            });
        });
    }
}
