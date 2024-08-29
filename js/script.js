let currentPlayer = 'X';
let gameActive = true;
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

function handleClick(event) {
    const cell = event.target;
    if (cell.textContent === '' && gameActive) {
        cell.textContent = currentPlayer;
        if (checkWinner()) {
            message.textContent = `${currentPlayer} wins!`;
            gameActive = false;
        } else if (isDraw()) {
            message.textContent = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    return winPatterns.some(pattern => {
        return cells[pattern[0]].textContent === currentPlayer &&
               cells[pattern[1]].textContent === currentPlayer &&
               cells[pattern[2]].textContent === currentPlayer;
    });
}

function isDraw() {
    return Array.from(cells).every(cell => cell.textContent !== '');
}

function resetGame() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
document.getElementById('resetButton').addEventListener('click', resetGame);