import GameObject from "./gameObject";
import Renderable from "./renderable";
import Scenario from "./scenario";
import Point from "./point";

export default class Player extends GameObject {

    constructor(engine, x, y) {
        super();
        this.scenario = new Scenario(this);
        this.engine = engine;
        this.position = new Point(x, y);
        this.name = "Chagum";
        this.opacity = 1;
        this.mana = 100;
        this.health = 100;
        this.gold = 0;

        this.speed = 0.3;
        this.skills = {
            "auto": {
                wait: 1000,
                state: 0,// 0 | 1
                speed_effect: 2,
                tick: function (engine, coin, dt) {
                    if (!this.state) return;

                    if (Math.abs(engine.player.position.x - coin.position.x) > 3)
                        if (engine.player.position.x < coin.position.x) {
                            engine.player.translate(100 * dt * engine.player.speed * this.speed_effect, 0); engine.player.facing = 1;
                        }
                        else {
                            engine.player.translate(-100 * dt * engine.player.speed * this.speed_effect, 0);
                            engine.player.facing = 3
                        }
                    else
                        if (engine.player.position.y + 8 < coin.position.y) {
                            engine.player.translate(0, 100 * dt * engine.player.speed * .8 * this.speed_effect); engine.player.facing = 2;
                        }
                        else {
                            engine.player.translate(0, -100 * dt * engine.player.speed * .8 * this.speed_effect); engine.player.facing = 0;
                        }
                }
            },
            "slide": {
                wait: 1000,
                last_time: 0,
                use: function (engine, player) {
                    if (Date.now() - this.last_time > this.wait && player.mana > 0) {
                        player.mana -= 10;
                        switch (engine.input.lastDirection) {
                            case "KeyA":
                                player.position.x -= 20;
                                break;
                            case "KeyD":
                                player.position.x += 20;
                                break;
                            case "KeyS":
                                player.position.y += 20;
                                break;
                            case "KeyW":
                                player.position.y -= 20;
                                break;
                        }
                        this.last_time = Date.now();
                    }
                }
            },
            "_proto": {
                type: "active", //Need trigger or not {active,passive}
                wait: 1000, //Used 1 time per $wait {Int, milisecond}
                effect: -1, //Effect {-1: instantly, Int: effect time in milisecond}
                decrease: {
                    mana: 10,
                    health: 1
                },
                increase: {
                    mana: 0,
                    health: 1
                },
                last_time: 0, //For calculation {Long|Int: timestamp}
                use: function () { }
            }
        };
        this.facing = 6;
        this.playerAssets = engine.importAll(require.context('./assets/characters/', false, /\.(png|jpe?g|svg)$/));

        this.renderables = [
            new Renderable(this.playerAssets[1], 0.5, 0, 2, 3, 4, 7),
            new Renderable(this.playerAssets[1], 0.5, 3, 2, 3, 4, 7),
            new Renderable(this.playerAssets[1], 0.5, 6, 2, 3, 4, 7),
            new Renderable(this.playerAssets[1], 0.5, 9, 2, 3, 4, 7),
            new Renderable(this.playerAssets[1], 0.5, 1, 0, 3, 4, 7),
            new Renderable(this.playerAssets[1], 0.5, 4, 0, 3, 4, 7),
            new Renderable(this.playerAssets[1], 0.5, 7, 0, 3, 4, 7),
            new Renderable(this.playerAssets[1], 0.5, 10, 0, 3, 4, 7),
        ];
    }

    translate(x, y) {
        let collision = this.engine.getCollision(this.position.x + x + this.renderables[0].subWidth / 4, this.position.y + y + this.renderables[0].subHeight / 2);

        if (collision != false) {
            if (collision.type == "coin") {
                this.gold += (collision.obj.type + 1) * 3;

                let nextPosX = Math.floor(Math.random() * 100 + 50);
                let nextPosY = Math.floor(Math.random() * 100 + 15);

                collision.obj.position.x = nextPosX;
                collision.obj.position.y = nextPosY;
                collision.obj.type = Math.floor(Math.random() * 4);

                collision.x = nextPosX + 3;
                collision.y = nextPosY + 3;
            }
            else if (collision.type == "trader") {
                if (this.mana != 100) {
                    this.mana = 100;
                    this.scenario.addScenario("I feel refreshed", 1600);
                }
                x = 0;
                y = 0;
            }
            else if (collision.type == "guards") {
                this.scenario.addScenario("I'm not ready yet!", 1600);
                x = 0;
                y = 0;
            }
            else {
                x = 0;
                y = 0;
            }
        }
        super.translate(x, y);
    }

    talk(ctx, text) {
        ctx.font = "6px roboto";
        ctx.fillStyle = "#00000080";
        let dialogX;
        if (this.position.x <= 100) dialogX = this.position.x + (this.renderables[0].subWidth * this.renderables[0].scale) + 5;
        else dialogX = this.position.x - ctx.measureText(text).width - 10;

        ctx.fillRect(dialogX, this.position.y + 2, ctx.measureText(text).width + 8, 12);

        ctx.restore();
        ctx.save()

        ctx.fillStyle = "#fff";
        ctx.fillText(text, dialogX + 4, this.position.y + 10);
        ctx.restore();
        ctx.save()
    }

    auto() {

    }

    draw(ctx) {
        this.scenario.tick(ctx);

        ctx.save()
        ctx.translate(this.position.x, this.position.y);

        this.renderables[this.facing].draw(ctx, this.opacity);

        ctx.restore();

        ctx.fillStyle = "#ea433540";
        ctx.fillRect(this.position.x, this.position.y + this.renderables[0].subHeight * this.renderables[0].scale + 2, this.renderables[0].subWidth * this.renderables[0].scale, 1);

        ctx.fillStyle = "#ea4335AA";
        ctx.fillRect(this.position.x, this.position.y + this.renderables[0].subHeight * this.renderables[0].scale + 2, this.renderables[0].subWidth * this.renderables[0].scale * this.health / 100, 1);

        ctx.fillStyle = "#4285f440";
        ctx.fillRect(this.position.x, this.position.y + this.renderables[0].subHeight * this.renderables[0].scale + 4, this.renderables[0].subWidth * this.renderables[0].scale, 1);

        ctx.fillStyle = "#4285f4AA";
        ctx.fillRect(this.position.x, this.position.y + this.renderables[0].subHeight * this.renderables[0].scale + 4, this.renderables[0].subWidth * this.renderables[0].scale * this.mana / 100, 1);

        ctx.restore();
        ctx.save()

        ctx.font = "bolder 6px Roboto";
        ctx.fillStyle = "#ffffff90";

        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowColor = "#000"

        ctx.fillText(this.name, this.position.x + (this.renderables[0].subWidth * this.renderables[0].scale / 2) - ctx.measureText(this.name).width / 2, this.position.y - 5);
        ctx.restore();
        ctx.save()
    }

    transform(x) {
        if (this.renderables[0].getImage() != this.playerAssets[x])
            this.renderables.forEach(renderable => { renderable.changeImage(this.playerAssets[x]) });
    }
}
