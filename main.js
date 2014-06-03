/**
 * Created by nfilatov on 5/12/14.
 */

var stage = new PIXI.Stage(0x000009, true);
var renderer = new PIXI.WebGLRenderer(800, 500);//autoDetectRenderer(400, 300);
document.body.appendChild(renderer.view);
requestAnimFrame(animate);

/*
 // create a texture from an image path
 var profileTex = PIXI.Texture.fromImage("profile.png");
 var cashTex = PIXI.Texture.fromImage("cash-dark.png");
 var happyTex = PIXI.Texture.fromImage("happy.png");
 var houseTex = PIXI.Texture.fromImage("house.png");
 var carTex = PIXI.Texture.fromImage("car.png");
 var famTex = PIXI.Texture.fromImage("family.png");
 var cartTex = PIXI.Texture.fromImage("cart.png");
 // create a new Sprite using the texture
 var profileImage = new PIXI.Sprite(profileTex);
 var cashImage = new PIXI.Sprite(cashTex);
 var happyImage = new PIXI.Sprite(happyTex);

 var houseImage = new PIXI.Sprite(houseTex);
 houseImage.setInteractive(true);
 houseImage.mouseover = function(mouseData){
 houseImage.alpha = 4;
 }
 houseImage.mouseout = function(mouseData){
 houseImage.alpha = 1;
 }


 var carImage = new PIXI.Sprite(carTex);
 carImage.setInteractive(true);
 carImage.mouseover = function(mouseData){
 carImage.alpha = 4;
 }
 carImage.mouseout = function(mouseData){
 carImage.alpha = 1;
 }

 var famImage = new PIXI.Sprite(famTex);
 famImage.setInteractive(true);
 famImage.mouseover = function(mouseData){
 famImage.alpha = 4;
 }
 famImage.mouseout = function(mouseData){
 famImage.alpha = 1;
 }
 var cartImage = new PIXI.Sprite(cartTex);
 cartImage.setInteractive(true);
 cartImage.mouseover = function(mouseData){
 cartImage.alpha = 4;
 }
 cartImage.mouseout = function(mouseData){
 cartImage.alpha = 1;
 }
 //var bunny = new PIXI.graphicsData.Rectangle(0,0,100,100);




 var text = new PIXI.Text("First Name Last Name", {font:"22px Arial", fill:"white"});
 profileImage.addChild(text);
 text.position.y = 250;
 //bunny.setInteractive(true);

 // center the sprites anchor point
 //bunny.anchor.x = 0.5;
 //bunny.anchor.y = 0.5;

 houseImage.scale = new PIXI.Point(.2,.2);
 houseImage.position.x = 260;
 houseImage.position.y = 10;
 stage.addChild(houseImage);

 carImage.scale = new PIXI.Point(.1,.1);
 carImage.position.x = 250;
 carImage.position.y = 80;
 stage.addChild(carImage);

 famImage.scale = new PIXI.Point(.16,.16);
 famImage.position.x = 245;
 famImage.position.y = 120;
 stage.addChild(famImage);

 cartImage.scale = new PIXI.Point(.1,.1);
 cartImage.position.x = 250;
 cartImage.position.y = 200;
 stage.addChild(cartImage);

 // move the sprite t the center of the screen
 profileImage.position.x = 10;
 profileImage.position.y = 10;
 stage.addChild(profileImage);

 cashImage.scale = new PIXI.Point(.1,.1);
 cashImage.position.x = 10;
 cashImage.position.y = 280;
 stage.addChild(cashImage);


 happyImage.scale = new PIXI.Point(.08,.08);
 happyImage.position.x = 10;
 happyImage.position.y = 330;
 stage.addChild(happyImage);

 var cashText = new PIXI.Text("$10,000", {font:"15px Arial", fill:"white"});
 stage.addChild(cashText);
 cashText.position.x = 75;
 cashText.position.y = 295;

 var happiness = new PIXI.Text("95%", {font:"15px Arial", fill:"white"});
 stage.addChild(happiness);
 happiness.position.x = 75;
 happiness.position.y = 340;

 */

var nameText = new PIXI.Text("", {font: "25px Arial", fill: "white"});
stage.addChild(nameText);
nameText.position.x = 22;
nameText.position.y = 25;

var currentHour = 0;
var timerText = new PIXI.Text("", {font: "25px Arial", fill: "white"});
stage.addChild(timerText);
timerText.position.x = 22;
timerText.position.y = 75;

var netWorth = new PIXI.Text("", {font: "25px Arial", fill: "white"});
stage.addChild(netWorth);
netWorth.position.x = 22;
netWorth.position.y = 175;

var hourlyWage = new PIXI.Text("", {font: "25px Arial", fill: "white"});
stage.addChild(hourlyWage);
hourlyWage.position.x = 22;
hourlyWage.position.y = 125;

var person = new Citizen("Nikita Filatov");

function animate() {
    var d = new Date();
    var n = d.getTime();
    if (n % 600 < 20) {
        person.netWorth += person.hourlyWage;

        if (currentHour <= 24)
            currentHour++;
        else {
            currentHour = 0;
        }
    }
    var modTime = (n % 6000) + "";
    nameText.setText("Name: " + person.name);
    timerText.setText("Current Hour: " + currentHour + " : " + modTime.substring(0, 2));
    netWorth.setText("Net Worth: $" + person.netWorth);
    hourlyWage.setText("Hourly Wage: $" + person.hourlyWage + "/hour");
    requestAnimFrame(animate);
    renderer.render(stage);
}
