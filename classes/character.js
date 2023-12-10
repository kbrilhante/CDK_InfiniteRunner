class Character {
    constructor(x, y) {
        this.spr = new Sprite();
        // this.spr.debug = true;
        this.spr.x = x;
        this.spr.y = y;
        this.spr.w = 80;
        this.spr.h = 200;
        this.spr.layer = ground.layer + 1;
        this.spr.addAni('faint', faint, {
            frames: 3,
            size: [239, 206],
            // frameDelay: 8
        });
        this.spr.addAni('idle', idle, {
            frames: 2,
            size: [152, 205],
            frameDelay: 14
        });
        this.spr.addAni('run', run, {
            frames: 4,
            size: [154, 205]
        });
        this.spr.addAni('jumpUp', jumpUp, {
            frames: 1,
            size: [152, 224]
        });
        this.spr.addAni('jumpFall', jumpFall, {
            frames: 1,
            size: [152, 224]
        });
        this.spr.changeAni("jumpFall");
        this.spr.scale = 0.6;

        this.spr.bounciness = 0;
        this.spr.rotationLock = true;

        this.jumpHeight = -12;
    }
    handleCollisions() {
        if (this.spr.collides(ground) && !gameOver) {
            if (!gameStart) {
                this.spr.changeAni("idle");
            } else { 
                this.run();
            }
        }
        if (gameStart && !gameOver) {
            this.spr.collides(obstacles.group, this.obsCollide)
        }
    }
    run() {
        this.spr.changeAni("run");
    }
    handleJumps() {
        if (kb.presses(" ") && this.spr.colliding(ground)) {
            this.spr.vel.y = this.jumpHeight;
            this.spr.changeAni("jumpUp");
        }
        if (this.spr.vel.y > 0) {
            this.spr.changeAni("jumpFall");
        }
    }
    obsCollide(char, obs) {
        char.changeAni("faint");
        char.ani.noLoop();
        endGame(obs);
    }
    remove() {
        this.spr.remove();
    }
}