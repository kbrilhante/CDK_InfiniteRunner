let bgImg, jumpFall;
let bg, ground, char, obstacles;
let gameStart, gameOver;
let score, hiScore;
let grInfo;
let speed;

function preload() {
    loadBG();
    jumpFall = loadImage("./assets/character/jumpFall.png");
}

function setup() {
    new Canvas(1024, 512);
    world.gravity.y = 18;
    
    gameStart = false;
    gameOver = false;
    score = 0;
    
    bg = new BG();
    
    ground = new Sprite();
    ground.collider = "k";
    ground.visible = false;
    ground.w = width;
    ground.h = 120;
    ground.y = height - ground.h / 2;
    ground.bounciness = 0;

    char = new Character(160, 0);

    obstacles = new Obstacles();

    setGameInfo();
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

    drawGameInfo();
}

function loadBG() {
    bgImg = [];
    for (let i = 1; i <= 5; i++) {
        const img = loadImage("./assets/background/layer" + i + ".png");
        bgImg.push(img);
    }
}

function endGame(obs) {
    gameOver = true;
    obstacles.stopObs(obs);
    bg.stopBackground();
}

function setGameInfo() {
    grInfo = new Group();
    grInfo.collider = 'n';
    grInfo.strokeWeight = 0;
    grInfo.color = "#ffffffaa";
    grInfo.w = width / 2;
    grInfo.h = 60;
    grInfo.y = grInfo.h / 2;
    for (let i = 0; i < 2; i++) {
        const spr = new grInfo.Sprite();
        spr.x = i * grInfo.w + grInfo.w / 2;
    }
}

function drawGameInfo() {
    grInfo[0].text = "Score: " + score;
}