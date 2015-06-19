/**
 * Created by nfilatov on 6/17/14.
 */



function Insect(stage, x, y) {
    this.velocity = { x: 0, y: 0};
    this.max_force = 1.0;
    this.mass = 1.0;
    this.velocity = { x: 0, y: 0};
    this.position = { x: 0, y: 0};
    this.wanderAngle = 0;
    this.max_speed = 1;
    this.ANGLE_CHANGE = .5;
    this.speed = 0.0;

    this.litterSize = 3;
    this.litterVariation = 1;

    this.maxAge = 9915000;
    this.adulthoodAge = 1500;
    this.age = 0;//900 + ( Math.random() * 500);


    this.gender = Math.round(Math.random());
    this.stamina = Math.random() * 100;
    this.restTime = Math.random() * 100;
    this.dead = false;
    this.starving = 0;
    this.eating = false;
    this.hunger = Math.random() * 60;
    this.food = -1;
    this.mating = 0;
    this.pregnant = 0;
    this.egg;
    this.seeking = false;

    var bugTex;

    if (this.gender == 0) {
        bugTex = PIXI.Texture.fromImage("fembug.png");

    }
    else {
        bugTex = PIXI.Texture.fromImage("bug.png");

    }
    this.s = new PIXI.Sprite(bugTex);

    this.s.position.x = x;
    this.s.position.y = y;

    this.s.scale = {x: -1, y: 1};

    this.s.anchor.x = .5;
    this.s.anchor.y = .5;

    stage.addChild(this.s);

}

Insect.prototype.CheckCollision = function (other) {
    var point1 = this.s.position;
    var point2 = other.position;

    var xs = 0;
    var ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;

    ys = point2.y - point1.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);

}

Insect.prototype.Mate = function (male) {
    if (this.mating == 0 && male.mating == 0) {
        this.mating = 1;
        male.mating = 1;

        var eggt = PIXI.Texture.fromImage("egg.png");
        this.egg = new PIXI.Sprite(eggt);
        this.egg.anchor = {x: 0, y: .5};
        this.eggScale = .1;
        this.egg.scale = {x: this.eggScale, y: this.eggScale};
        this.s.addChild(this.egg);
    }
}

Insect.prototype.CheckBlockCollision = function (other) {
    var point1 = this.s.position;
    var point2 = other.position;

    return (point1.x > point2.x &&
        point1.x < point2.x + other.width &&
        point1.y > point2.y &&
        point1.y < point2.y + other.height);

}


Insect.prototype.Update = function () {
    if (!this.dead) {
        if (!this.eating) {
            if (this.mating > 0 && this.mating <= 100) {
                this.mating += .3;
                this.s.rotation = Math.sin(this.mating);
            }
            else{
                this.Move();
                if(this.food > 0){
                  this.food--;
                }
            }
        }
        else {
            this.Eat();
        }

        if(this.food == 0){
          this.food = -1;
          this.Poop();
        }

        if (this.hunger < 100) {
            this.hunger += .03;
            this.starving = 0;
        }
        else {
            this.starving += .1;
        }

        if (this.starving >= 150) {
            this.Die();
        }
        if(this.age > this.maxAge){
            this.Die();
        }

        //var scale = 1 + (1 - (this.hunger / 100));
        var finalAge = (this.age / this.adulthoodAge);
        if (finalAge > 1) finalAge = 1;
        var scaleX = .6 + finalAge*.8;
        var scaleY = .4 + (1 - (this.hunger / 100));
        this.s.scale = {x: -scaleX, y: scaleY};
        this.age++;

        if (this.gender == 0 && this.egg && this.mating > 90) {
            if (this.eggScale < .4) {
                this.egg.scale = {x: this.eggScale, y: this.eggScale};
                this.eggScale += .0005;
            }
            else {
                this.mating = 0;
                this.s.removeChild(this.egg);
                this.egg = null;
                var spawnAmount = this.litterSize + (Math.round(Math.random() * this.litterVariation));
                for (var i = 0; i < 3; i++) {
                    var child = new Insect(stage, this.s.position.x + (-8 + Math.random() * 16), this.s.position.y + (-8 + Math.random() * 16));
                    bugs.push(child);
                }

            }
        }
    }
    else {
        this.s.alpha -= .005;
    }
}


Insect.prototype.Move = function () {
    //this.s.scale = {x:this.s.scale.x -.01, y:this.s.scale.y +.01}
    this.speed *= .99;
    this.stamina -= 1;

    if (this.stamina > 0) {
        this.Wander();
        this.s.rotation = this.wanderAngle;
        this.s.position.x += this.velocity.x * (1 + this.speed);
        this.s.position.y += this.velocity.y * (1 + this.speed);
    }

    if (this.stamina <= -this.restTime) {
        this.restTime = Math.random() * 100;
        this.stamina = Math.random() * 100;
    }


    // steering = truncateVector (steering, max_force);
    // steering = {x:steering.x / mass, y: steering.y / mass};
    // velocity = truncateVector ({x:velocity.x + steering.x, y:velocity.y + steering.y} , max_speed);
    // position = {x:position.x + velocity.x,y:position.y + velocity.y};
}
Insect.prototype.Die = function () {
    // this.s.alpha = 0;
    this.s.setTexture(PIXI.Texture.fromImage("deadbug.png"));
    this.dead = true;
    // this.alpha = 0;
    // this.s.parent.removeChild(this.s);
}

Insect.prototype.StartEating = function () {
    if (this.hunger > 20 && !this.eating) {
        this.eating = true;
    }
}

Insect.prototype.Eat = function () {
    if (this.hunger > 0) {
        this.hunger -= .25;
    }
    else {
        this.eating = false;
        this.food = 1000;
        this.seeking = false;
    }
}

Insect.prototype.Poop = function () {
  var tile = new PIXI.Sprite(PIXI.Texture.fromImage("poop.png"));
  tile.width = 10;
  tile.height = 10;
  stage.addChild(tile);
  tile.position = {x:this.s.position.x, y:this.s.position.y};
  console.log("poop");
}

Insect.prototype.ReCalc = function () {
    this.wanderAngle += -30 + (Math.random() * 60);
    this.s.position.x -= this.velocity.x * (1 + this.speed);
    this.s.position.y -= this.velocity.y * (1 + this.speed);
}

Insect.prototype.Wander = function () {
    this.velocity = { x: 0, y: -5};
    this.SetAngle(this.velocity, this.wanderAngle);
    if(this.hunger > 51 && !this.seeking){
      this.flower = this.GetClosestFlower();
      this.seeking = true;
    }
    if(this.seeking){
      var x = this.flower.position.x - this.s.position.x;
      var y = this.flower.position.y - this.s.position.y;
      if (y==Number.MIN_VALUE){
        console.log("wat");
      }
      var angle = Math.atan(x/y) * -(180/Math.PI);
      this.wanderAngle = angle * this.ANGLE_CHANGE - this.ANGLE_CHANGE * .5;
    }
    else{
      this.wanderAngle += Math.random() * this.ANGLE_CHANGE - this.ANGLE_CHANGE * .5;
    }
}

Insect.prototype.GetClosestFlower = function(){
  var closest = flowers[0];
  var distance = 100000000;
  for (var q = 0; q < flowers.length; q++) {
      var d = Distance(flowers[q].position, this.s.position);
      //console.log(d);
      if(d < distance){
        closest = flowers[q];
        distance = d;
      }
  }
  return closest;
}

Insect.prototype.SetAngle = function (vector, value) {
    var len = Math.sqrt(Math.pow(Math.abs(vector.x), 2) + Math.pow(Math.abs(vector.y), 2));
    vector.x = Math.cos(value) * len;
    vector.y = Math.sin(value) * len;
}

Distance = function(pos1, pos2){
  var x = pos1.x;
  var y = pos1.y;
  var x0 = pos2.x;
  var y0 = pos2.y;
  return Math.sqrt((x -= x0) * x + (y -= y0) * y);
};
