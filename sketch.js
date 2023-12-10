let bgImg, faint, idle, run, jumpUp, jumpFall;
let bg, ground, char, obstacles;
let gameStart, gameOver;
let score, hiScore;
let grInfo, grGameOver;
let speed;

function preload() {
    loadBG();
    faint = loadImage("./assets/character/faint.png");
    idle = loadImage("./assets/character/idle.png");
    run = loadImage("./assets/character/run.png");
    jumpUp = loadImage("./assets/character/jumpUp.png");
    jumpFall = loadImage("./assets/character/jumpFall.png");
}

function setup() {
    new Canvas(1024, 512);
    world.gravity.y = 20;
    
    gameStart = false;
    gameOver = false;
    score = 0;
    hiScore = getHiScore();
    speed = -4;
    
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

    setGameOverInfo();
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
    if (gameStart && gameOver && kb.presses("enter")) {
        reset();
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
    grGameOver.visible = true;
}

function setGameInfo() {
    grInfo = new Group();
    grInfo.collider = 'n';
    grInfo.strokeWeight = 0;
    grInfo.color = "#ffffffaa";
    grInfo.w = width / 2;
    grInfo.h = 50;
    grInfo.y = grInfo.h / 2;
    grInfo.textSize = 30;
    for (let i = 0; i < 2; i++) {
        const spr = new grInfo.Sprite();
        spr.x = i * grInfo.w + grInfo.w / 2;
    }
}


function drawGameInfo() {
    grInfo[0].text = "Score: " + score;
    grInfo[1].text = "Hi-Score: " + hiScore;
}

function getHiScore () {
    let hs = localStorage.getItem("hiScore");
    if (hs) {
        return hs;
    }
    return 0;
}

function setGameOverInfo() {
    grGameOver = new Group();
    grGameOver.collider = "n";
    grGameOver.strokeWeight = 0;
    grGameOver.color = "#ffffffaa";
    grGameOver.w = 500;
    grGameOver.h = 100;
    let go = new grGameOver.Sprite();
    go.y = height * 0.4;
    go.textSize = 70;
    go.text = "GAME OVER";
    let msg = new grGameOver.Sprite();
    msg.h = 40;
    msg.y = go.y + go.h / 2 + msg.h / 2;
    msg.textSize = 26;
    msg.text = "Press ENTER to play again";
    grGameOver.visible = false;
}

function reset() {
    bg.removeAll();
    char.remove();
    obstacles.removeAll();
    bg = new BG();
    char = new Character(160, 0);

    gameStart = false;
    gameOver = false;
    grGameOver.visible = false;
    score = 0;
}