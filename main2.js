/**
 * Created by nfilatov on 5/12/14.
 */


var stage = new PIXI.Stage(0xFFFFFF, true);
var renderer = new PIXI.WebGLRenderer(1500, 700);//autoDetectRenderer(400, 300);
document.body.appendChild(renderer.view);
requestAnimFrame(animate);

var bugs = [];

for (var i = 0; i < 100; i++) {
    bugs.push(new Insect(stage, Math.random() * 1500, Math.random()*600));
}
function animate() {

    for (var i = 0; i < bugs.length; i++) {
        bugs[i].Move();
         for (var j = 0; j < bugs.length; j++) {
             if(!(bugs[i] === bugs[j]) && bugs[i].CheckCollision(bugs[j]) < 10){
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


function Insect(stage,x,y) {
    this.steering = { x: 0, y: 0};
    this.max_force = 1.0;
    this.mass = 1.0;
    this.velocity = { x: 0, y: 0};
    this.position = { x: 0, y: 0};
    this.wanderAngle = 0;
    this.max_speed = 1;
    this.ANGLE_CHANGE = 1;


    var bugTex = PIXI.Texture.fromImage("bug.png");
    this.s = new PIXI.Sprite(bugTex);


    this.s.position.x = x;
    this.s.position.y = y;

    this.s.scale = {x: -1, y: 1};

    this.s.anchor.x = .5;
    this.s.anchor.y = .5;

    stage.addChild(this.s);


}

Insect.prototype.CheckCollision = function(other){
  var point1 = this.s.position;
  var point2 = other.s.position;

  var xs = 0;
  var ys = 0;

  xs = point2.x - point1.x;
  xs = xs * xs;

  ys = point2.y - point1.y;
  ys = ys * ys;

  return Math.sqrt( xs + ys );

}

Insect.prototype.Move = function () {
    //this.s.scale = {x:this.s.scale.x -.01, y:this.s.scale.y +.01}
    this.s.rotation = this.wanderAngle;
    steering = this.Wander();
    // steering = truncateVector (steering, max_force);
    // steering = {x:steering.x / mass, y: steering.y / mass};
    // velocity = truncateVector ({x:velocity.x + steering.x, y:velocity.y + steering.y} , max_speed);
    // position = {x:position.x + velocity.x,y:position.y + velocity.y};

    this.s.position.x += steering.x;
    this.s.position.y += steering.y;

}

Insect.prototype.Grow = function(){
    this.wanderAngle*=-1;
   //this.s.scale = {x:this.s.scale.x - .5, y:this.s.scale.y + .5}
}

Insect.prototype.Wander = function () {
    var displacement;
    displacement = { x: 0, y: -1};
    this.SetAngle(displacement, this.wanderAngle);
    this.wanderAngle += Math.random() * this.ANGLE_CHANGE - this.ANGLE_CHANGE * .5;
    return displacement;
}

Insect.prototype.SetAngle = function (vector, value) {
    var len = Math.sqrt(Math.pow(Math.abs(vector.x), 2) + Math.pow(Math.abs(vector.y), 2));
    vector.x = Math.cos(value) * len;
    vector.y = Math.sin(value) * len;
}