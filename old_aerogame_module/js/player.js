// Module Pattern
var player = (function(x, y, h, w, speed) {
  // proprietà private
  this.x = x;
  this.y = y;
  this.h = h;
  this.w = w;
  this.speed = speed;

  // funzioni private
  function drawPlayer() {
    //ctx.drawImage(sprites, iplsx, iplsy, iplsWidth, iplsHeight, this.x, this.y, this.w, this.h);  // immagine orig
    //ctx2.drawImage(sprites, iplsx, iplsy, iplsWidth, iplsHeight, this.x, this.y, this.w, this.h); // immagine orig
    ctx.drawImage(sprites, 1, 590, 126, 103, this.x, this.y, this.w, this.h); // immagine di test
    ctx2.drawImage(sprites, 1, 590, 126, 103, this.x, this.y, this.w, this.h); // immagine di test
  }
  function updatePlayer(speed) {
    if (keys[38] && this.y > 0) this.y -= speed;
    if (keys[40] && this.y < canvas.height - this.h) this.y += speed;
    if (keys[39] && this.x < canvas.width - this.w) this.x += speed;
    if (keys[37] && this.x > 0) this.x -= speed;
  }
  // proprietà e funzioni pubbliche
  return {
    draw: function() {
      drawPlayer();
    },
    update: function(speed) {
      updatePlayer(speed);
    },
    x: this.x,
    y: this.y,
    h: this.h,
    w: this.w
  };
})(canvas.width / 2, canvas.height / 2, canvas.width / 6, canvas.width / 6, 0);

/* Prototype Pattern ->
function Player(x, y, h, w, speed) {
  this.x = x;
  this.y = y;
  this.h = h;
  this.w = w;
  this.speed = speed;
}

Player.prototype.draw = function() {
  //ctx.drawImage(sprites, iplsx, iplsy, iplsWidth, iplsHeight, this.x, this.y, this.w, this.h);  // immagine orig
  //ctx2.drawImage(sprites, iplsx, iplsy, iplsWidth, iplsHeight, this.x, this.y, this.w, this.h); // immagine orig
  ctx.drawImage(sprites, 1, 590, 126, 103, this.x, this.y, this.w, this.h); // immagine di test
  ctx2.drawImage(sprites, 1, 590, 126, 103, this.x, this.y, this.w, this.h); // immagine di test
};

Player.prototype.update = function(speed) {
  if (keys[38] && this.y > 0) this.y -= speed;
  if (keys[40] && this.y < canvas.height - this.h) this.y += speed;
  if (keys[39] && this.x < canvas.width - this.w) this.x += speed;
  if (keys[37] && this.x > 0) this.x -= speed;
};
*/
