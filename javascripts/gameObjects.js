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
  this.render = function() {
    gameWorld.ctx.drawImage(this.image, this.x, this.y);
  };
}

var Tank = function(options){
  Renderable.call(this,options);
  this.speed = 3;
}

Tank.prototype = {
  shoot: function(){

  },
  move: function(){
    if (37 in gameWorld.keysDown && this.x >= 0) { // Player holding left
      this.x -= this.speed;
    }
    if (39 in gameWorld.keysDown && this.x <= 750) { // Player holding right
      this.x += this.speed;
    }
  }
}

var TankMissile = function(options){
  Renderable.call(this, options);
  this.speed = 20;
  this.damage = 10;
}

TankMissile.prototype = {
  move: function(){
    if (this.y > -(this.image.height)) {
      this.y -=this.speed;
    }
  }
}
