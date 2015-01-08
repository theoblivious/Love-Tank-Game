//setting up the canvas

var gameWorld = (function(){
  var canvas = document.createElement("canvas");
      ctx = canvas.getContext("2d");

  canvas.width = 800;
  canvas.height = window.innerHeight;

  var tank = new Tank({
          x: 400,
          y : canvas.height - 110,
          image: "images/heroTank.png"
      });


//revealing module pattern versus module patterns
  return {
    canvas: canvas,
    ctx: ctx,
    enemyInterval: 0,
    keysDown: {},
    tank : tank,
    tankMissiles: [],
    citizens: [],
    score: 0,
    gameOver: false
  };

}());

//creating the world
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
      gameWorld.tank.shoot();
    }
  })
}

function generateCitizenInterval(){
  gameWorld.enemyInterval = setInterval(function(){
    gameWorld.citizens.push(newRandomCitizen())
  }, 1000)
}

function newRandomCitizen() {
  var citizen;
  if (Math.random() < .5){
    citizen = new FemaleCitizen({
      x: Math.random() * 750,
      y: 0
    })
  } else {
    citizen = new FatCitizen({
      x: Math.random() * 750,
      y: 0
    })
  }

  return citizen
}

// so runs a function a rate 60 fps. we throw in the fillRect because it refreshes a new rectangle
// every frame otherwise there would be a trace of the tank
//updating the world
function updateCanvasLoop(){
  if (gameWorld.gameOver) {
    stopEnemyInterval();
    displayGameOver();
    return;
  }

  updateBackground();
  updateTank();
  updateMissiles();
  updateCitizens();
  updateScoreBox();
  requestAnimationFrame(updateCanvasLoop);
}

//covers the tank trail left behind.
function updateBackground(){
  gameWorld.ctx.fillStyle = "rgb(0,0,0)";
  gameWorld.ctx.fillRect(0, 0, gameWorld.canvas.width, gameWorld.canvas.height);
}

function updateTank(){
  var tank = gameWorld.tank;
  tank.move()
  tank.render()
}

function updateMissiles() {
  var tempTankMissles = [];

  for(var i = 0, tankMissile; i < gameWorld.tankMissiles.length; i++){
    tankMissile = gameWorld.tankMissiles[i]
    if(!checkHit(tankMissile) && tankMissile.y > -30) {
      tankMissile.move()
      tankMissile.render()
      tempTankMissles.push(tankMissile)
    }
  }
  //reassigning tank missiles array only the missiles that havent hit anything.
  gameWorld.tankMissiles = tempTankMissles
}

function updateCitizens(){
  var tempCitizens = [];

  for(var i = 0, citizen; i < gameWorld.citizens.length; i++) {
    citizen = gameWorld.citizens[i]
    if(citizen.y > gameWorld.canvas.height-50) {
      gameWorld.gameOver = true;
    } else if(citizen.hp>0){
      citizen.move()
      citizen.render()
      tempCitizens.push(citizen)
    } else {
      incrementScore()
    }
  }
  gameWorld.citizens = tempCitizens
}

function updateScoreBox(){
  var ctx = gameWorld.ctx
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect(300,gameWorld.canvas.height-50, 200, 50);

  ctx.fillStyle = "rgb(0,0,0)";
  ctx.font = "45px sans-serif"
  ctx.fillText(gameWorld.score, 390, gameWorld.canvas.height - 10)
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

function incrementScore(){
  gameWorld.score++;
}

function stopEnemyInterval() {
  clearInterval(gameWorld.enemyInterval)
}

function displayGameOver(){
  var ctx = gameWorld.ctx
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect(300,250, 300, 300);

  ctx.fillStyle = "rgb(0,0,0)";
  ctx.font = "30px sans-serif"
  ctx.fillText("Game Over!", 320,400 )
  ctx.fillText("Your score is "+gameWorld.score, 320,450 )
}

