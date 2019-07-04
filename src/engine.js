import GameObject from "./gameObject";
import Player from './player.js';
import Input from "./input";
import Gui from "./gui";
import Effect from "./effect";

export default class Engine {
    constructor() {
        document.body.style.margin = "0px";
        document.body.style.overflow = "hidden";
        this.canvas = document.getElementById("player");

        this.lastTime = new Date().getTime();
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        this.gui = new Gui(this);
        this.effect = new Effect();
        this.objs = [];
        this.colliders = [];
        this.player = new Player(this, 25, 65);
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
        Array.isArray(collider) ? collider.forEach(c => this.colliders.push(c)) : this.colliders.push(collider);
    }

    getCollision(x, y) {
        let val = false;
        this.colliders.forEach(collider => {
            if (collider.isInside(x, y)) val = collider;
        });
        return val;
    }

    loop() {
        let time = new Date().getTime();
        let dt = (time - this.lastTime) / 1000;

        if (this.update) this.update(dt);

        this.objs.forEach(obj => obj.update(this, dt));
        this.player.update(this, dt);
        this.gui.draw(this.ctx);
        this.effect.update(this);

        if (this.phyDebug) this.colliders.forEach(collider => collider.draw(this.ctx));

        this.lastTime = time;
        window.requestAnimationFrame(this.loop.bind(this));
    }


    importAll(r) {
        return r.keys().map(r);
    }
}
