'use strict';
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//Starting conditions

let playing, activePlayer, scores, currentScore;
const initialize = function () {
  playing = true;
  activePlayer = 0;
  scores = [0, 0];
  currentScore = 0;

  score0El.textContent = '0';
  score1El.textContent = '0';
  current0El.textContent = '0';
  current1El.textContent = '0';

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const resetGame = function () {
  currentScore = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
};

initialize();
//Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Diplaying dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. If dice does not rolls 1 add the value of dice to the current else switch players
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add the currentScore of activePlayer to the totalScore
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.Check if the player's score is >=100
    //Finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3.swich player
      switchPlayer();
    }
  }
});

//Yo chai mero paaraale/////////////////////
/*
btnNew.addEventListener('click', function () {
  
  resetGame();
  if (playing) {
    if (player1El.classList.contains('player--active')) {
      switchPlayer();
    }
  } else {
    playing = true;
    resetGame();
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
    activePlayer = 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
  }
});
*/

btnNew.addEventListener('click', initialize);
