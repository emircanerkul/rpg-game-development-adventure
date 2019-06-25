export default class Gui {
    constructor(engine) {
        this.engine = engine;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(0, this.engine.canvas.height - 55);
        ctx.font = "bolder 8px Roboto";
        ctx.fillStyle = "#ffffff90";

        let text = "Hp: " + this.engine.player.health + " | Mp: " + this.engine.player.mana + " | Stamina: " + this.engine.player.stamina + " | Gold: " + this.engine.player.gold;
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowColor = "#000"
        ctx.fillText(text, (this.engine.canvas.width - ctx.measureText(text).width) / 2, 50, this.engine.canvas.width);
        ctx.restore();
    }
}
