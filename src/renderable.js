import noimage from "./assets/noimage.png"

export default class Renderable {
    constructor(image = noimage, scale = 1, startFrame = 0, frameCount = 0, framesx = 1, framesy = 1, speed = 1) {
        this.img = new Image();
        this.img.src = image;
        this.scale = scale;

        this.frame = startFrame;

        this.startFrame = startFrame;
        this.frameCount = frameCount;

        this.framesx = framesx;
        this.framesy = framesy;

        this.subWidth = this.img.width / framesx;
        this.subHeight = this.img.height / framesy;

        this.speed = speed;

        this.animTime = new Date().getTime();
    }

    draw(ctx, opacity = 1) {

        let t = new Date().getTime();
        if (t > this.animTime) {
            this.frame++;
            this.animTime = t + 1000 / this.speed;
        }
        if (this.frame > this.startFrame + this.frameCount) this.frame = this.startFrame;

        let posx = (this.frame % this.framesx) * this.subWidth;
        let posy = Math.floor(this.frame / this.framesx) * this.subHeight;

        ctx.globalAlpha = opacity;
        ctx.drawImage(this.img, posx, posy, this.subWidth, this.subHeight, 0, 0, this.subWidth * this.scale, this.subHeight * this.scale);
    }

    getImage() {
        return this.img.src;
    }

    changeImage(image) {
        this.img.src = image;
    }
}
