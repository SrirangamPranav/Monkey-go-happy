
var monkey , monkey_running,monkeyrest;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivaltime=0;
var score=0;
var background1,bgimg;
var gamoverimg,gameover,restarimg,restart;
var jumpsound;
var gamestate="play";
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgimg=loadImage("ss.png");
  gameoverimg=loadImage("gameover_mgh-1-removebg-preview.png");
  restartimg=loadImage("red_reset-removebg-preview.png");
  jumpsound=loadSound("video-game-vintage-jump-ascend_zkBS6F4_.mp3");

}



function setup() {
  createCanvas(600,400);
  obstacleGroup = createGroup();
  FoodGroup = createGroup(); 
  background1=createSprite(300,250,600,350);
  background1.addImage(bgimg);
  background1.scale=1;

  monkey=createSprite(80,380,20,20);
  monkey.addAnimation("monkey moving",monkey_running);
  monkey.scale=0.08;
  
  ground=createSprite(0,380,1500,10);
  ground.shapeColor="black";
  
  gameover=createSprite(300,200);
  gameover.addImage(gameoverimg);
  gameover.scale=0.3;
  
  restart=createSprite(300,270);
  restart.addImage(restartimg);
  restart.scale=0.2;
  
}


function draw() {
  background("#87CEFA");
  monkey.collide(ground);
  if(gamestate==="play")
  { 
      ground.velocityX=-3;
      ground.visible=true;
      background1.velocityX=-3
      if(keyWentDown("space")&&monkey.y>=320)
      {
          monkey.velocityY = -15;
          jumpsound.play(); 
      }
      survivaltime=survivaltime+Math.round(getFrameRate()/60);
      monkey.velocityY = monkey.velocityY + 0.6;
      gameover.visible=false;
      restart.visible=false;
      spawnfruits();
      obstacles();
      if(monkey.isTouching(FoodGroup))
      {
          FoodGroup.destroyEach();
          score=score+1;
      }
      if(monkey.isTouching(obstacleGroup))
      {
           gamestate="end";
           monkey.velocityY=0;
      }
   }
   if(gamestate==="end")
   {
       FoodGroup.setVelocityXEach(0);
       obstacleGroup.setVelocityXEach(0);
       obstacleGroup.setLifetimeEach(-1);
       FoodGroup.setLifetimeEach(-1);
       gameover.visible=true;
       restart.visible=true;
       monkey.scale=0.08;
   }    
  
   if(mousePressedOver(restart)&& gamestate==="end")
   {
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      monkey.x=80;
      gamestate="play";
      survivaltime=0;
      score=0
      gameover.visible=false;
      restart.visible=false;
   }
   if(ground.x<0)
   {
          ground.x=ground.width/2;
   }
  
   if(background1.x<120)
   {
         background1.x=background1.width/2;
   }
  
   drawSprites();
   stroke("red");
   textSize(20);
   text("score:"+score,300,50);
  
   stroke("red");
   textSize(20);
   text("survivaltime:"+survivaltime,300,100);
  
   switch(score){
    case 10: monkey.scale=0.10;
       break;
    case 20: monkey.scale=0.11;
       break;
    case 30: monkey.scale=0.12;
       break;
    case 40:monkey.scale=0.13;
       break; 
    case 50:monkey.scale=0.14;
       break;
    case 60:monkey.scale=0.15;  
       break;
    case 70:monkey.scale=0.16;
       break;
    case 80:monkey.scale=0.17;
       break;
         }
}

function spawnfruits(){
   if (frameCount%100 === 0){
    
    banana = createSprite(500,Math.round(random(200,350)), 50, 50 )
    banana.addImage(bananaImage);
    banana.scale = 0.1;          
    banana.lifetime = 200;
    banana.velocityX=-(3+(survivaltime/50));
    FoodGroup.add(banana);
  }
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(Math.round(random(550,600)),351,50,50);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1 ;
    obstacle.velocityX = -(3+(survivaltime/50));
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
   
}


