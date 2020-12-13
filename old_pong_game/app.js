var keys = []; // array per lo stato dei pulsanti premuti
var gameStatus = "N";
var speed = 2; // velocità di gioco

document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
  if (keys[32]) {
    changeGameStatus();
  }
});
document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});

function changeGameStatus() {
  gameStatus = gameStatus === 1 ? 0 : 1; // global var
}

function Elemento(elemento) {
  this.elemento = elemento || "";
  this.x = 0;
  this.y = 0;
}
function Palla(elemento) {
  Elemento.call(this, elemento);
}
function Player(elemento) {
  Elemento.call(this, elemento);
  this.cmdUp = "";
  this.cmdDown = "";
}
function Ui(elemento) {
  Elemento.call(this, elemento);
}
Elemento.prototype.setCoord = function(x, y) {
  this.x = parseInt(x);
  this.y = parseInt(y);
};
Player.prototype = Object.create(Elemento.prototype);
Player.prototype.setComandi = function(cmdUp, cmdDown) {
  this.cmdUp = cmdUp;
  this.cmdDown = cmdDown;
};
Player.prototype.update = function(speed) {
  if (keys[this.cmdUp]) {
    this.y = this.y - speed;
    this.elemento.style.top = this.y + "px";
  }
  if (keys[this.cmdDown]) {
    this.y = this.y + speed;
    this.elemento.style.top = this.y + "px";
  }
};

var palla = new Palla(document.getElementById("palla"));
var p1 = new Player(document.getElementById("player1"));
var p2 = new Player(document.getElementById("player2"));
var scorep1 = new Ui(document.getElementById("player1score"));
var scorep2 = new Ui(document.getElementById("player2score"));
var messaggio1 = new Ui(document.getElementById("messaggio"));

p1.setComandi("65", "90");
p1.setCoord(
  window.getComputedStyle(p1.elemento).getPropertyValue("left"),
  window.getComputedStyle(p1.elemento).getPropertyValue("top")
);
p2.setComandi("83", "88");
p2.setCoord(
  window.getComputedStyle(p2.elemento).getPropertyValue("left"),
  window.getComputedStyle(p2.elemento).getPropertyValue("top")
);

function gameLoop() {
  if (gameStatus === "A") {
    // game
    p1.update(speed);
    p2.update(speed);
    //do collision check
  } else if (gameStatus === "N") {
    // do stop
  } else if (gameStatus === "P") {
    // do pause
  }
  UIMod.draw();
  window.requestAnimationFrame(gameLoop);
}

gameLoop();

var UIMod = (function() {
  function drawUI() {
    let listamsg = document.querySelectorAll("uiMsg");
    if (gameStatus === "A") {
      for (let i = 0; i < listamsg.length; i++) {
        listamsg[i].style.display = "none";
      }
    }
    if (gameStatus === "N") {
      messaggio1.elemento.innerHTML = "NUOVO";
      for (let i = 0; i < listamsg.length; i++) {
        listamsg[i].style.display = "block";
      }
    }
    if (gameStatus === "P") {
      messaggio1.elemento.innerHTML = "PAUSA";
      for (let i = 0; i < listamsg.length; i++) {
        listamsg[i].style.display = "block";
      }
    }
  }

  return {
    draw: function() {
      drawUI();
    }
  };
})();

// Da vedere
/*
var collisionDetection = (function() {
  var bCollision = false;

  function checkCollision(el1, el2, type) {
    var arr1 = xtoArray(el1);
    var arr2 = xtoArray(el2);

    ciclo1: for (var curr1 of arr1) {
      ciclo2: for (var curr2 of arr2) {
        if (
          curr1.x < curr2.x + curr2.w &&
          curr1.x + curr1.w > curr2.x &&
          curr1.y < curr2.y + curr2.h &&
          curr1.y + curr1.h > curr2.y
        ) {
          if (type === "Hard") {
            boundingBox = getBoundingBox(curr1, curr2);
            if (getSovrapposizionePixel(boundingBox)) {
              bCollision = true;
              break ciclo1;
            }
          } else if (type === "Soft") {
            bCollision = true;
            break ciclo1;
          }
        }
      }
    }
  }

  function getSovrapposizionePixel(boundingBox) {
    var imgData1 = ctx2.getImageData(
      boundingBox.x,
      boundingBox.y,
      boundingBox.w,
      boundingBox.h
    );
    var imgData2 = ctx3.getImageData(
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
  }

  function getBoundingBox(obj1, obj2) {
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
  }

  return {
    go: function(el1, el2, type) {
      checkCollision(el1, el2, type);
    },
    getCollision: function() {
      return bCollision;
    }
  };
})();
*/
