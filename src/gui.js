export default class Gui {
    constructor(engine) {
        this.engine = engine;
    }

    draw(ctx) {
        ctx.save();
        ctx.font = "bolder 10px Roboto";
        ctx.fillStyle = "#ffffff90";

        let text = "Gold: " + this.engine.player.gold;
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowColor = "#000"
        ctx.fillText(text, 12, this.engine.canvas.height-6, this.engine.canvas.width);
        ctx.restore();
    }
}
