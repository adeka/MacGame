/**
 * Created by nfilatov on 5/12/14.
 */
var bugs = [];
var walls = [];

var stage = new PIXI.Stage(0xFFFFFF, true);
var renderer = new PIXI.WebGLRenderer(1500, 700);//autoDetectRenderer(400, 300);
document.body.appendChild(renderer.view);
requestAnimFrame(animate);


var tile = new PIXI.Sprite(PIXI.Texture.fromImage("tile.png"));
tile.position.x = 0;
tile.position.y = 0;
tile.width = 10;
tile.height = 700;
stage.addChild(tile);

var tile2 = new PIXI.Sprite(PIXI.Texture.fromImage("tile.png"));
tile2.position.x = 1490;
tile2.position.y = 0;
tile2.width = 10;
tile2.height = 700;
stage.addChild(tile2);


var tile3 = new PIXI.Sprite(PIXI.Texture.fromImage("tile.png"));
tile3.position.x = 0;
tile3.position.y = 0;
tile3.width = 1500;
tile3.height = 10;
stage.addChild(tile3);

var tile4 = new PIXI.Sprite(PIXI.Texture.fromImage("tile.png"));
tile4.position.x = 0;
tile4.position.y = 690;
tile4.width = 1500;
tile4.height = 10;
stage.addChild(tile4);

var tile5 = new PIXI.Sprite(PIXI.Texture.fromImage("tile.png"));
tile5.position.x = 400;
tile5.position.y = 400;
//tile5.width = 64;
//tile5.height = 64;
stage.addChild(tile5);

walls.push(tile);
walls.push(tile2);
walls.push(tile3);
walls.push(tile4);
walls.push(tile5);


for (var i = 0; i < 100; i++) {
    bugs.push(new Insect(stage, Math.random() * 1300 + 50, Math.random() * 500 + 50));
}
function animate() {

    for (var i = 0; i < bugs.length; i++) {
        var colliding = false;
        for (var k = 0; k < walls.length; k++) {
            colliding = colliding || bugs[i].CheckBlockCollision(walls[k]);
        }
        if (!colliding) {
            bugs[i].Move();
        }
        else {
            bugs[i].ReCalc();
        }
        for (var j = 0; j < bugs.length; j++) {
            if (!(bugs[i] === bugs[j]) && bugs[i].CheckCollision(bugs[j]) < 10) {
                bugs[i].Grow();
            }

        }
    }
    requestAnimFrame(animate);
    renderer.render(stage);
}


function normalizeVector(vec) {
    vec = { x: vec.x / vec.x, y: vec.y / vec.y};
}


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
    this.stamina = Math.random() * 100;
    this.restTime = Math.random() * 100;

    var bugTex = PIXI.Texture.fromImage("bug.png");
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
    var point2 = other.s.position;

    var xs = 0;
    var ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;

    ys = point2.y - point1.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);

}

Insect.prototype.CheckBlockCollision = function (other) {
    var point1 = this.s.position;
    var point2 = other.position;

    return (point1.x > point2.x &&
        point1.x < point2.x + other.width &&
        point1.y > point2.y &&
        point1.y < point2.y + other.height);

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

Insect.prototype.Grow = function () {
    // this.wanderAngle *= -1;
    this.wanderAngle += -30 + (Math.random() * 60);
    this.speed = Math.random() * 2;
    //this.s.scale = {x:this.s.scale.x - .5, y:this.s.scale.y + .5}
}

Insect.prototype.ReCalc = function () {
    // this.wanderAngle *= -1;
    this.wanderAngle += -30 + (Math.random() * 60);

    this.s.position.x -= this.velocity.x * (1 + this.speed);
    this.s.position.y -= this.velocity.y * (1 + this.speed);
    // this.speed = Math.random() * 2;
    //this.s.scale = {x:this.s.scale.x - .5, y:this.s.scale.y + .5}
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