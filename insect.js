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


    this.gender = Math.round(Math.random());
    this.stamina = Math.random() * 100;
    this.restTime = Math.random() * 100;
    this.dead = false;
    this.starving = 0;
    this.eating = false;
    this.hunger = 35 + Math.random() * 60;
    this.mating = 0;
    this.pregnant = 0;


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
            else {
                this.Move();
            }
        }
        else {
            this.Eat();
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

        var scale = 1 + (1 - (this.hunger / 100));
        this.s.scale = {x: -scale, y: scale};
    }
    else {
        this.s.alpha -= .0005;
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
    }
}

Insect.prototype.ReCalc = function () {
    this.wanderAngle += -30 + (Math.random() * 60);
    this.s.position.x -= this.velocity.x * (1 + this.speed);
    this.s.position.y -= this.velocity.y * (1 + this.speed);
}

Insect.prototype.Wander = function () {
    this.velocity = { x: 0, y: -1};
    this.SetAngle(this.velocity, this.wanderAngle);
    this.wanderAngle += Math.random() * this.ANGLE_CHANGE - this.ANGLE_CHANGE * .5;
}

Insect.prototype.SetAngle = function (vector, value) {
    var len = Math.sqrt(Math.pow(Math.abs(vector.x), 2) + Math.pow(Math.abs(vector.y), 2));
    vector.x = Math.cos(value) * len;
    vector.y = Math.sin(value) * len;
}