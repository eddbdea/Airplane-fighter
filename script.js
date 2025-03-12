const MAX_ELEMENTS = 5;
const gameBoard = [];
const MAX_ASTEROIDS = 2;
const THREE_SECONDS = 3000;
const FOUR_HUNDRED_MS = 400;
const ONE_SECOND = 1000;
let planeCol = 2;
let score = 0;
let sameLane = true;
let colIndex = 0;
let rowIndex = 0;

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
window.addEventListener("keydown", movePlane);

function movePlane(event) {
    if (event.keyCode == '37' && planeCol > 0) {
        gameBoard[MAX_ELEMENTS - 1][planeCol].removeAttribute('id');
        gameBoard[MAX_ELEMENTS - 1][--planeCol].id = 'plane';
    } else if (event.keyCode == '39' && planeCol < MAX_ELEMENTS - 1) {
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
}

function moveObstacles() {
    const status = checkGameStatus(colIndex);
    if (rowIndex < MAX_ELEMENTS - 1 && status === true &&
        gameBoard[rowIndex][colIndex].id === 'obstacle') {
        if (gameBoard[rowIndex + 1][colIndex].id === 'projectile') {
            scoreUpdate();
            gameBoard[rowIndex + 1][colIndex].removeAttribute('id');
            gameBoard[rowIndex][colIndex].removeAttribute('id');
        } else {
            gameBoard[rowIndex][colIndex].removeAttribute('id');
            gameBoard[++rowIndex][colIndex].id = 'obstacle'; 
        }
    }
}

function avoidedObstacles() {
    for (let col = 0; col < MAX_ELEMENTS; ++col) {
        if (gameBoard[MAX_ELEMENTS - 1][col].id === 'obstacle') {
            scoreUpdate();
            gameBoard[MAX_ELEMENTS - 1][col].removeAttribute('id');
        }
    }
}

function checkFirstRow() {
    for (let col = 0; col < MAX_ELEMENTS; ++col) {
        if(gameBoard[0][col].id === 'projectile') {
           gameBoard[0][col].removeAttribute('id');
        }
    }
}

function checkGameStatus(col) {
    if (gameBoard[MAX_ELEMENTS - 1][col].id === 'plane' && 
        gameBoard[MAX_ELEMENTS - 2][col].id === 'obstacle') {
        finalScore();
        clearInterval(obstacleCreate);
        clearInterval(projectileAndObstacle);
        clearInterval(lastRow);
        restartGameButton();
        window.removeEventListener("keydown", createProjectile);
        window.removeEventListener("keydown", movePlane);
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
}

window.addEventListener("keydown", createProjectile);

function createProjectile(event) {
    if (event.keyCode == '32') {
        const startingRow = 3;
        const projectileCol = planeCol;
        gameBoard[startingRow][projectileCol].id = 'projectile';
    }
}

function shootProjectile() {
    for (let row = 0; row <= 2; ++row) {
        for (let col = 0; col < MAX_ELEMENTS; ++col) {
            if (gameBoard[row + 1][col].id === 'projectile') {
                gameBoard[row + 1][col].removeAttribute('id');
                if (gameBoard[row][col].id === 'obstacle') {
                    scoreUpdate();
                    gameBoard[row][col].removeAttribute('id');
                } else {
                    gameBoard[row][col].id = 'projectile'; 
                }
            }
        }
    }
}

const obstacleCreate = setInterval(createObstacle, THREE_SECONDS); 
const projectileAndObstacle = setInterval(function () {
    shootProjectile();
    moveObstacles();
}, FOUR_HUNDRED_MS);
const lastRow = setInterval(avoidedObstacles, ONE_SECOND); 
const firstRow = setInterval(checkFirstRow, ONE_SECOND); 