const menu = document.querySelector('.circular-menu');
const items = menu.querySelectorAll('.circular-menu-item');
const button = menu.querySelector('.start-button');
const rulesImage = document.querySelector('.game-rules');  
const whoWonContainer = document.getElementById("who-won");
const finalResults = document.querySelector('.show-results');
const levelText = document.querySelector('.level-text');
const scoreboard = document.querySelector('.scoreboard');
const userScore = document.querySelector('.user-score');
const compScore = document.querySelector('.computer-score');
const popUpLevel = document.querySelector('.popup-level');
const popupLevelMessage = document.querySelector('.popup-level-message');
const levelUpHide = document.getElementById('level-up-button');

let level = 1;
let flagItems = 1;
let userCounter = 0;
let compCounter = 0;
let flagAgain = 0;

let length = items.length;
const radius = 50;

// Wait for the DOM to finish loading before running the game
// Get event listeners for the game items

document.addEventListener("DOMContentLoaded", function(){
    for (let item of items) { 
        item.addEventListener("click", menuItemClick);
    }    
});

/**
 * Array containing as 1st element user choice, 
 * 2nd element computer choice and
 * 3rd element the result
 * 
 */

const arrChoices = [
    [1, 1, 0], [1, 2, 1], [1, 3, -1], [1, 4, 1], [1, 5, -1], 
    [2, 1, -1], [2, 2, 0], [2, 3, 1], [2, 4, 1], [2, 5, -1],
    [3, 1, 1], [3, 2, -1], [3, 3, 0], [3, 4, -1], [3, 5, 1],
    [4, 1, -1], [4, 2, -1], [4, 3, 1], [4, 4, 0], [4, 5, 1],
    [5, 1, 1], [5, 2, 1], [5, 3, -1], [5, 4, -1], [5, 5, 0]                
  ]; 

// Resets all options on restarting the game

function restartGame() {
    level = 1;
    flagItems = 1;
    userCounter = 0;
    compCounter = 0;
    flagAgain = 0; 
    userCounter = 0;
    compCounter = 0;
    userScore.innerText = userCounter; 
    compScore.innerText = compCounter;
    levelText.innerText = "Level 1";     
    finalResults.id = "show-results-hidden";   

    closePopup();    
    startGame();
}

// The main game function calls other functions and checkes if this is an initial game or repeated game

function startGame() { 

    setNumberOfItems(); 
    
    if(flagAgain === 0) {
        ShowHideSections();         
        checkLevel();
    } else {
        hideResults();
        checkLevel();
        closePopup();       
    }    
}

// Sets the number of game items depending on the game level  
   
function setNumberOfItems() {
    if(level === 1) {         
    
        hideGameItems();

        length = 3;        
        const arc = 2* Math.PI * (1 / length);      

        for (let i=0; i < length; i++) {
            const angle = i * arc + 100;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            items[i].style.left = 50 + x + '%';
            items[i].style.top = 50 + y + '%';
            showGameItems();          
        }  

    } else if(level === 2) {       
       
        levelText.innerText = "Level 2";          

        hideGameItems();

        length = 4;        
        const arc = 2* Math.PI * (1 / length);

         for (let i=0; i < length; i++) {
            const angle = i * arc + 150;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            items[i].style.left = 50 + x + '%';
            items[i].style.top = 50 + y + '%';
            showGameItems();           
        }  
    } else if(level === 3) { 

        levelText.innerText = "Level 3";
        
        hideGameItems();

        length = 5;        
        const arc = 2* Math.PI * (1 / length);
        
        for (let i=0; i < length; i++) {
            const angle = i * arc + 175;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            items[i].style.left = 50 + x + '%';
            items[i].style.top = 50 + y + '%';
            showGameItems();
        }  

    } else {
        gameOver();
    }

}

// Function to hide results window

 function hideResults() {    
       
    button.id = "circular-menu-item-hidden";
    finalResults.id = "show-results-hidden";

    showGameItems();

} 

/* Check and change game level
Reset user score and computer score */

function checkLevel() {         

    if (level === 1 && flagItems === 1)   {            
        
        flagItems++;    
                      
    } else if(level === 2 && flagItems === 2) {                   
   
        userCounter = 0;
        compCounter = 0;
        userScore.innerText = userCounter; 
        compScore.innerText = compCounter;  

        flagItems++;    

    } else if(level === 3 && flagItems === 3) {          
   
        userCounter = 0;
        compCounter = 0;
        userScore.innerText = userCounter; 
        compScore.innerText = compCounter;  

        flagItems++;    

    }  else {
        gameOver();
    }
}

// Function to show sections for next game page

function ShowHideSections() {
    button.id = 'circular-menu-item-hidden';
    rulesImage.id = 'game-rules-hidden';      
    menu.style.marginTop = "100px"; 
    levelText.style.display = "block"; 
    scoreboard.style.display = "block";     
}

/**
 * Checks the user choice and call functions to get computer choice, 
 * calculate result and show who won 
 */

function menuItemClick() {               
                
    userChoice = this.id;

    compChoice = computerChoice(level);

    result = calculateResult(userChoice, compChoice);

    whoWon = showResult(userChoice, compChoice); 
}  

/* Get a random game items from available amount for the current level */

function computerChoice(level) {
    if(level === 1) {        
        let compChoice = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    return compChoice;
    } else if(level === 2) {
        let compChoice = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    return compChoice;
    } else if(level === 3) {
        let compChoice = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    return compChoice;
    }    
}

/**
 * Сompares the user's choice with the 1st element of the array and 
 * the computer's choice with the 2nd element
 * and returns the 3rd element as the result
 */


function calculateResult(userChoiceFP, compChoiceFP) {    
   
    for(let i=0; i<arrChoices.length; i++) {  
        
        if(parseInt(userChoiceFP) === arrChoices[i][0] && compChoiceFP === arrChoices[i][1]) {            
            return arrChoices[i][2];
        }        
    
    }
    
}

// Function shows window with both choices and game result

function showResult(userChoiceRes, compChoiceRes) {    

    let userId = userChoiceRes;
    let compId = compChoiceRes.toString();

    let userChoiceFigure = document.getElementById(userId).innerHTML;    

    let userContainer = document.getElementById("user-choice");
    userContainer.innerHTML = `<h2>Your choice</h2> <br> ${userChoiceFigure}`;

    let compChoiceFigure = document.getElementById(compId).innerHTML;
    let compContainer = document.getElementById("computer-choice");
    
    compContainer.innerHTML = `<h2>Computer choice</h2> <br> ${compChoiceFigure}`;

    for (let item of items) {            
            item.removeAttribute('style');
            
    }

    finalResults.removeAttribute("id");    

    if(result === 1) {    
        whoWonContainer.innerHTML = "<h1>YOU WON!!!</h1>"; 
        userCounter++;  
        userScore.innerText = userCounter; 

    } else if (result === 0) {
        whoWonContainer.innerHTML = "<h1>DRAW</h1>";
        
    } else if (result === -1) {
        whoWonContainer.innerHTML = "<h1>Sorry, you loose...</h1>";        
        compCounter++;  
        compScore.innerText = compCounter;   
    }   
     
    button.id = '';
    button.textContent = "Play again";    

    flagAgain = 1;  
    
    newLevel = setGameLevel(userCounter, compCounter);

}

// Function shows who got score=3 and won
// Calls gameOver function after level 3

function setGameLevel(userCounterNew, compCounterNew) {
    
    if (userCounterNew === 3  && level < 3) {

        popUpLevel.style.display = "block"; 
        levelUpHide.style.display = "block";    
        popupLevelMessage.innerHTML = "<h1>You won 3 times!</h1>";
        level++; 
        button.id = 'circular-menu-item-hidden';
        hideGameItems();        
    

} else if (compCounterNew === 3 && level < 3) {
    popUpLevel.style.display = "block";              
    popupLevelMessage.innerHTML = "<h1>Sorry, you loose...</h1>";
    button.id = 'circular-menu-item-hidden';
    hideGameItems();            


 } else if(compCounterNew === 3 && level >= 3) {        
        gameOver();
        hideGameItems(); 
} else if(userCounterNew === 3 && level >= 3) {
        gameOverWon();
        hideGameItems(); 
}   
}

// Close popup window

function closePopup(){     
    popUpLevel.style.display = "none";     
}

// Functions called after passing the last level

function gameOver() { 
    levelUpHide.style.display = "none"; 
    popUpLevel.style.display = "block";
    popupLevelMessage.innerHTML = "<h1>Game over!</h1>";
    button.id = 'circular-menu-item-hidden';       
}

function gameOverWon() {
    levelUpHide.style.display = "none"; 
    popUpLevel.style.display = "block";
    popupLevelMessage.innerHTML = "<div><b>CONGRADUATIONS!</b></div><br><div><b>You beat the computer!</b></div><br>";
    button.id = 'circular-menu-item-hidden';
    hideGameItems();
}

// Hide and show game items 

function hideGameItems() {
    for (let i=0; i < length; i++) {          
        items[i].classList.remove("circular-menu-item");  
        items[i].classList.add("menu-item-hidden");    
    } 
}

function showGameItems() {
    for (let i=0; i < length; i++) {          
        items[i].classList.remove("menu-item-hidden");  
        items[i].classList.add("circular-menu-item");    
    } 
}