const MAX_ELEMENTS = 5;
const gameBoard = [];
let minIndex = 0;
let maxIdnex = 4;
let planeCol = 2;

//create game box
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
    if (row === 2 && col === 2) {
        element.id = 'plane';
    }
}

createGameBoard();

function movePlane(button) {
    if (button.id === 'left' && planeCol > 0) {
        gameBoard[2][planeCol].removeAttribute('id');
        gameBoard[2][--planeCol].id = 'plane';
    } else if (button.id === 'right' && planeCol < 4) {
        gameBoard[2][planeCol].removeAttribute('id');
        gameBoard[2][++planeCol].id = 'plane';
    }
}
