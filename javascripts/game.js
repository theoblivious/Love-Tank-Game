//setting up the canvas

var gameWorld = (function(){
  var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      tank = new Tank({
          x: 400,
          y : 730,
          image: "images/heroTank.png"
      });

  canvas.width = 800;
  canvas.height = 800;

//revealing module pattern versus module patterns
  return {
    canvas: canvas,
    ctx: ctx,
    keysDown: {},
    tank : tank,
    tankMissiles: []
  };

}());


window.onload = function() {
  createWorld();
  setMovementListeners();
  updateCanvasLoop();
};

function createWorld(){
  document.querySelector("#gameBoard")
    .appendChild(gameWorld.canvas);
}

function setMovementListeners() {
  window.addEventListener("keydown", function(e){
    gameWorld.keysDown[e.keyCode] =true;
  }, false);


  window.addEventListener("keyup", function(e){
    delete gameWorld.keysDown[e.keyCode];
  }, false);

  window.addEventListener("keydown", function(e){
    if(e.keyCode === 32){
      var tankMissile = new TankMissile({
        x : gameWorld.tank.x + 20,
        y : gameWorld.tank.y,
        image:"images/tankMissile.png"
      })

      gameWorld.tankMissiles.push(tankMissile)
    }
  })
}
// so runs a function a rate 60 fps. we throw in the fillRect because it refreshes a new rectangle
// every frame otherwise there would be a trace of the tank
function updateCanvasLoop(){
  gameWorld.ctx.fillStyle = "rgb(0,0,0)";
  gameWorld.ctx.fillRect(0, 0, 800, 800);
  var tank = gameWorld.tank

  tank.move()
  tank.render()

  for(var i = 0; i < gameWorld.tankMissiles.length; i++){
    tankMissile = gameWorld.tankMissiles[i]
    tankMissile.move()
    tankMissile.render()
  }
    requestAnimationFrame(updateCanvasLoop);
}



