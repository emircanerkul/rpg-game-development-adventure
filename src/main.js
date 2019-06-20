import Engine from './engine.js';
import Player from './player.js';

let engine = new Engine();
let player = new Player(150, 150);
engine.addObject(player);


engine.update = (dt) => {

    if (engine.input.isKeyDown("KeyA")) {
        player.translate(-100 * dt, 0);
        player.facing = 3;
    }

    else if (engine.input.isKeyDown("KeyD")) {
        player.translate(100 * dt, 0);
        player.facing = 1;
    }

    else if (engine.input.isKeyDown("KeyW")) {
        player.translate(0, -100 * dt);
        player.facing = 0;
    }

    else if (engine.input.isKeyDown("KeyS")) {
        player.translate(0, 100 * dt);
        player.facing = 2;
    }
    else switch (engine.input.lastDirection) {
        case "KeyA":
            player.facing = 7;
            break;
        case "KeyS":
            player.facing = 6;
            break;
        case "KeyD":
            player.facing = 5;
            break;
        case "KeyW":
            player.facing = 4;
            break;
    }
}
