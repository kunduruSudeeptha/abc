class Monster{
    constructor(x, y, width, height, EvilmonsterPos) {
    
      this.body = Bodies.rectangle(x, y, width, height);
      this.width = width;
      this.height = height;
  
      this.image = loadImage("Evil_monster.gif");
      this.EvilPosition = EvilmonsterPos;
      World.add(world, this.body);
    }
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image, 0, this.EvilPosition, this.width, this.height);
      pop();
    }
    remove(index){
      setTimeout(()=>{
        Matter.World.remove(world,Evilmonster[index].body)
        delete Evilmonsters[index]
      },2000)
    }
  }