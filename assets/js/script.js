const menu = document.querySelector('.circular-menu');
const items = menu.querySelectorAll('.circular-menu-item');
const button = menu.querySelector('.start-button');
const rulesImage = document.querySelector('.game-rules');
const showResults = document.querySelector('.show-results');
const scoreboard = document.querySelector('.scoreboard');
const userScore = document.querySelector('.user-score');
const compScore = document.querySelector('.computer-score');


const arrChoices = [
    [1, 1, 0], [1, 2, 1], [1, 3, -1], [1, 4, 1], [1, 5, -1], 
    [2, 1, -1], [2, 2, 0], [2, 3, 1], [2, 4, 1], [2, 5, -1],
    [3, 1, 1], [3, 2, -1], [3, 3, 0], [3, 4, -1], [3, 5, 1],
    [4, 1, -1], [4, 2, -1], [4, 3, 1], [4, 4, 0], [4, 5, 1],
    [5, 1, 1], [5, 2, 1], [5, 3, -1], [5, 4, -1], [5, 5, 0]                
  ]; 

let length = items.length;
const radius = 50;
let flagAgain = 0;

function startGame() {   

        for (let item of items) {
            item.classList.remove("circular-menu-item");
            item.classList.add("menu-item-hidden"); 
        } 

        length = 3;        
        const arc = 2* Math.PI * (1 / length);

        // console.log(length);

        for (let i=0; i < length; i++) {
            const angle = i * arc;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            items[i].style.left = 50 + x + '%';
            items[i].style.top = 50 + y + '%';
            items[i].classList.remove("menu-item-hidden");
            items[i].classList.add("circular-menu-item"); 
            //console.log(items[i]);
           
        }  
      
    for (let i=0; i < length; i++) {
   
        items[i].classList.remove("menu-item-hidden");
        items[i].classList.add("circular-menu-item");

        // console.log("Item", item); 
        }

        if(flagAgain === 0) {
            ShowHideItems();         
            playGame();
        } else {
            hideResults();
            playGame();
            //console.log("aaa");
            
        }   
} 



 function hideResults() {    
       
    button.id = "circular-menu-item-hidden";
    showResults.id = "show-results-hidden";

    for (let i=0; i < length; i++) {
       
            items[i].classList.remove("menu-item-hidden");
            items[i].classList.add("circular-menu-item");

            console.log("Item", item[i]);
       
    }   

} 


function ShowHideItems() {
    button.id = 'circular-menu-item-hidden';
    rulesImage.id = 'game-rules-hidden'; 
    showResults.id = "show-results-hidden";   
    menu.style.marginTop = "100px";      
}

function playGame() {
    
    let items = document.getElementsByClassName("circular-menu-item");
   
     for (let item of items) {
        item.addEventListener("click", function() {
        
            console.log("ccc ", item);
           
            userChoice = item.id;

            console.log("userChoice", userChoice);

            compChoice = computerChoice();

            result = calculateResult(userChoice, compChoice);

                       
            
        });           
    };         
        
}


function computerChoice() {
    let compChoice = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    return compChoice;
}



function calculateResult(userChoiceFP, compChoiceFP) {    
   
    for(let i=0; i<arrChoices.length; i++) {  
        
        if(parseInt(userChoiceFP) === arrChoices[i][0] && compChoiceFP === arrChoices[i][1]) {
            console.log(" User "  + userChoiceFP + " Comp " + compChoiceFP + " Result " + arrChoices[i][2]);
            return arrChoices[i][2];
        }        
    
    }
    
}