//setting up the canvas

var gameWorld = (function(){
  var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d");

  canvas.width = 800;
  canvas.height = 800;

  return {
    canvas: canvas,
    ctx: ctx
  };

}())

function createWorld(){
  document.querySelector("#gameBoard")
    .appendChild(gameWorld.canvas);

  gameWorld.ctx.fillStyle = "rgb(0,0,0)";
  gameWorld.ctx.fillRect(0, 0, 800, 800);

}

window.onload = function() {
  createWorld()
}
