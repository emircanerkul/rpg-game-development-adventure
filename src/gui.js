export default class Gui {
    constructor(engine) {
        this.engine = engine;
    }

    draw(ctx) {
        ctx.save();
        ctx.font = "bolder 10px Roboto";
        ctx.fillStyle = "#ffffff90";

        let text = "Gold: " + this.nFormatter(this.engine.player.gold);
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowColor = "#000"
        ctx.fillText(text, 12, this.engine.canvas.height - 6, this.engine.canvas.width);
        ctx.restore();

        ctx.save();
        ctx.font = "bolder 7px Thoma";
        ctx.fillStyle = "#ffffff90";

        text = "Developed by Emircan ERKUL";
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor = "#000"

        ctx.fillText(text, 90, this.engine.canvas.height - 7, this.engine.canvas.width);
        ctx.restore();
    }

    nFormatter(num, digits = 3) {
        var si = [
            { value: 1, symbol: "" },
            { value: 1E3, symbol: "k" },
            { value: 1E6, symbol: "M" },
            { value: 1E9, symbol: "G" },
            { value: 1E12, symbol: "T" },
            { value: 1E15, symbol: "P" },
            { value: 1E18, symbol: "E" }
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
            if (Math.abs(num) >= si[i].value) {
                break;
            }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }
}
