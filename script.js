let N = 8;
let board = [];

function createBoard(size) {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(${size}, 50px)`;

    board = Array.from({ length: size }, () => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.className = `cell ${(i + j) % 2 === 0 ? 'white' : 'gray'}`;
            cell.addEventListener('click', () => {
                toggleQueen(i, j);
                markSafe();
            });
            boardElement.appendChild(cell);
        }
    }
}

function updateBoardSize(value) {
    document.getElementById('boardSizeValue').innerText = value;
    N = parseInt(value);
    createBoard(N);
}

function toggleQueen(row, col) {
    board[row][col] = 1 - board[row][col];  // Toggle the queen on or off
    drawBoard();
    markSafe();
}

function drawBoard() {
    const boardElement = document.getElementById('board');
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const cell = boardElement.children[i * N + j];
            cell.innerHTML = board[i][j] === 1 ? '<img src="assets/images/queen.png" height="30px" />' : '';
            cell.style.backgroundColor = (i + j) % 2 === 0 ? 'white' : 'gray';
        }
    }
}

function isSafe(row, col) {
    for (let i = 0; i < N; i++) {
        if (board[row][i] === 1 || board[i][col] === 1) return false;
    }

    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false;
    }

    for (let i = row, j = col; i < N && j >= 0; i++, j--) {
        if (board[i][j] === 1) return false;
    }

    for (let i = row, j = col; i >= 0 && j < N; i--, j++) {
        if (board[i][j] === 1) return false;
    }

    for (let i = row, j = col; i < N && j < N; i++, j++) {
        if (board[i][j] === 1) return false;
    }

    return true;
}

function markSafe() {
    const boardElement = document.getElementById('board');
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const cell = boardElement.children[i * N + j];
            if (isSafe(i, j) || board[i][j]===1) {
                cell.style.backgroundColor = (i + j) % 2 === 0 ? 'white' : '#585858';
            } else {
                cell.style.backgroundColor = (i + j) % 2 === 0 ? '#E9967A' : '#A52A2A';
            }
        }
    }
}

function solveNQUtil(col) {
    if (col >= N) return true;

    for (let i = 0; i < N; i++) {
        if (isSafe(i, col)) {
            board[i][col] = 1;
            if (solveNQUtil(col + 1)) return true;
            board[i][col] = 0;
        }
    }

    return false;
}

function solve() {
    createBoard(N)
    if (solveNQUtil(0)) {
        drawBoard();
    } else {
        alert("Solution does not exist");
    }
}

function resetBoard() {
    createBoard(N);
}

window.onload = function() {
    createBoard(N);
};
