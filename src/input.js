export default class Input {
    constructor() {
        this.downKeys = [];

        document.onkeydown = (evt) => {
            this.downKeys[evt.code] = true;

            if (evt.code == "KeyA" || evt.code == "KeyS" || evt.code == "KeyD" || evt.code == "KeyW") this.lastDirection = evt.code;
        };

        document.onkeyup = (evt) => {
            this.downKeys[evt.code] = null;
        };
    }

    isKeyDown(keyCode) {
        return this.downKeys[keyCode];
    }
}
