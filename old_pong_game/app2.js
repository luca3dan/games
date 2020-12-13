const keys = [];
const speed = 16;

var uiController = (function() {
  var msg = ["Bar to start", "Px Scores!", "Pxwins! Play again? [bar]"];
  var el_msg = document.querySelector("#messaggio");
  var el_score1 = document.querySelector("#player1score");
  var el_score2 = document.querySelector("#player2score");

  function updMsg() {}
  function updScore() {}
  function updVisibility(visibility) {
    if (visibility === 0) {
      el_msg.style.display = "none";
      el_score1.style.display = "none";
      el_score2.style.display = "none";
    } else {
      el_msg.style.display = "block";
      el_score1.style.display = "block";
      el_score2.style.display = "block";
    }
  }

  return {
    updateScore: function() {
      updScore();
    },
    updateMsg: function() {
      updMsg();
    },
    updateVisibility: function(visibility) {
      updVisibility(visibility);
    }
  };
})();

/*********************************************/

var elementController = (function() {
  // Costruttori e definizione dei metodi
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
    this.score = 0;
  }
  Elemento.prototype.setCoord = function(x, y) {
    this.x = parseInt(x);
    this.y = parseInt(y);
  };
  Player.prototype = Object.create(Elemento.prototype);
  Palla.prototype = Object.create(Elemento.prototype);

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
  Palla.prototype.update = function(speed) {
    //aggiornamento della posizione della palla
  };
  // Crea gli oggetti
  var palla = new Palla(document.getElementById("palla"));
  var p1 = new Player(document.getElementById("player1"));
  var p2 = new Player(document.getElementById("player2"));
  //Assegna i comandi per lo spostamento dei giocatori
  p1.setComandi("65", "90"); // A & S
  p2.setComandi("83", "88"); // S & X
  // Spostamento degli elementi player
  p1.setCoord(
    window.getComputedStyle(p1.elemento).getPropertyValue("left"),
    window.getComputedStyle(p1.elemento).getPropertyValue("top")
  );
  p2.setCoord(
    window.getComputedStyle(p2.elemento).getPropertyValue("left"),
    window.getComputedStyle(p2.elemento).getPropertyValue("top")
  );
  // Metodi pubblici
  return {
    getElements: function() {
      return {
        p1: p1,
        p2: p2,
        palla: palla
      };
    }
  };
})();

/*********************************************************************/

var gameController = (function(elementController, uiController) {
  var gameStatus = 0;
  var elements = elementController.getElements();

  function setListener() {
    document.body.addEventListener("keydown", function(e) {
      keys[e.keyCode] = true;
      if (keys[32]) {
        setGameStatus();
        setUI();
        startGame();
      }
    });
    document.body.addEventListener("keyup", function(e) {
      keys[e.keyCode] = false;
    });
  }

  function setGameStatus() {
    gameStatus = gameStatus === 1 ? 0 : 1;
  }
  function setUI() {
    let visibility = gameStatus === 1 ? 0 : 1;
    uiController.updateVisibility(visibility);
    //uiController.updateMsg();
  }
  function startGame() {
    if (gameStatus === 1) loop();
  }

  function loop() {
    if (gameStatus === 1) {
      //Spostamento dei giocatori
      elements.p1.update(speed);
      elements.p2.update(speed);
      // loop
      window.requestAnimationFrame(loop);
    } else if (gameStatus === 0) {
      return;
    }
  }

  return {
    init: function() {
      setListener();
    },
    startLoop() {
      loop();
    }
  };
})(elementController, uiController);

gameController.init();
