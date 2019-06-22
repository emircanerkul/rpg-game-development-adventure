import GameObject from "./gameObject";
import Input from "./input";

export default class Engine {
    constructor() {
        document.body.style.margin = "0px";
        document.body.style.overflow = "hidden";
        this.canvas = document.createElement("canvas");
        this.canvas.width = 200;
        this.canvas.height = 200;
        document.body.appendChild(this.canvas);

        this.lastTime = new Date().getTime();
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        this.objs = [];
        this.colliders = [];

        this.phyDebug = false;

        this.input = new Input();
        window.requestAnimationFrame(this.loop.bind(this));
    }

    addObject(obj) {
        if (obj instanceof GameObject) {
            this.objs.push(obj);
        }
        else console.error("Invalid Object Type");
    }

    addColliders(collider) {
        this.colliders = collider;
    }

    getCollision(x, y) {
        let val = false;
        this.colliders.forEach(collider => {
            let result = collider.isInside(x, y);

            if (result) {
                val = collider;
            }
        });
        return val;
    }

    loop() {
        let time = new Date().getTime();
        let dt = (time - this.lastTime) / 1000;

        if (this.update) this.update(dt);

        this.objs.forEach(obj => {
            obj.update(this, dt);
        });

        this.ctx.fillStyle = "#303030";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.objs.forEach(obj => {
            obj.draw(this.ctx);
        })


        if (this.phyDebug)
            this.colliders.forEach(collider => {
                collider.draw(this.ctx);
            });
        this.lastTime = time;
        window.requestAnimationFrame(this.loop.bind(this));
    }
}
