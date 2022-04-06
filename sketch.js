const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls=[]

var Evil_monster
var Evilmonster

function preload(){
  backgroundImg = loadImage("background.jfif");
  towerImage = loadImage("tower.png");
}
function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;

  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  Evil_monster = new Monster(width-79,height-60,170,170,-80)
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
 
  rect(ground.position.x, ground.position.y, width * 2, 1);
  
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  showEvilmonsters();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    CollisionWithMonster(i)
  }

  cannon.display();
}

function CollisionWithMonster(index){
  for(var i=0;i<Evilmonsters.length;i=i+1){
    if(balls[index] !==undefined &&  Evilmonsters[i] !==undefined){
    var collision=Matter.SAT.collision(balls[index].body,Evilmonsters[i].body)
    if(collision.collided){
      Evilmonsters[i].remove();
     Matter.World.remove(world,balls[index].body)
     delete balls[index];
    }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    if(ball.body.position.x>=width || ball.body.position.y>=height-50){
      ball.remove(index)
    }
  }
}

function showEvilmonsters() {
  if (Evilmonsters.length > 0) {
    if (
      Evilmonsters[Evilmonsters.length - 1] === undefined ||
      Evilmonsters[Evilmonsters.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var Evil_monster = new Monster(width, height - 100, 170, 170, position);

      Evilmonsters.push(Evil_monster);
    }

    for (var i = 0; i < Evilmonsters.length; i++) {
      if (Evilmonsters[i]) {
        Matter.Body.setVelocity(Evilmonsters[i].body, {x: -0.9,y: 0});

        boats[i].display();
      } 
    }
  } else {
    var Evil_monster = new Monster(width, height - 100, 170, 170, position);
    Evilmonsters.push(Evil_monster);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}


