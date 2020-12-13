function Background() {}

Background.prototype.update = function() {
  background.updateClouds();
};

Background.prototype.draw = function() {
  background.drawClouds();
};

Background.prototype.updateClouds = function() {
  var nc = cloudsMap.size;
  var lastCloud = Array.from(cloudsMap)[cloudsMap.size - 1]; // ultimo elemento inserito nella mappa. se esiste; altrimenti undefined

  for (var [key, cloud] of cloudsMap.entries()) {
    // elimino nuvole che hanno raggiunto la fine del canvas
    if (cloud.y > canvas.height) {
      cloudsMap.delete(key);
    } else {
      cloud.update();
    }
  }

  let rndSize = Math.floor(Math.random() * (canvas.width / 5)) + canvas.width / 5;
  if (!lastCloud || (lastCloud[1].y > 0 && cloudsMap.size < 20)) {
    // 250 è l'altezza dell'immagine
    let rndID = Math.random()
      .toString(36)
      .replace("0.", "");
    let rndType = Math.floor(Math.random() * 3) + 1;
    //let rndXpos = Math.floor(Math.random() * (canvas.width - rndSize)) + 1;
    let rndXpos = background.getXCloudPosition(rndSize);
    let rndDegrees = Math.round((Math.PI / 180) * Math.floor(Math.random() * 180) + 1);

    cloudsMap.set(
      rndID,
      new Cloud(rndXpos, -rndSize * 3, rndSize, rndSize, rndDegrees, rndType, 2)
    );
  }
};

Background.prototype.drawClouds = function() {
  for (var [key, cloud] of cloudsMap.entries()) {
    cloud.draw();
  }
};

Background.prototype.getXCloudPosition = function(rndSize) {
  nTotClouds = nTotClouds + 1;
  if (Math.isOdd(nTotClouds)) {
    return Math.floor(Math.random() * (canvas.width / 2 - rndSize)) + 1;
  } else {
    return Math.floor(Math.random() * (canvas.width / 2 - rndSize)) + canvas.width / 2;
  }
};
