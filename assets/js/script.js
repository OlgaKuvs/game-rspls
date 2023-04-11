const menu = document.querySelector('.circular-menu');
const items = menu.querySelectorAll('.circular-menu-item');
const button = menu.querySelector('.start-button');
const rulesImage = document.querySelector('.game-rules');
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

document.addEventListener("DOMContentLoaded", function(){
    for (let item of items) { 
        item.addEventListener("click", menuItemClick);
    }    
});

const arrChoices = [
    [1, 1, 0], [1, 2, 1], [1, 3, -1], [1, 4, 1], [1, 5, -1], 
    [2, 1, -1], [2, 2, 0], [2, 3, 1], [2, 4, 1], [2, 5, -1],
    [3, 1, 1], [3, 2, -1], [3, 3, 0], [3, 4, -1], [3, 5, 1],
    [4, 1, -1], [4, 2, -1], [4, 3, 1], [4, 4, 0], [4, 5, 1],
    [5, 1, 1], [5, 2, 1], [5, 3, -1], [5, 4, -1], [5, 5, 0]                
  ]; 

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

function startGame() { 

    setNumberOfItems(); 
    
    if(flagAgain === 0) {
        ShowHideSections();         
        checkLevel();
    } else {
        hideResults();
        checkLevel();
        closePopup();        
        //console.log("aaa");
    }    
}
   
function setNumberOfItems() {
    if(level === 1) {  
        
        // console.log("flag 1", userCounter);

        hideGameItems();

        length = 3;        
        const arc = 2* Math.PI * (1 / length);

        //console.log(length);

        for (let i=0; i < length; i++) {
            const angle = i * arc + 100;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            items[i].style.left = 50 + x + '%';
            items[i].style.top = 50 + y + '%';
            showGameItems();
            //console.log(items[i]);
           
        }  

    } else if(level === 2) {        
       

        console.log("flag 2", userCounter);
        
        levelText.innerText = "Level 2";          

        hideGameItems();

        length = 4;        
        const arc = 2* Math.PI * (1 / length);

        console.log(length);

        for (let i=0; i < length; i++) {
            const angle = i * arc + 150;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            items[i].style.left = 50 + x + '%';
            items[i].style.top = 50 + y + '%';
            showGameItems();
            // console.log(items[i]);
           
        }  
    } else if(level === 3) { 

        levelText.innerText = "Level 3";
        
        hideGameItems();

        length = 5;        
        const arc = 2* Math.PI * (1 / length);

        console.log(length);

        for (let i=0; i < length; i++) {
            const angle = i * arc + 45;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            items[i].style.left = 50 + x + '%';
            items[i].style.top = 50 + y + '%';
            showGameItems();
            //console.log(items[i]);
           
        }  

    } else {
        gameOver();
    }

}


 function hideResults() {    
       
    button.id = "circular-menu-item-hidden";
    finalResults.id = "show-results-hidden";

    showGameItems();

} 

function checkLevel() {         

    if (level === 1 && flagItems === 1)   {            
        
        flagItems++;    
                      
    } else if(level === 2 && flagItems === 2) {                   
   
        userCounter = 0;
        compCounter = 0;
        userScore.innerText = userCounter; 
        compScore.innerText = compCounter;  

        console.log("RESET", userCounter, " ", compCounter);           
        flagItems++;    

    } else if(level === 3 && flagItems === 3) {          
   
        userCounter = 0;
        compCounter = 0;
        userScore.innerText = userCounter; 
        compScore.innerText = compCounter;  

        console.log("RESET3", userCounter, " ", compCounter);
            
        flagItems++;    

    }  else {
            console.log("gameOver3");
            gameOver();
    }
}


function ShowHideSections() {
    button.id = 'circular-menu-item-hidden';
    rulesImage.id = 'game-rules-hidden';      
    menu.style.marginTop = "100px"; 
    levelText.style.display = "block"; 
    scoreboard.style.display = "block";     
}

function menuItemClick() {               
                
    userChoice = this.id;

    compChoice = computerChoice();

    result = calculateResult(userChoice, compChoice);

    whoWon = showResult(userChoice, compChoice); 

// console.log(' User1 ' + userChoice);                

    //console.log(' comp1 ' + compChoice);                

    //console.log(' res1 ' + result);  
   
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

function showResult(userChoiceRes, compChoiceRes) {

    // console.log("flag 4", userCounter);

    let userId = userChoiceRes;
    let compId = compChoiceRes.toString();

    console.log(userId);
    console.log(compId);

    let userChoiceFigure = document.getElementById(userId).innerHTML;

    console.log(userChoiceFigure);
    

    let userContainer = document.getElementById("user-choice");
    userContainer.innerHTML = `<h2>Your choice</h2> <br> ${userChoiceFigure}`;

    let compChoiceFigure = document.getElementById(compId).innerHTML;
    let compContainer = document.getElementById("computer-choice");
    
    compContainer.innerHTML = `<h2>Computer choice</h2> <br> ${compChoiceFigure}`;

    console.log(compContainer);

    for (let item of items) {            
            item.removeAttribute('style');
            
    }

    finalResults.removeAttribute("id");  
    
     let whoWonContainer = document.getElementById("who-won");

     console.log("result1 =", result);



     if(result === 1) {    
        whoWonContainer.innerHTML = "<h1>YOU WON!!!</h1>"; 
        userCounter++;  
        userScore.innerText = userCounter;                
        console.log("userCounter", userCounter); 
        console.log("result2", result);   

    } else if (result === 0) {
        whoWonContainer.innerHTML = "<h1>DRAW</h1>";
        console.log("result3", result); 
    } else if (result === -1) {
        whoWonContainer.innerHTML = "<h1>Sorry, you loose...</h1>";        
        compCounter++;  
        compScore.innerText = compCounter;   
        console.log("result4", result);     
        console.log("compScore.innerText", compScore.innerText);  
    }   
     
    button.id = '';
    button.textContent = "Play again";    

    //console.log("Button", button);    
    
    flagAgain = 1;  
    
    newLevel = setGameLevel(userCounter, compCounter);

}


function setGameLevel(userCounterNew, compCounterNew) {

    console.log("userCounterNew", userCounterNew);
    console.log("compCounterNew", compCounterNew); 
    console.log("level", level); 


if (userCounterNew === 3  && level < 3) {

    popUpLevel.style.display = "block"; 
    levelUpHide.style.visibility = "visible";       
    // console.log(popupLevelMessage);
    popupLevelMessage.innerHTML = "<h1>You won 3 times!</h1>";
    level++; 
    button.id = 'circular-menu-item-hidden';
    hideGameItems();        
    

} else if (compCounterNew === 3 && level < 3) {
    popUpLevel.style.display = "block";              
    popupLevelMessage.innerHTML = "<h1>Sorry, you loose...</h1>";
    button.id = 'circular-menu-item-hidden';
    hideGameItems();            


 } else if(compCounterNew === 3 && level > 3) {
        //console.log("gameOver1");
        gameOver();
} else if(userCounterNew === 3 && level >= 3) {
        console.log("gameOver1");
        gameOverWon();
}   
}

function closePopup(){     
    popUpLevel.style.display = "none";     
}

function gameOver() { 
    levelUpHide.style.visibility = "hidden";
    popUpLevel.style.display = "block";
    popupLevelMessage.innerHTML = "<h1>Game over!</h1>";
    button.id = 'circular-menu-item-hidden';       
}

function gameOverWon() {
    levelUpHide.style.visibility = "hidden";
    popUpLevel.style.display = "block";
    popupLevelMessage.innerHTML = "<div><b>CONGRADUATIONS!</b></div><br><div><b>You beat the computer!</b></div><br>";
    button.id = 'circular-menu-item-hidden';
    hideGameItems();
}

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