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
    tankMissiles: [],
    citizens: []
  };

}());


window.onload = function() {
  createWorld();
  setMovementListeners();
  generateCitizenInterval();
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
  var tank = gameWorld.tank,
      tempTankMissles = [],
      tempCitizens = [];

  tank.move()
  tank.render()


  for(var i = 0, tankMissile; i < gameWorld.tankMissiles.length; i++){
    tankMissile = gameWorld.tankMissiles[i]
    if(!checkHit(tankMissile)) {
      tankMissile.move()
      tankMissile.render()
      tempTankMissles.push(tankMissile)
    }

  }
  gameWorld.tankMissiles = tempTankMissles

  for(var i = 0, citizen; i < gameWorld.citizens.length; i++) {
    citizen = gameWorld.citizens[i]
    if(citizen.hp>0){
      citizen.move()
      citizen.render()
      tempCitizens.push(citizen)
    }
  }
  gameWorld.citizens = tempCitizens
  requestAnimationFrame(updateCanvasLoop);
}

// it checks to see if the missile hits the citizen.  If the citizen hp is zero in the above function,
// it will stop rendering and moving the citizen. if the missile hits the citizen, it will stop moving and rendering the missile
function checkHit(missile){
  for(var i = 0, citizen; i < gameWorld.citizens.length; i++) {
    citizen = gameWorld.citizens[i]
    if(citizen.x <=(missile.x+10) && citizen.y <=(missile.y+30)
      && missile.x <= (citizen.x+32) && missile.y <= (citizen.y + 32)){
        citizen.hp -= missile.damage
        return true
    }
  }
}

function generateCitizenInterval(){
  setInterval(function(){
    gameWorld.citizens.push(newRandomCitizen())
  }, 500)
}

function newRandomCitizen() {
  return new Citizen({
    x: Math.random() * 800,
    y: 0,
    image: "images/female_citizen.gif"
  })
}

