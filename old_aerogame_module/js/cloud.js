var cloud = (function () {
  function update() {
    y += speed;
  }
  function drawCloud(x, y, w, h, d, type, speed) {
    ctx.save();
    ctx3.save();
    ctx.translate(x + w / 2, y + h / 2);
    ctx3.translate(x + w / 2, y + h / 2);
    ctx.rotate(d);
    ctx3.rotate(d);
    //ctx.drawImage(sprites, insx, insy, insWidth, isHeight, x, y, w, h); // img orig
    //ctx3.drawImage(sprites, insx, insy, insWidth, insHeight, x, y, w, h); // img orig
    ctx.drawImage(sprites, 0, 405, 127, 165, w / -2, h / -2, w, h); // img test
    ctx3.drawImage(sprites, 0, 405, 127, 165, w / -2, h / -2, w, h); // img test
    ctx.restore();
    ctx3.restore();
  }
  return {
    draw: function (x, y, w, h, d, type, speed) {
      drawCloud(x, y, w, h, d, type, speed);
    },
  };
})();

/* Prototype pattern ->
function Cloud(x, y, h, w, d, type, speed) {
  this.x = x;
  this.y = y;
  this.h = h;
  this.w = w;
  this.d = d;
  this.type = type;
  this.speed = speed;
}
Cloud.prototype.draw = function() {
  ctx.save();
  ctx3.save();
  ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
  ctx3.translate(this.x + this.w / 2, this.y + this.h / 2);
  ctx.rotate(this.d);
  ctx3.rotate(this.d);

  //ctx.drawImage(sprites, insx, insy, insWidth, isHeight, this.x, this.y, this.w, this.h); // img orig
  //ctx3.drawImage(sprites, insx, insy, insWidth, insHeight, this.x, this.y, this.w, this.h); // img orig
  ctx.drawImage(sprites, 0, 405, 127, 165, this.w / -2, this.h / -2, this.w, this.h); // img test
  ctx3.drawImage(sprites, 0, 405, 127, 165, this.w / -2, this.h / -2, this.w, this.h); // img test

  ctx.restore();
  ctx3.restore();
};

Cloud.prototype.update = function() {
  this.y += this.speed;
};
*/
