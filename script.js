let N = 4;
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
            cell.addEventListener('click', () => toggleQueen(i, j));
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
    board[row][col] = 1 - board[row][col];
    drawBoard();
}

function drawBoard() {
    const boardElement = document.getElementById('board');
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const cell = boardElement.children[i * N + j];
            cell.innerText = board[i][j] === 1 ? 'Q' : '';
        }
    }
}

function isSafe(row, col) {
    for (let i = 0; i < col; i++) {
        if (board[row][i]) return false;
    }

    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) return false;
    }

    for (let i = row, j = col; j >= 0 && i < N; i++, j--) {
        if (board[i][j]) return false;
    }

    return true;
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
