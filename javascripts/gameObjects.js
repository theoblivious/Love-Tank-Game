

function createImage(url){
  // new Image creates an image element
  var new_image = new Image();

  new_image.src = url;
  return new_image;
}

var Renderable = function(options) {
  this.x = options.x;
  this.y = options.y;
  this.image = createImage(options.image);
};

Renderable.prototype.render = function() {
  gameWorld.ctx.drawImage(this.image, this.x, this.y);
};

var Tank = function(options){
  Renderable.call(this,options);
  this.speed = 3;
};

//need to recreate Tank constructor because the prototype is
//being overwritten by Object.create
Tank.prototype = Object.create(Renderable.prototype);
Tank.prototype.constructor = Tank;
// creating behavior so we dont overwrite the prototype
Tank.prototype.shoot = function(){
  if (!(16 in gameWorld.keysDown)) {
    var tankMissile = new TankMissile({
      x : gameWorld.tank.x + 20,
      y : gameWorld.tank.y,
      image:"images/tankMissile.png"
    });
    gameWorld.tankMissiles.push(tankMissile);
  }
};

Tank.prototype.move = function(){
  var speed = this.speed;
  if (16 in gameWorld.keysDown) {
    speed += 4;
  }
  if (37 in gameWorld.keysDown && this.x >= 0) { // Player holding left
    this.x -= speed;
  }
  if (39 in gameWorld.keysDown && this.x <= 750) { // Player holding right
    this.x += speed;
  }
};


var TankMissile = function(options){
  Renderable.call(this, options);
  this.speed = 20;
  this.damage = 10;
};

TankMissile.prototype = Object.create(Renderable.prototype);
TankMissile.prototype.constructor = TankMissile;

TankMissile.prototype.move = function(){
  if (this.y > -(this.image.height)) {
    this.y -= this.speed;
  }
};


var Citizen = function(options){
  Renderable.call(this, options);
};

Citizen.prototype = Object.create(Renderable.prototype);
Citizen.prototype.constructor = Citizen;
Citizen.prototype.move = function(){
  this.y +=this.speed;
};

// we have to assign options.image before citizen.call assigns it with the function below
var FemaleCitizen = function(options) {
  options.image = "images/female_citizen.gif";
  Citizen.call(this, options);
  this.hp = 20;
  this.speed = 0.3;
};

FemaleCitizen.prototype = Object.create(Citizen.prototype);
FemaleCitizen.prototype.constructor = FemaleCitizen;

var MaleCitizen =function(options){
  options.image = "images/bouncyguy.gif";
  Citizen.call(this ,options);

  this.hp = 40;
  this.speed = 0.7;
};

MaleCitizen.prototype = Object.create(Citizen.prototype);
MaleCitizen.prototype.constructor = MaleCitizen;


