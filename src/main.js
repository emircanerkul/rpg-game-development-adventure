import Engine from './engine.js';
import Map from './map.js';
import mapImage from './assets/dungeon_tiles.png';
import testMap from './assets/map.json';
import Coin from './coin.js';
import Box from './phybox.js';

document.engine = new Engine();
let coin = new Coin(50, 50);
let coinCollider = new Box("coin", 53, 53, 8, 8, coin);
let map = new Map(testMap, mapImage);

document.engine.addObject(map);
document.engine.addObject(coin);
document.engine.addColliders(coinCollider);
document.engine.addColliders(map.getColliders());

document.engine.player.skills.auto.state = 1;
document.engine.update = (dt) => {

    if (document.engine.input.isKeyDown("KeyA")) {
        let oPoint = document.engine.player.position.x;
        document.engine.player.translate(-100 * dt * document.engine.player.speed, 0);

        if (oPoint == document.engine.player.position.x) document.engine.player.facing = 7;
        else document.engine.player.facing = 3;
    }

    else if (document.engine.input.isKeyDown("KeyD")) {
        let oPoint = document.engine.player.position.x;
        document.engine.player.translate(100 * dt * document.engine.player.speed, 0);

        if (oPoint == document.engine.player.position.x) document.engine.player.facing = 5;
        else document.engine.player.facing = 1;
    }

    else if (document.engine.input.isKeyDown("KeyW")) {
        let oPoint = document.engine.player.position.y;
        document.engine.player.translate(0, -100 * dt * document.engine.player.speed * .8);

        if (oPoint == document.engine.player.position.y) document.engine.player.facing = 4;
        else document.engine.player.facing = 0;
    }

    else if (document.engine.input.isKeyDown("KeyS")) {
        let oPoint = document.engine.player.position.y;
        document.engine.player.translate(0, 100 * dt * document.engine.player.speed * .8);

        if (oPoint == document.engine.player.position.y) document.engine.player.facing = 6;
        else document.engine.player.facing = 2;
    }

    else switch (document.engine.input.lastDirection) {
        case "KeyA":
            document.engine.player.facing = 7;
            break;
        case "KeyS":
            document.engine.player.facing = 6;
            break;
        case "KeyD":
            document.engine.player.facing = 5;
            break;
        case "KeyW":
            document.engine.player.facing = 4;
            break;
    }

    if (document.engine.input.isKeyDown("Digit1")) document.engine.player.transform(1);
    else if (document.engine.input.isKeyDown("Digit2")) document.engine.player.transform(3);
    else if (document.engine.input.isKeyDown("Digit3")) document.engine.player.transform(5);
    else if (document.engine.input.isKeyDown("Digit4")) document.engine.player.transform(7);
    else if (document.engine.input.isKeyDown("Digit5")) document.engine.player.transform(9);
    else if (document.engine.input.isKeyDown("Digit6")) document.engine.player.transform(11);

    if (document.engine.input.isKeyDown("Space")) {
        document.engine.player.skills.slide.use(document.engine);
    }

    document.engine.player.skills.auto.tick(document.engine, coin,dt);
}
