/**
 * Created by nfilatov on 5/12/14.
 */
var simulationSpeed = 1;


var bugs = [];
var walls = [];
var flowers = [];


var stage = new PIXI.Stage(0xFFFFFF, true);
var renderer = new PIXI.WebGLRenderer(1500, 700);//autoDetectRenderer(400, 300);
document.body.appendChild(renderer.view);

for (var i = 0; i < simulationSpeed; i++) {
    requestAnimFrame(animate);
}


var tile = new PIXI.Sprite(PIXI.Texture.fromImage("tile.png"));
tile.width = 10;
tile.height = 700;
stage.addChild(tile);

var tile2 = new PIXI.Sprite(PIXI.Texture.fromImage("tile.png"));
tile2.position.x = 1490;
tile2.width = 10;
tile2.height = 700;
stage.addChild(tile2);


var tile3 = new PIXI.Sprite(PIXI.Texture.fromImage("tile.png"));
tile3.width = 1500;
tile3.height = 10;
stage.addChild(tile3);

var tile4 = new PIXI.Sprite(PIXI.Texture.fromImage("tile.png"));
tile4.position.y = 690;
tile4.width = 1500;
tile4.height = 10;
stage.addChild(tile4);


walls.push(tile);
walls.push(tile2);
walls.push(tile3);
walls.push(tile4);


for (var i = 0; i < 35; i++) {
    var t = new PIXI.Sprite(PIXI.Texture.fromImage("tile.png"));
    t.position.x = Math.random() * 1500;
    t.position.y = Math.random() * 700;
    t.width = 40 + (Math.random() * 24);
    t.height = 40 + (Math.random() * 24);
    stage.addChild(t);
    walls.push(t);
}

for (var i = 0; i < 15; i++) {
    var t = new PIXI.Sprite(PIXI.Texture.fromImage("flower.png"));
    t.position.x = Math.random() * 1300 + 50;
    t.position.y = Math.random() * 500 + 50;
    stage.addChild(t);
    flowers.push(t);
}

for (var i = 0; i < 50; i++) {
    var bug = new Insect(stage, Math.random() * 1300 + 50, Math.random() * 500 + 50);
    bug.age = 900 + ( Math.random() * 500);
    bugs.push(bug);
}

function animate() {


    for (var i = 0; i < bugs.length; i++) {

        for (var q = 0; q < flowers.length; q++) {
            if (bugs[i].CheckCollision(flowers[q]) < 20) {
                bugs[i].StartEating();
            }
        }

        var colliding = false;
        for (var k = 0; k < walls.length; k++) {
            colliding = colliding || bugs[i].CheckBlockCollision(walls[k]);
        }
        if (!colliding) {
            bugs[i].Update();
        }
        else {
            bugs[i].ReCalc();
        }
        for (var j = 0; j < bugs.length; j++) {
            if (!(bugs[i] === bugs[j]) && bugs[i].CheckCollision(bugs[j].s) < 15) {

                if ((bugs[i].hunger < 50 && bugs[j].hunger < 50) &&
                    (!bugs[i].eating && !bugs[j].eating) &&
                    (bugs[i].age > bugs[i].adulthoodAge && bugs[j].age > bugs[j].adulthoodAge)) {

                    if (bugs[i].gender == 0 && bugs[j].gender == 1) {
                        bugs[i].Mate(bugs[j]);
                    }
                    else if (bugs[i].gender == 1 && bugs[j].gender == 0) {
                        bugs[j].Mate(bugs[i]);
                    }
                }
                else {
                    bugs[i].ReCalc();
                }
            }
        }

    }

    requestAnimFrame(animate);
    renderer.render(stage);
}

