class Obstacles {
    constructor() {
        this.group = new Group();
        this.group.addAni("1", "./assets/obstacles/carrot.png", {
            frames: 20,
            size: [91, 89]
        });
        this.group.addAni("2", "./assets/obstacles/spike 1.png");
        this.group.addAni("3", "./assets/obstacles/spike 2.png");
        this.group.bounciness = 0;
        this.group.friction = 0;
        this.group.collider = 'k';
        this.group.debug = true;
        this.speed = -4;

    }
    addObs(n) {
        let ani = n;
        if (!ani) {
            ani = round(random(1,3));
        }
        ani = ani.toString();
        const spr = new this.group.Sprite();
        spr.changeAni(ani);
        spr.w = spr.ani.w;
        spr.h = spr.ani.h;
        if (ani === "1") {
            spr.diameter = spr.ani.w * 0.6;
            spr.ani.offset.x = 5;
            spr.ani.offset.y = -5;
        }
        spr.y = ground.y - (ground.h + spr.h) / 2;
        spr.x = width + random(300, 800);
        spr.vel.x = this.speed;
    }
    handleObs() {
        const lastObs = this.group[this.group.length - 1];
        const firstObs = this.group[0];
        if (lastObs.x <= width) {
            this.addObs();
        }
        if (firstObs.x < -firstObs.w / 2) {
            firstObs.remove();
            score++;
        }
    }
    stopObs(obs) {
        obs.remove();
        this.group.vel.x = 0;
    }
}