function Player(x, y, h, w, speed) {
  this.x = x;
  this.y = y;
  this.h = h;
  this.w = w;
  this.speed = speed;
}

Player.prototype.draw = function () {
  // immagine originale
  //ctx.drawImage(sprites, 1, 216, 163, 174, this.x, this.y, this.w, this.h); // sprite player: x:1 y:216 w:163 h:174
  //ctx2.drawImage(sprites, 1, 216, 163, 174, this.x, this.y, this.w, this.h); // sprite player: x:1 y:216 w:163 h:174

  // immagine di test
  ctx.drawImage(sprites, 1, 590, 126, 103, this.x, this.y, this.w, this.h); // sprite player: x:1 y:216 w:163 h:174
  ctx2.drawImage(sprites, 1, 590, 126, 103, this.x, this.y, this.w, this.h); // sprite player: x:1 y:216 w:163 h:174
};

Player.prototype.update = function (speed) {
  if (keys[38] && this.y > 0) {
    this.y -= speed;
  }
  if (keys[40] && this.y < canvas.height - this.h) {
    this.y += speed;
  }
  if (keys[39] && this.x < canvas.width - this.w) {
    this.x += speed;
  }
  if (keys[37] && this.x > 0) {
    this.x -= speed;
  }
};

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
