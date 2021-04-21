const cellElements = document.querySelectorAll('[data-cell]');
let circleTurn
const X_class ='x';
const Circle_class = 'circle';
const board = document.querySelector('.board');
const winningMessage = document.querySelector('[data-wining-message-text]');
const winningMessageElement = document.querySelector('.winning-message');
const restartButton = document.querySelector('.restart-button');
const winningCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
startGame()

function startGame(){

    circleTurn = false;
    cellElements.forEach(cell =>{
        cell.classList.remove(Circle_class)
        cell.classList.remove(X_class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once:true})
    })
    setBoardHover()
    winningMessageElement.classList.remove('show');

}

function handleClick (e){
    const cell = e.target;
    console.log(circleTurn);
    const currentClass = circleTurn ? Circle_class : X_class ;
    placeMark(cell , currentClass);
    if(checkWin(currentClass)){
        endGame(false);
    }
    else if(isDraw()){
        endGame(true)
    }
    else {
    swapTurns();
    setBoardHover();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn =!circleTurn;
}

function setBoardHover(){
    board.classList.remove(X_class);
    board.classList.remove(Circle_class);

    if (circleTurn) {
        board.classList.add(Circle_class);
    }
    else {
        board.classList.add(X_class)
    }
}

function checkWin(currentClass){
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
} 

function endGame(draw){
    if(draw) {
        winningMessage.innerText = "Draw"
    }
    else{
        winningMessage.innerText = `${circleTurn ? "O": "X"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_class) || cell.classList.contains(Circle_class)
    })
}

restartButton.addEventListener('click', startGame);


