const MAX_ELEMENTS = 5;
const gameBoard = [];
const MAX_ASTEROIDS = 2;
let planeCol = 2;
let colIndex = 0;
let rowIndex = 0;
let score = 0;

//create game box matrix (2D array)
function createGameBoard() {
    for (let row = 0; row < MAX_ELEMENTS; ++row) {
        gameBoard[row] = []; //creates an empty array;
        for (let col = 0; col < MAX_ELEMENTS; ++col) {
            const objectHolder = document.createElement('div');
            objectHolder.classList.add('col');
            createPlane(row, col, objectHolder);
            gameBoard[row][col] = objectHolder;
            document.getElementById('game').appendChild(objectHolder);
        }
    }
}

function createPlane(row, col, element) {
    if (row === MAX_ELEMENTS - 1 && col === 2) {
        element.id = 'plane';
    }
}

createGameBoard();

function movePlane(button) {
    if (button.id === 'left' && planeCol > 0) {
        gameBoard[MAX_ELEMENTS - 1][planeCol].removeAttribute('id');
        gameBoard[MAX_ELEMENTS - 1][--planeCol].id = 'plane';
    } else if (button.id === 'right' && planeCol < MAX_ELEMENTS - 1) {
        gameBoard[MAX_ELEMENTS - 1][planeCol].removeAttribute('id');
        gameBoard[MAX_ELEMENTS - 1][++planeCol].id = 'plane';
    }
}

function randomNumber() {
    return Math.floor(Math.random() * MAX_ELEMENTS); 
}

function createObstacle() {
    colIndex = randomNumber();
    rowIndex = 0;
    gameBoard[rowIndex][colIndex].id = 'obstacle';
    scoreUpdate();
}

function moveObstacles() {
    const status = checkGameStatus(colIndex);
    gameBoard[rowIndex][colIndex].removeAttribute('id');
    if (rowIndex < MAX_ELEMENTS - 1 && status === true) {
        gameBoard[++rowIndex][colIndex].id = 'obstacle';
    }
}

function checkLastRow() {
    for (let col = 0; col < MAX_ELEMENTS; ++col) {
        if (gameBoard[MAX_ELEMENTS - 1][col].id === 'obstacle') {
            gameBoard[MAX_ELEMENTS - 1][col].removeAttribute('id');
        }
    }
}

function checkGameStatus(col) {
    if (gameBoard[MAX_ELEMENTS - 1][col].id === 'plane' && 
        gameBoard[MAX_ELEMENTS - 2][col].id === 'obstacle') {
        finalScore();
        clearInterval(obstacleCreate);
        clearInterval(moveObstacle);
        clearInterval(lastRow);
        restartGameButton();
        return false;
    }
    return true;
}

function finalScore() {
    const finalScore = document.createElement('h2');
    finalScore.innerText = 'You lost! Final score: ' + score;
    document.getElementById('final-score').appendChild(finalScore);
}

function scoreUpdate() {
    ++score;
    document.getElementById('score').innerText = 'SCORE: ' + score;
}

function restartGameButton() {
    const playAgain = document.createElement('button');
    playAgain.classList.add('btn', 'btn-danger');
    playAgain.addEventListener('click', function(e) {
        location.reload();
    })
    playAgain.innerText = 'Play again!';
    document.getElementById('restart-button').appendChild(playAgain);
    document.getElementById('left').style.display = 'none';
    document.getElementById('right').style.display = 'none';
}

let obstacleCreate = setInterval(createObstacle, 1000);
let moveObstacle = setInterval(moveObstacles, 200);
let lastRow = setInterval(checkLastRow, 500);