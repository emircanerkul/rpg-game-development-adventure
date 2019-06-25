export default class Box {
    constructor(type, x, y, w, h, obj = null) {
        this.type = type;
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
        switch (this.type) {
            case "collider":
                ctx.strokeStyle = '#FF000080';
                break;
            case "guards":
                ctx.strokeStyle = '#00FF00DD';
                break;
            case "trader":
                ctx.strokeStyle = '#00FFFFDD';
                break;
            case "coin":
                ctx.strokeStyle = '#FFFF00DD';
                break;
            default:
                break;
        }
        ctx.lineWidth = .4;
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
}
