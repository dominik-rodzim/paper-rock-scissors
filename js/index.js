var rock = document.getElementById('rock');
var paper = document.getElementById('paper');
var scissors = document.getElementById('scissors');
var output = document.getElementById('output');
var resultOutput = document.getElementById('result-output');
var limitOutput = document.getElementById('limit-output');
var newGame = document.getElementById('new-game');



var playerWins = 0;

var computerWins = 0;

var limit;

paper.addEventListener('click', function(){
  playerMove('paper');
});
rock.addEventListener('click', function(){
  playerMove('rock');
});
scissors.addEventListener('click', function(){
  playerMove('scissors');
});

var drawNumber = function() {
  drawnNumber = Math.round(Math.random() * 2 + 1);
  
  if(drawnNumber === 1) {
    computerChoice = 'paper';
  } else if(drawnNumber === 2) {
    computerChoice = 'rock';
  } else {
    computerChoice = 'scissors';
  }  
};

var winner = function(choice) {
  output.innerHTML = result + ': You played ' + choice + ', computer played ' + computerChoice + '.';
};

var playerMove = function(choice) {
  
  drawNumber();
  
  if(choice === 'paper') {
    if(computerChoice === 'rock') {
      result = 'YOU WON';
      } else {
        result = 'YOU LOSE';
      }
  }
  if(choice === 'scissors') {
    if(computerChoice === 'rock') {
      result = 'YOU WON';
      } else {
        result = 'YOU LOSE';
      }
  }
  if(choice === 'rock') {
    if(computerChoice === 'scissors') {
      result = 'YOU WON';
      } else {
        result = 'YOU LOSE';
      }
  }
  if(choice === computerChoice) {
    result = 'TIE';
  }
  
  winner(choice);
  
  if(result === 'YOU WON') {
    playerWins++
  } else if(result === 'YOU LOSE') {
    computerWins++;
  }
  
  resultOutput.innerHTML = 'Result: ' + playerWins + ' - ' + computerWins;
  
  if(limit == playerWins) {
    resultOutput.innerHTML += '<br> YOU WON!';
  } else if (limit == computerWins) {
    resultOutput.innerHTML += '<br> YOU LOSE!';
  } 
  
  if (limit == computerWins || limit == playerWins) {
    resultOutput.innerHTML += '<br> Game over, please press the new game button!';
    document.getElementById("rock").disabled = true;
    document.getElementById("paper").disabled = true;
    document.getElementById("scissors").disabled = true;
  }
  
};

newGame.addEventListener('click', function(){
  limit = window.prompt('Set the limit of wins');
  limitOutput.innerHTML = 'Limit of wins: ' + limit;
  playerWins = 0;
  computerWins = 0;
  resultOutput.innerHTML = 'New game has started';
  document.getElementById("rock").disabled = false;
  document.getElementById("paper").disabled = false;
  document.getElementById("scissors").disabled = false;
  output.innerHTML = '';
});