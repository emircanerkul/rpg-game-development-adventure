import Engine from './engine.js';
import Player from './player.js';
import Map from './map.js';
import mapImage from './assets/dungeon_tiles.png';
import testMap from './assets/map.json';
import Coin from './coin.js';
import Box, { CoinC } from './phybox.js';

let engine = new Engine();
let coin = new Coin(50,50);
let coinCollider = new Box(coin, 53,53,8,8);
let map = new Map(testMap, mapImage);

engine.addObject(map);
engine.addObject(coin);
engine.addColliders(coinCollider);
engine.addColliders(map.getColliders());

engine.phyDebug = true;

let player = new Player(engine, 25, 65);
engine.addObject(player);


engine.update = (dt) => {

    if (engine.input.isKeyDown("KeyA")) {
        let oPoint = player.position[0];
        player.translate(-50 * dt, 0);

        if (oPoint == player.position[0]) player.facing = 7;
        else player.facing = 3;
    }

    else if (engine.input.isKeyDown("KeyD")) {
        let oPoint = player.position[0];
        player.translate(50 * dt, 0);

        if (oPoint == player.position[0]) player.facing = 5;
        else player.facing = 1;
    }

    else if (engine.input.isKeyDown("KeyW")) {
        let oPoint = player.position[1];
        player.translate(0, -50 * dt * .8);

        if (oPoint == player.position[1]) player.facing = 4;
        else player.facing = 0;
    }

    else if (engine.input.isKeyDown("KeyS")) {
        let oPoint = player.position[1];
        player.translate(0, 50 * dt * .8);

        if (oPoint == player.position[1]) player.facing = 6;
        else player.facing = 2;
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
