var rock = document.getElementById('rock');
var paper = document.getElementById('paper');
var scissors = document.getElementById('scissors');
var output = document.getElementById('output');
var resultOutput = document.getElementById('result-output');
var resultOutputModal = document.getElementById('result-output-modal');
var limitOutput = document.getElementById('limit-output');
var newGame = document.getElementById('new-game');
var playerMoves = document.querySelectorAll('.player-move');
var overlay = document.getElementById('modal-overlay');
var modal = document.getElementById('modal-one');
var gameDetails = document.getElementById('game-details');

var limit;

var params = {round: 0, playerWins: 0, computerWins: 0, progress:[]};

var activeButtons = function(active){
	for(var i = 0; i < playerMoves.length; i++){
	    playerMoves[i].disabled = active;
	}	
}

activeButtons(true);

newGame.addEventListener('click', function(){
  params.limit = window.prompt('Set the limit of wins');
  if(isNaN(params.limit) == true || params.limit == ''){
  	resultOutput.innerHTML = 'Limit must be a number!';	
  } else {
	  limitOutput.innerHTML = 'Limit of wins: ' + params.limit;
	  resultOutput.innerHTML = 'New game has started';
	  params.playerWins = 0;
	  params.computerWins = 0;
	  params.round = 0;
	  params.progress = [];
	  gameDetails.innerHTML = '<tr><th>Round</th><th>Player move</th><th>Computer move</th><th>Result</th><th>Score</th></tr>';
	  output.innerHTML = '';
	  activeButtons(false);
  	}
});

for (var i = 0; i < playerMoves.length; i++) {
  playerMoves[i].addEventListener("click", function(event){
    playerMove(event.target.getAttribute('data-move'));
  });
};

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

  params.round++;
  
  drawNumber();
  
  if(choice === computerChoice) {
    result = 'TIE';
  } else if (
    (choice === 'paper' && computerChoice === 'rock')
    ||
    (choice === 'rock' && computerChoice === 'scissors')
    ||
    (choice === 'scissors' && computerChoice === 'paper') 
  ) {
      result = 'YOU WON';
      params.playerWins++
  } else {
      result = 'YOU LOSE';
      params.computerWins++;
  }

  winner(choice);
  
  resultOutput.innerHTML = 'Result: ' + params.playerWins + ' - ' + params.computerWins;
  
  if(params.limit == params.playerWins) {
    finalResult = 'YOU WON!';
  } else if (params.limit == params.computerWins) {
    finalResult = 'YOU LOSE!';
  } 

	var roundStats = {};
    roundStats['round'] = params.round;
    roundStats['player'] = choice;
    roundStats['computer'] = computerChoice;
    roundStats['result'] = result;
    roundStats['score'] = params.playerWins + ' - ' + params.computerWins;
    params.progress.push(roundStats);
  
  if (params.limit == params.computerWins || params.limit == params.playerWins) {
    resultOutput.innerHTML += '<br> Game over, please press the new game button!';
    resultOutputModal.innerHTML = finalResult + '<br> Result: ' + params.playerWins + ' - ' + params.computerWins + '<br> Game over, please press the new game button!';
    activeButtons(true);
    modal.classList.add('show');
    overlay.classList.add('show');
    for (var i = 0; i < params.progress.length; i++) {
      gameDetails.innerHTML += '<tr><td>' + params.progress[i]['round'] + '</td><td>' + params.progress[i]['player'] + '</td><td>' + params.progress[i]['computer'] + '</td><td>' + params.progress[i]['result'] + '</td><td>' + params.progress[i]['score']+ '</td></tr>';
    }
  }
};

var hideModal = function(event){
	event.preventDefault();
	document.querySelector('#modal-overlay').classList.remove('show');
};
	
var closeButtons = document.querySelectorAll('.modal .close');
	
for(var i = 0; i < closeButtons.length; i++){
	closeButtons[i].addEventListener('click', hideModal);
}
	
document.querySelector('#modal-overlay').addEventListener('click', hideModal);
	
var modals = document.querySelectorAll('.modal');
	
for(var i = 0; i < modals.length; i++){
	modals[i].addEventListener('click', function(event){
		event.stopPropagation();
	});
}
