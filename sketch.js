var car, carImg, road, backgroundImg;

var cones, screws, manhole, restart;

var manholeImg, coneImg, screwImg, restartImg;

var gameOver, Img;

var manholeGroup, screwGroup, coneGroup;

var score;

var leftBoundary, rightBoundary, ran;

//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
    carImg = loadImage("assets/car.png");
    backgroundImg= loadImage("assets/road.png");
    manholeImg = loadImage("assets/manhole.png");
    Img = loadImage("assets/gameOver.png");
    coneImg = loadImage("assets/cone.png");
    screwImg = loadImage("assets/screw.png");
    restartImg = loadImage("assets/restart.png");
}

function setup() {
    createCanvas(400, 600);
    
    road = createSprite(200, 100);
    road.addImage(backgroundImg);

    car = createSprite(200, 500);
    car.addImage(carImg);   
    car.scale = 0.18;
    car.setCollider("rectangle", 0, 0, 300, 700, 0);

    gameOver = createSprite(200, 300);
    gameOver.addImage(Img);
    
    leftBoundary = createSprite(10, 200, 100, 900);
    leftBoundary.visible = false;

    rightBoundary = createSprite(395, 200, 100, 900);
    rightBoundary.visible = false;

    restart = createSprite(200, 400);
    restart.addImage(restartImg);
    
    score = 0;

    manholeGroup = createGroup();
    screwGroup = createGroup();
    coneGroup = createGroup();

}

function draw() {
    background(100);

    //displaying score
    textSize(10);
    fill(255);
    text("Score: "+ score, 2, 15);

    car.collide(leftBoundary);
    car.collide(rightBoundary);
    
    if(gameState === PLAY){
        
        restart.visible = false;
        gameOver.visible = false;
        car.visible = true;

        road.velocityY = 4;
        
        //scoring
        score = score + Math.round(getFrameRate()/60);

        if(keyDown("left_arrow")){
            car.x = car.x-3; 
        }
        
        if(keyDown("right_arrow")){
            car.x = car.x+3; 
        }

        if(road.y > 400){
            road.y = height/2;
        }

        spawnObstacles();

        if(screwGroup.isTouching(car)){
            gameState = END;
        }
        else if(coneGroup.isTouching(car)){
            gameState = END;
        }
        else if(manholeGroup.isTouching(car)){
            gameState = END;
        }
        
    }
    else if(gameState === END){
        
        road.velocityY = 0
        car.visible = false;
        
        screwGroup.setLifetimeEach(-1);
        screwGroup.setVelocityYEach(0);
        manholeGroup.setLifetimeEach(-1);
        manholeGroup.setVelocityYEach(0);
        coneGroup.setLifetimeEach(-1);
        coneGroup.setVelocityYEach(0);

        restart.visible = true;
        gameOver.visible = true;
        
        if(mousePressedOver(restart)){
            reset();
        }
    
    }
    
    drawSprites();
}

function spawnManholes(){
    
        manhole = createSprite(350, 50);
        manhole.addImage(manholeImg);
        manhole.scale = 0.06;
        manhole.x = Math.round(random(120, 350));
        car.depth = manhole.depth;
        car.depth +=1;
        manhole.velocityY = 4;
        manhole.lifetime = 800;
        manhole.velocityY = (6 + score/100);
        manholeGroup.add(manhole);

}

function spawnCones(){
    
        cones = createSprite(350, 50);
        cones.addImage(coneImg);
        cones.scale = 0.06;
        cones.x = Math.round(random(120, 350));
        car.depth = cones.depth;
        car.depth +=1;
        cones.velocityY = 4;
        cones.lifetime = 800;
        cones.velocityY = (6 + score/100);
        coneGroup.add(cones);

}

function spawnScrews(){
    
        screws = createSprite(350, 50);
        screws.addImage(screwImg);
        screws.scale = 0.06;
        screws.x = Math.round(random(120, 350));
        car.depth = screws.depth;
        car.depth +=1;
        screws.velocityY = 4;
        screws.lifetime = 800;
        screws.velocityY = (6 + score/100);
        screwGroup.add(screws);
   
}

function spawnObstacles(){

    if(frameCount % 100 === 0){

        ran = Math.round(random(1,3));
        switch(ran){
            case 1: spawnManholes();
                    break;
            case 2: spawnCones();
                    break;
            case 3: spawnScrews();
                    break;
            default: break;
        }

    }

}

function reset(){
    gameState = PLAY;
    
    coneGroup.destroyEach();
    manholeGroup.destroyEach();
    screwGroup.destroyEach();
    
    score = 0;
  }