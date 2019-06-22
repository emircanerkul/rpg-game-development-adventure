export default class Box {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.r = Math.random() * 256;
        this.g = Math.random() * 256;
        this.b = Math.random() * 256;
    }

    isInside(x, y) {

        let isInX = x > this.x && x < this.x + this.w;
        let isInY = y > this.y && y < this.y + this.h;
        return isInX&&isInY;

    }

    draw(ctx) {
        ctx.strokeStyle = '#FF000080';
        ctx.lineWidth = .4;
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
}
