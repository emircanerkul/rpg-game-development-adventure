import Engine from './engine.js';
import Map from './map.js';
import mapImage from './assets/dungeon_tiles.png';
import testMap from './assets/map.json';
import Coin from './coin.js';
import Box from './phybox.js';

let engine = new Engine();
let coin = new Coin(50, 50);
let coinCollider = new Box("coin", 53, 53, 8, 8, coin);
let map = new Map(testMap, mapImage);

engine.addObject(map);
engine.addObject(coin);
engine.addColliders(coinCollider);
engine.addColliders(map.getColliders());

engine.phyDebug = true;
engine.player.skills.auto.state = 1;
engine.update = (dt) => {

    engine.player.skills.auto.tick(engine, coin,dt);
    if (engine.input.isKeyDown("KeyA")) {
        let oPoint = engine.player.position.x;
        engine.player.translate(-100 * dt * engine.player.speed, 0);

        if (oPoint == engine.player.position.x) engine.player.facing = 7;
        else engine.player.facing = 3;
    }

    else if (engine.input.isKeyDown("KeyD")) {
        let oPoint = engine.player.position.x;
        engine.player.translate(100 * dt * engine.player.speed, 0);

        if (oPoint == engine.player.position.x) engine.player.facing = 5;
        else engine.player.facing = 1;
    }

    else if (engine.input.isKeyDown("KeyW")) {
        let oPoint = engine.player.position.y;
        engine.player.translate(0, -100 * dt * engine.player.speed * .8);

        if (oPoint == engine.player.position.y) engine.player.facing = 4;
        else engine.player.facing = 0;
    }

    else if (engine.input.isKeyDown("KeyS")) {
        let oPoint = engine.player.position.y;
        engine.player.translate(0, 100 * dt * engine.player.speed * .8);

        if (oPoint == engine.player.position.y) engine.player.facing = 6;
        else engine.player.facing = 2;
    }

    else switch (engine.input.lastDirection) {
        case "KeyA":
            engine.player.facing = 7;
            break;
        case "KeyS":
            engine.player.facing = 6;
            break;
        case "KeyD":
            engine.player.facing = 5;
            break;
        case "KeyW":
            engine.player.facing = 4;
            break;
    }

    if (engine.input.isKeyDown("Digit1")) engine.player.transform(1);
    else if (engine.input.isKeyDown("Digit2")) engine.player.transform(3);
    else if (engine.input.isKeyDown("Digit3")) engine.player.transform(5);
    else if (engine.input.isKeyDown("Digit4")) engine.player.transform(7);
    else if (engine.input.isKeyDown("Digit5")) engine.player.transform(9);
    else if (engine.input.isKeyDown("Digit6")) engine.player.transform(11);

    if (engine.input.isKeyDown("Space")) {
        engine.player.skills.slide.use(engine, engine.player);
    }

    if (engine.input.isKeyDown("ShiftLeft")) {
        engine.player.speed = .5;
    }
    else {
        engine.player.speed = .3;
    }
}
