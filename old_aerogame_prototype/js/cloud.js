function Cloud(x, y, h, w, d, type, speed) {
  this.x = x;
  this.y = y;
  this.h = h;
  this.w = w;
  this.d = d;
  this.type = type;
  this.speed = speed;
}
Cloud.prototype.draw = function () {
  ctx.save();
  ctx3.save();
  ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
  ctx3.translate(this.x + this.w / 2, this.y + this.h / 2);
  ctx.rotate(this.d);
  ctx3.rotate(this.d);

  //ctx.drawImage(sprites, 7, 0, 194, 211, this.w / -2, this.h / -2, this.w, this.h); // sprite cloud : x:7 y:0 w:194 h:211
  //ctx3.drawImage(sprites, 7, 0, 194, 211, this.w / -2, this.h / -2, this.w, this.h); // sprite cloud : x:7 y:0 w:194 h:211
  ctx.drawImage(sprites, 0, 405, 127, 165, this.w / -2, this.h / -2, this.w, this.h);
  ctx3.drawImage(sprites, 0, 405, 127, 165, this.w / -2, this.h / -2, this.w, this.h);

  ctx.restore();
  ctx3.restore();
};
Cloud.prototype.update = function () {
  this.y += this.speed;
};
