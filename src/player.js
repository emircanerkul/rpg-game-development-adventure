import GameObject from "./gameObject";
import Renderable from "./renderable";
import playerImg from './assets/characters/healer_m.png';

export default class Player extends GameObject {
    constructor(engine, x, y) {
        super();
        this.engine = engine;
        this.position = [x, y];
        this.opacity = 1;
        this.stamina = 100;
        this.mana = 100;
        this.health = 100;
        this.gold = 0;

        this.speed = 0.3;
        this.skills = {
            "slide": {
                type: "active",
                wait: 1000,
                effect: -1,
                decrease: {
                    mana: 5,
                    health: 0,
                    stamina: 5
                },
                increase: {
                    mana: 0,
                    health: 1,
                    stamina: 0
                },
                last_time: 0,
                use: function (engine, player) {
                    if (Date.now() - this.last_time > this.wait) {
                        player.mana -= this.decrease.mana;
                        switch (engine.input.lastDirection) {
                            case "KeyA":
                                player.position[0] -= 20;
                                break;
                            case "KeyD":
                                player.position[0] += 20;
                                break;
                            case "KeyS":
                                player.position[1] += 20;
                                break;
                            case "KeyW":
                                player.position[1] -= 20;
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
                    health: 1,
                    stamina: 5
                },
                increase: {
                    mana: 0,
                    health: 1,
                    stamina: 0
                },
                last_time: 0, //For calculation {Long|Int: timestamp}
                use: function () { } //Skill Caller
            }
        };

        this.facing = 6;
        this.renderables = [
            new Renderable(playerImg, 0.5, 0, 2, 3, 4, 7),
            new Renderable(playerImg, 0.5, 3, 2, 3, 4, 7),
            new Renderable(playerImg, 0.5, 6, 2, 3, 4, 7),
            new Renderable(playerImg, 0.5, 9, 2, 3, 4, 7),
            new Renderable(playerImg, 0.5, 1, 0, 3, 4, 7),
            new Renderable(playerImg, 0.5, 4, 0, 3, 4, 7),
            new Renderable(playerImg, 0.5, 7, 0, 3, 4, 7),
            new Renderable(playerImg, 0.5, 10, 0, 3, 4, 7),
        ];
    }

    translate(x, y) {
        let collision = this.engine.getCollision(this.position[0] + x + this.renderables[0].subWidth / 4, this.position[1] + y + this.renderables[0].subHeight / 2);

        if (collision !== false) {

            if (collision.type == "coin") {
                let nextPosX = Math.random() * 100 + 50;
                let nextPosY = Math.random() * 100 + 15;

                collision.obj.position[0] = nextPosX;
                collision.obj.position[1] = nextPosY;

                collision.x = nextPosX + 3;
                collision.y = nextPosY + 3;
                this.gold++;
            }
            else {
                x = 0;
                y = 0;
            }
        }
        super.translate(x, y);
    }

    draw(ctx) {
        ctx.save()
        ctx.translate(this.position[0], this.position[1]);

        this.renderables[this.facing].draw(ctx, this.opacity);
        ctx.restore();
    }
}
