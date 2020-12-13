fillStdRect();
var sprites = document.getElementById("sprites"); //sprites.crossOrigin = "Anonymous";

// le definizioni servivano per il prototype pattern
//var background = new Background();
//var player = new Player(canvas.width / 2, canvas.height / 2, canvas.width / 6, canvas.width / 6, 0);
//var collisionDetection = new CollisionDetection();

document.body.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true;
  if (keys[81]) isStop = true;
  if (keys[80]) {
    if (!isPausa) {
      isPausa = true;
    } else {
      isPausa = false;
      gameLoop();
    }
  }
});

document.body.addEventListener("keyup", function (e) {
  keys[e.keyCode] = false;
});

function gameLoop() {
  collisionDetection.goHard(player, cloudsMap);
  if (!collisionDetection.bCollision && !isPausa && !isStop) {
    background.update();
    player.update(3);
    clearAllRect();
    fillStdRect();
    background.draw();
    player.draw();
    window.requestAnimationFrame(gameLoop);
  }
  if (isPausa) gamePause();
  if (collisionDetection.bCollision || isStop) gameOver();
}

function gameOver() {
  clearAllRect();
  fillStdRect();
  ctx.drawImage(sprites, igosx, igosy, igosWidth, igosHeight, igodx, igody, igodWidth, igodHeight);
  isStop = true;
}

function gamePause() {
  ctx.drawImage(sprites, ipsx, ipsy, ipsWidth, ipsHeight, ipdx, ipdy, ipdWidth, ipdHeight);
  isPausa = true;
}

function xtoArray(el) {
  if (el instanceof Map) return Array.from(el.values());
  else if (Array.isArray(el)) return el;
  else return [el];
}

function clearAllRect() {
  ctx.clearRect(0, 0, 120, 240);
  ctx2.clearRect(0, 0, 120, 240);
  ctx3.clearRect(0, 0, 120, 240);
}

function fillStdRect() {
  ctx.fillStyle = "#2b8fef";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx2.fillRect(0, 0, canvas.width, canvas.height);
  ctx3.fillRect(0, 0, canvas.width, canvas.height);
}

gameLoop();
