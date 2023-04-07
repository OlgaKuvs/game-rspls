const menu = document.querySelector('.circular-menu');
const items = menu.querySelectorAll('.circular-menu-item');
const button = menu.querySelector('.start-button');
const rulesImage = document.querySelector('.game-rules');
const showResults = document.querySelector('.show-results');

let length = items.length;
const radius = 50;

function startGame() {   

        for (let item of items) {
            item.classList.remove("circular-menu-item");
            item.classList.add("menu-item-hidden"); 
        } 

        length = 3;        
        const arc = 2* Math.PI * (1 / length);

        console.log(length);

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
} 

button.id = "circular-menu-item-hidden";
showResults.id = "show-results-hidden";

for (let i=0; i < length; i++) {
   
        items[i].classList.remove("menu-item-hidden");
        items[i].classList.add("circular-menu-item");

        // console.log("Item", item);
   
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