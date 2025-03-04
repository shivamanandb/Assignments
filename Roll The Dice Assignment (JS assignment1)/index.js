// Game State Variables
let currentPlayer = 1;
let player1CurrentScore = 0;
let player1SavedScore = 0;
let player2CurrentScore = 0;
let player2SavedScore = 0;
let gameActive = true;

// DOM Elements
const player1Section = document.getElementById('player1');
const player2Section = document.getElementById('player2');
const player1NameInput = document.getElementById('player1-name');
const player2NameInput = document.getElementById('player2-name');
const player1CurrentScoreEl = document.getElementById('player1-current-score');
const player1SavedScoreEl = document.getElementById('player1-saved-score');
const player2CurrentScoreEl = document.getElementById('player2-current-score');
const player2SavedScoreEl = document.getElementById('player2-saved-score');
const diceEl = document.getElementById('dice');
const rollBtn = document.getElementById('roll-btn');
const saveBtn = document.getElementById('save-btn');
const resetBtn = document.getElementById('reset-btn');
const winnerMessageEl = document.getElementById('winner-message');
const winnerTextEl = document.getElementById('winner-text');

// Roll Dice Function
function rollDice() {
    // console.log('Rolling dice...');
    if (!gameActive) return;

    const diceRoll = Math.floor(Math.random() * 6) + 1;
    
    if(diceRoll === 1) 
        diceEl.style.transform = `rotatex(${180}deg) rotatey(${180}deg) rotatez(${180}deg)`;
    else if(diceRoll === 2) 
        diceEl.style.transform = `rotatex(${360}deg) rotatey(${180}deg) rotatez(${0}deg)`;
    else if(diceRoll === 3) 
        diceEl.style.transform = `rotatex(${-180}deg) rotatey(${270}deg) rotatez(${0}deg)`;
    else if(diceRoll === 4) 
        diceEl.style.transform = `rotatex(${0}deg) rotatey(${-90}deg) rotatez(${0}deg)`;
    else if(diceRoll === 5) 
        diceEl.style.transform = `rotatex(${-90}deg) rotatey(${0}deg) rotatez(${0}deg)`;
    else if(diceRoll === 6) 
        diceEl.style.transform = `rotatex(${90}deg) rotatey(${0}deg) rotatez(${0}deg)`;
    if (diceRoll === 1) {
        // Reset current score and switch player
        if (currentPlayer === 1) {
            player1CurrentScore = 0;
            player1CurrentScoreEl.textContent = '0';
        } else {
            player2CurrentScore = 0;
            player2CurrentScoreEl.textContent = '0';
        }
        switchPlayer();
    } else {
        // Add dice roll to current score
        if (currentPlayer === 1) {
            player1CurrentScore += diceRoll;
            player1CurrentScoreEl.textContent = player1CurrentScore;
        } else {
            player2CurrentScore += diceRoll;
            player2CurrentScoreEl.textContent = player2CurrentScore;
        }
    }
}

// Save Score Function
function saveScore() {
    if (!gameActive) return;

    if (currentPlayer === 1) {
        player1SavedScore += player1CurrentScore;
        player1SavedScoreEl.textContent = player1SavedScore;
        player1CurrentScore = 0;
        player1CurrentScoreEl.textContent = '0';

        // Check for win condition
        if (player1SavedScore >= 100) {
            announceWinner(player1NameInput.value);
            return;
        }
    } else {
        player2SavedScore += player2CurrentScore;
        player2SavedScoreEl.textContent = player2SavedScore;
        player2CurrentScore = 0;
        player2CurrentScoreEl.textContent = '0';

        // Check for win condition
        if (player2SavedScore >= 100) {
            announceWinner(player2NameInput.value);
            return;
        }
    }
    switchPlayer();
}

// Switch Player Function
function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    player1Section.classList.toggle('active');
    player2Section.classList.toggle('active');
}

// Announce Winner Function
function announceWinner(playerName) {
    gameActive = false;
    winnerTextEl.textContent = `${playerName} wins!`;
    winnerMessageEl.style.display = 'block';
    rollBtn.disabled = true;
    saveBtn.disabled = true;
}

// Reset Game Function
function resetGame() {
    currentPlayer = 1;
    player1CurrentScore = 0;
    player1SavedScore = 0;
    player2CurrentScore = 0;
    player2SavedScore = 0;
    gameActive = true;

    player1CurrentScoreEl.textContent = '0';
    player1SavedScoreEl.textContent = '0';
    player2CurrentScoreEl.textContent = '0';
    player2SavedScoreEl.textContent = '0';
    diceEl.style.transform = `rotateX(${-30}deg) rotateY(${137}deg) rotateZ(${0}deg)`;

    player1Section.classList.add('active');
    player2Section.classList.remove('active');
    winnerMessageEl.style.display = 'none';
    rollBtn.disabled = false;
    saveBtn.disabled = false;
}

// Event Listeners
rollBtn.addEventListener('click', rollDice);
saveBtn.addEventListener('click', saveScore);
resetBtn.addEventListener('click', resetGame);