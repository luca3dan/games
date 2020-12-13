function CollisionDetection() {}

CollisionDetection.prototype.go = function(el1, el2) {
  var arr1 = xtoArray(el1);
  var arr2 = xtoArray(el2);

  for (var curr1 of arr1) {
    for (var curr2 of arr2) {
      if (
        curr1.x < curr2.x + curr2.w &&
        curr1.x + curr1.w > curr2.x &&
        curr1.y < curr2.y + curr2.h &&
        curr1.y + curr1.h > curr2.y
      ) {
        boundingBox = this.getBoundingBox(curr1, curr2);
        if (this.getSovrapposizionePixel(boundingBox)) {
          return true;
        }
      }
    }
  }
  return false;
};

CollisionDetection.prototype.getBoundingBox = function(obj1, obj2) {
  var obj1Right = obj1.x + obj1.w,
    obj1Bottom = obj1.y + obj1.h,
    obj2Right = obj2.x + obj2.w,
    obj2Bottom = obj2.y + obj2.h;

  var boundingBoxX = Math.max(obj1.x, obj2.x),
    boundingBoxY = Math.max(obj1.y, obj2.y),
    boundingBoxRight = Math.min(obj1Right, obj2Right),
    boundingBoxBottom = Math.min(obj1Bottom, obj2Bottom);

  return {
    x: boundingBoxX,
    y: boundingBoxY,
    w: boundingBoxRight - boundingBoxX,
    h: boundingBoxBottom - boundingBoxY
  };
};

CollisionDetection.prototype.getSovrapposizionePixel = function(boundingBox) {
  var imgData1 = ctx2.getImageData(
      boundingBox.x,
      boundingBox.y,
      boundingBox.w,
      boundingBox.h
    ),
    imgData2 = ctx3.getImageData(
      boundingBox.x,
      boundingBox.y,
      boundingBox.w,
      boundingBox.h
    );

  var imgData1Data = imgData1.data;
  var imgData2Data = imgData2.data;

  for (var i = 3, len = imgData1Data.length; i < len; i += 4) {
    if (imgData1Data[i] > 0 && imgData2Data[i] > 0) {
      return true;
    }
  }
  return false;
};
