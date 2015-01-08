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
}

Renderable.prototype.render = function() {
  gameWorld.ctx.drawImage(this.image, this.x, this.y);
};

var Tank = function(options){
  Renderable.call(this,options);
  this.speed = 3;
}

Tank.prototype = Object.create(Renderable.prototype)
// creating behavior so we dont overwrite the prototype
Tank.prototype.shoot = function(){
  var tankMissile = new TankMissile({
    x : gameWorld.tank.x + 20,
    y : gameWorld.tank.y,
    image:"images/tankMissile.png"
  })

  gameWorld.tankMissiles.push(tankMissile)
}

Tank.prototype.move = function(){
  if (37 in gameWorld.keysDown && this.x >= 0) { // Player holding left
    this.x -= this.speed;
  }
  if (39 in gameWorld.keysDown && this.x <= 750) { // Player holding right
    this.x += this.speed;
  }
}


var TankMissile = function(options){
  Renderable.call(this, options);
  this.speed = 20;
  this.damage = 10;
}

TankMissile.prototype = Object.create(Renderable.prototype)

TankMissile.prototype.move = function(){
  if (this.y > -(this.image.height)) {
    this.y -= this.speed;
  }
}


var Citizen = function(options){
  Renderable.call(this, options);
  this.speed = Math.random()*2;
  this.hp = 20;
}

Citizen.prototype = Object.create(Renderable.prototype)
Citizen.prototype.move = function(){
  this.y +=this.speed;
}

// we have to assign options.image before citizen.call assigns it with the function below
var FemaleCitizen = function(options) {
  options.image = "images/female_citizen.gif"
  Citizen.call(this, options)
  this.hp = 20
  this.speed = 1.3
}

FemaleCitizen.prototype = Object.create(Citizen.prototype)

var FatCitizen =function(options){
  options.image = "images/fat_citizen.png"
  Citizen.call(this ,options)

  this.hp = 40
  this.speed = .7
}

FatCitizen.prototype = Object.create(Citizen.prototype)


