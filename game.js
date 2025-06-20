let boxes = document.querySelectorAll('.box2');
let btn = document.querySelector('.btn');
let msgContainer = document.querySelector('.msg-container');
let wmsg = document.querySelector("#msg");
let newbtn = document.querySelector('.btn-new');
let turnX = true;  // player x or player 0
let count = 0;
console.log(boxes)  // array of boxes

let warr = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
[0, 3, 6], [1, 4, 7], [2, 5, 8],
[0, 4, 8], [2, 4, 6]];  // 2D array for winning combinations in tic tac toe
console.log(warr[7][2]); // 6
console.log(btn.innerText); // 6

boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (turnX)  // like this it will consider true only --> turn === true
        { // playerX
            box.style.color="Red"
            box.innerText = "X";
            console.log(box.innerText)
            box.disabled = true;  // after assigning the value to box
            turnX = false;


        }
        else { // player0
            box.style.color="Green"
            box.innerText = "0"
            console.log(box.innerText)
            box.disabled = true;  // after assigning the value to box
            turnX = true;
        }
        count++;

        // console.log(checkWinner());

        if (count == 9 && checkWinner()==="true") {
            wmsg.innerText = "Winner";
            msgContainer.classList.remove("hide");
        }
        if(count == 9 && !checkWinner()){
            wmsg.innerText = "Game Draw";
            msgContainer.classList.remove("hide");
        }
        else{
            checkWinner();
        }
        console.log("count", count)
    })

})


const resetGame = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const disableBoxes = () => {  // disabling the buttons after winner is decided
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {  // enabling the buttons for new game or reset
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = " ";  // removing the values of box for reset 
    }
}
const showWinner = (gameWinner) => {
    wmsg.innerText = `Congrats !!! ${gameWinner} is Winner`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let wpattern of warr) {  // same element (X or Y) in all 3 positions and matches with the winning pattern
        console.log(wpattern)
        console.log(wpattern[0], wpattern[1], wpattern[2]) // extraxting individual elements(index) from each winning array vertically ex: [0] --> all 0th element of array vertical position
        console.log(boxes[wpattern[0]].innerText, boxes[wpattern[1]].innerText, boxes[wpattern[2]].innerText) // innerText for each winning array box
        // if(wpattern[0]==="X" wpattern[1],wpattern[2])
        let pos1Val = boxes[wpattern[0]].innerText;
        let pos2Val = boxes[wpattern[1]].innerText;
        let pos3Val = boxes[wpattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            // to check if no 0 or X is not there then no winner
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner is", pos1Val)
                showWinner(pos1Val)
                return true;
            }
        }
    }

    

};
btn.addEventListener("click", resetGame);  // Reset Button   // putting in end so that there is no reference error for accessing before initialization as they are arrow function and act as var
newbtn.addEventListener("click", resetGame);  // Reset Button
