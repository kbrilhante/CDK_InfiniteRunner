let bgImg, jumpFall;
let bg, ground, char, obstacles;
let gameStart, gameOver;

function preload() {
    loadBG();
    jumpFall = loadImage("./assets/character/jumpFall.png");
}

function setup() {
    new Canvas(1024, 512);
    world.gravity.y = 10;
    
    gameStart = false;
    gameOver = false;
    
    bg = new BG();
    
    ground = new Sprite();
    ground.collider = "k";
    ground.visible = false;
    ground.w = width;
    ground.h = 120;
    ground.y = height - ground.h / 2;
    ground.bounciness = 0;

    char = new Character(100, 0);

    obstacles = new Obstacles();
}

function draw() {
    background("hotpink");
    if (gameStart && !gameOver) {
        // game started
        bg.moveBackground();
        char.handleJumps();
        obstacles.handleObs();
    }
    if (!gameStart && !gameOver && kb.presses(" ")) {
        // start the game
        gameStart = true;
        bg.startBackground();
        char.run();
        obstacles.addObs();
    }
    char.handleCollisions();
}

function loadBG() {
    bgImg = [];
    for (let i = 1; i <= 5; i++) {
        const img = loadImage("./assets/background/layer" + i + ".png");
        bgImg.push(img);
    }
}