<<<<<<< HEAD
let N = 8;
let board = [];
let isDarkTheme = true;
let queensLeft = N;
let history = [];

function createBoard(size) {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    boardElement.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    board = Array.from({ length: size }, () => Array(size).fill(0));
    queensLeft = size;
    updateQueensLeft();
    history = []; // Clear history when creating a new board

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.className = `cell ${(i + j) % 2 === 0 ? 'light' : 'dark'}`;
            cell.addEventListener('click', () => toggleQueen(i, j));
            boardElement.appendChild(cell);
        }
    }
}

function updateBoardSize(value) {
    document.getElementById('boardSizeValue').innerText = value;
    N = parseInt(value);
    updateQueenFontSize(N);
    createBoard(N);
}

function updateQueenFontSize(boardSize) {
    const minSize = 3;
    const maxSize = 12;
    const minFontSize = 1.7;
    const maxFontSize = 3;
    
    const fontSize = maxFontSize - (boardSize - minSize) * (maxFontSize - minFontSize) / (maxSize - minSize);
    document.documentElement.style.setProperty('--queen-font-size', `${fontSize}em`);
}

function toggleQueen(row, col) {
    history.push(board.map(row => [...row])); // Save current state to history
    
    if (board[row][col] === 0 && queensLeft > 0) {
        board[row][col] = 1;
        queensLeft--;
    } else if (board[row][col] === 1) {
        board[row][col] = 0;
        queensLeft++;
    }
    updateQueensLeft();
    drawBoard();
    highlightUnsafeQueens();
}

function updateQueensLeft() {
    document.getElementById('queensLeft').textContent = queensLeft;
}

function drawBoard() {
    const boardElement = document.getElementById('board');
    const cells = boardElement.children;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const cell = cells[i * N + j];
            cell.innerHTML = board[i][j] === 1 ? '♛' : '';
            cell.className = `cell ${(i + j) % 2 === 0 ? 'light' : 'dark'}`;
            cell.style.color = 'black';
        }
    }
}

function highlightUnsafeQueens() {
    const boardElement = document.getElementById('board');
    const unsafePositions = new Set();

    // Find unsafe positions
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (board[i][j] === 1) {
                // Check row and column
                for (let k = 0; k < N; k++) {
                    if (k !== j) unsafePositions.add(`${i},${k}`);
                    if (k !== i) unsafePositions.add(`${k},${j}`);
                }

                // Check diagonals
                for (let k = 1; k < N; k++) {
                    if (i + k < N && j + k < N) unsafePositions.add(`${i+k},${j+k}`);
                    if (i + k < N && j - k >= 0) unsafePositions.add(`${i+k},${j-k}`);
                    if (i - k >= 0 && j + k < N) unsafePositions.add(`${i-k},${j+k}`);
                    if (i - k >= 0 && j - k >= 0) unsafePositions.add(`${i-k},${j-k}`);
                }
            }
        }
    }

    // Highlight unsafe queens
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const cell = boardElement.children[i * N + j];
            if (board[i][j] === 1 && unsafePositions.has(`${i},${j}`)) {
                cell.classList.add('unsafe');
            } else {
                cell.classList.remove('unsafe');
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

    return true;
}

function solve() {
    history.push(board.map(row => [...row])); // Save current state to history
    createBoard(N);
    if (solveNQUtil(0)) {
        drawBoard();
        queensLeft = 0;
        updateQueensLeft();
        highlightUnsafeQueens(); // This will actually do nothing for a solved board
    } else {
        alert("Solution does not exist");
    }
}

function resetBoard() {
    history.push(board.map(row => [...row])); // Save current state to history
    createBoard(N);
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('light-theme', !isDarkTheme);
    document.body.classList.toggle('dark-theme', isDarkTheme);
}

function undo() {
    if (history.length > 0) {
        board = history.pop();
        drawBoard();
        highlightUnsafeQueens();
        queensLeft = N - board.flat().filter(cell => cell === 1).length;
        updateQueensLeft();
    }
}

window.onload = function() {
    createBoard(N);
    updateQueenFontSize(N);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.body.classList.toggle('dark-theme', isDarkTheme);
    document.getElementById('undoBtn').addEventListener('click', undo);
    document.body.classList.toggle('dark-theme', isDarkTheme);
=======
let N = 8;
let board = [];
let isDarkTheme = true;
let queensLeft = N;

function createBoard(size) {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(${size}, 50px)`;

    board = Array.from({ length: size }, () => Array(size).fill(0));
    queensLeft = size;
    updateQueensLeft();

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.className = `cell ${(i + j) % 2 === 0 ? 'light' : 'dark'}`;
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
    if (board[row][col] === 0 && queensLeft > 0) {
        board[row][col] = 1;
        queensLeft--;
    } else if (board[row][col] === 1) {
        board[row][col] = 0;
        queensLeft++;
    }
    updateQueensLeft();
    drawBoard();
    highlightUnsafeQueens();
}

function updateQueensLeft() {
    document.getElementById('queensLeft').textContent = queensLeft;
}

function drawBoard() {
    const boardElement = document.getElementById('board');
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const cell = boardElement.children[i * N + j];
            cell.innerHTML = board[i][j] === 1 ? '♛' : '';
            cell.className = `cell ${(i + j) % 2 === 0 ? 'light' : 'dark'}`;
            cell.style.color = 'black';
        }
    }
}

function highlightUnsafeQueens() {
    const boardElement = document.getElementById('board');
    const unsafePositions = new Set();

    // Find unsafe positions
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (board[i][j] === 1) {
                // Check row and column
                for (let k = 0; k < N; k++) {
                    if (k !== j) unsafePositions.add(`${i},${k}`);
                    if (k !== i) unsafePositions.add(`${k},${j}`);
                }

                // Check diagonals
                for (let k = 1; k < N; k++) {
                    if (i + k < N && j + k < N) unsafePositions.add(`${i+k},${j+k}`);
                    if (i + k < N && j - k >= 0) unsafePositions.add(`${i+k},${j-k}`);
                    if (i - k >= 0 && j + k < N) unsafePositions.add(`${i-k},${j+k}`);
                    if (i - k >= 0 && j - k >= 0) unsafePositions.add(`${i-k},${j-k}`);
                }
            }
        }
    }

    // Highlight unsafe queens
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const cell = boardElement.children[i * N + j];
            if (board[i][j] === 1 && unsafePositions.has(`${i},${j}`)) {
                cell.classList.add('unsafe');
            } else {
                cell.classList.remove('unsafe');
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

    return true;
}

function solve() {
    createBoard(N);
    if (solveNQUtil(0)) {
        drawBoard();
        queensLeft = 0;
        updateQueensLeft();
        highlightUnsafeQueens(); // This will actually do nothing for a solved board
    } else {
        alert("Solution does not exist");
    }
}

function resetBoard() {
    createBoard(N);
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme', isDarkTheme);
}

window.onload = function() {
    createBoard(N);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.body.classList.add('dark-theme');
>>>>>>> e5e02edc32de0e655112da02176603b3582fd190
};