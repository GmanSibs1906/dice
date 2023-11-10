// state
let scores, currentScore, activePlayer, playing;

// elements
const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');
const currentScoreElement = document.getElementById('current-score');
const rollDiceButton = document.getElementById('roll-dice');
const holdButton = document.getElementById('hold');
const newGameButton = document.getElementById('new-game');


// init function
function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    player1ScoreElement.textContent = 'Player 1 Score: 0';
    player2ScoreElement.textContent = 'Player 2 Score: 0';
    currentScoreElement.textContent = 'Current Score: 0';

    document.getElementById('dice').src = './7.gif';
}

// player switch function
function switchPlayer() {
    currentScore = 0;
    currentScoreElement.textContent = `Current Score: ${currentScore}`;
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.getElementById('game-container').classList.toggle('player-1-turn');
    document.getElementById('game-container').classList.toggle('player-2-turn');
}

// listeners
rollDiceButton.addEventListener('click', function () {
    if (playing) {
        const dice = Math.floor(Math.random() * 6) + 1;
        const diceImage = `./${dice}.png`;

        document.getElementById('dice').src = diceImage;

        if (dice !== 1) {
            currentScore += dice;
            currentScoreElement.textContent = `Current Score: ${currentScore}`;
        } else {
            switchPlayer();
        }
    }
});

holdButton.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`player${activePlayer + 1}-score`).textContent = `Player ${activePlayer + 1} Score: ${scores[activePlayer]}`;

        if (scores[activePlayer] >= 20) {
            playing = false;
            currentScoreElement.textContent = 'Player ' + (activePlayer + 1) + ' wins!';
            document.getElementById('game-container').classList.remove('player-1-turn', 'player-2-turn');
        } else {
            switchPlayer();
        }
    }
});

newGameButton.addEventListener('click', init);

// start the game
init();
