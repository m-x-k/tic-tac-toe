var type = undefined;
var values = [];
var gameOver = false;

$("#reset").click(function(event) {
  resetGame();
});

$("#X").add("#O").click(function(event) {
  type = event.target.id;
  $("#question").css("display", "none");
  $("#game").removeClass("invisible");
});

$("#0").add("#1").add("#2").add("#3").add("#4").add("#5").add("#6").add("#7").add("#8").click(function(event) {
  if (!gameOver) {
    var pos = event.target.id;
    if (values[pos] === undefined) {
      values[pos] = type;
      redisplayGame();
      if (!gameOver) {
        computerTurn();
        redisplayGame();
      }
    }
  }
});

function computerTurn() {
  var n = randomMove(); // random for now!
  values[n] = getPlayer2Type();
}

function getPlayer2Type() {
  if (type === 'X') {
    return 'O';
  }
  return 'X';
}

function randomMove() {
  if (!checkGameOver()) {
    var n = Math.floor(Math.random() * 9);
    if (values[n] === undefined) {
      return n;
    }
    return randomMove();
  }
  gameOverNoWinnerFound();
}

function checkGameOver() {
  var found = 0;
  for (var i=0; i < values.length; i++) {
    if (values[i] !== undefined) {
      found += 1;
    }
  }
  if (found === 9) {
    return true;
  }
  return false;
}

function redisplayGame() {
  for (var i = 0; i < values.length; i++) {
    $("#" + i).html(values[i]).addClass(values[i]);
  }
  checkMatch();
}

function checkMatch() {
  // horizontal line
  checkLine(0, 1, 2);
  checkLine(3, 4, 5);
  checkLine(6, 7, 8);
  // vertical line
  checkLine(0, 3, 6);
  checkLine(1, 4, 7);
  checkLine(2, 5, 8);
  // diagonal line
  checkLine(0, 4, 8);
  checkLine(6, 4, 2);
}

function checkLine(a, b, c) {
  if (values[a] !== undefined &&
      values[a] === values[b] &&
      values[b] === values[c]) {
    gameOverWinnerFound(values[a]);
  }
}

function gameOverWinnerFound(player) {
  var msg = "You lose.";
  if (player === type) {
    msg = "You win!!!"
  }

  $("#result").html(msg).addClass(player);
  gameOver = true;
}

function gameOverNoWinnerFound() {
  $("#result").html("Game over:<br/> No winner found!");
  gameOver = true;
}

function resetGame() {
  type = undefined;
  for (var i=0; i < values.length; i++) {
    $("#" + i).html("").removeClass("X").removeClass("O");
  }
  $("#result").html("").removeClass("X").removeClass("O");
  $("#question").css("display", "block");
  $("#game").addClass("invisible");
  gameOver = false;
  values = [];
}
