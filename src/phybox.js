export default class Box {
    constructor(obj, x, y, w, h) {
        this.obj = obj;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    isInside(x, y) {
        let isInX = x > this.x && x < this.x + this.w;
        let isInY = y > this.y && y < this.y + this.h;
        return isInX && isInY;
    }

    draw(ctx) {

        ctx.strokeStyle = this.obj.constructor.name == "Map" ? '#FF000080' : '#00FF00DD';
        ctx.lineWidth = .4;
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
}
