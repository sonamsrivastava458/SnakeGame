let direction = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const moveSound = new Audio('move.mp3');
const gameOverSound = new Audio('gameover.mp3');
const musicSound = new Audio('background-music.mp3');
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }]
let board = document.querySelector(".board");
let food = { x: 6, y: 7 };
let score = 0;




//Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
//Game over function
 function isCollide(snake){
    // if snake bump into yourself
    for(let i=1 ; i<snakeArr.length ; i++){
        if(snake[i].x === snake[0].x  && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if snake bump into the wall
    if(snake[0].x>=18 || snake[0].x<=0  ||  snake[0].y>=18 || snake[0].y<=0){
        return true;
    }




 }

function gameEngine() {
    // part 1: updating the snake variable
    musicSound.play();
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        score=0;
        direction ={x:0,y:0};
        alert("Game Over... Press any key to play again!");
        score =0; 
        scoreBox.innerHTML ="Score:"+score;
        snakeArr =[{x:13,y:15}];
        musicSound.play();
    }
    //If snake eaten the food, increment the score and regenerate the food
    if(snakeArr[0].x === food.x  && snakeArr[0].y === food.y){
        foodSound.play();
        score+=1;
        scoreBox.innerHTML= "score:"+score;
        snakeArr.unshift({x:snakeArr[0].x+direction.x, y:snakeArr[0].y+direction.y})
        let a= 2;
        let b= 16;
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }

    //Moving the snake
    for(let i= snakeArr.length-2 ; i>=0 ; i--){
        snakeArr[i+1] ={...snakeArr[i]};
    }
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;



    //part2: Display the Snake and Food
    // Display the Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {

            snakeElement.classList.add('head');
            snakeElement.innerHTML = `<pre><p> O  O </p></pre>`
        }
        else {

            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    // Display the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


//Main logic start here...
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    direction = { x: 0, y: 1 }; //Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
         
            direction.x= 0 ;
            direction.y=  -1;
            break;
        case "ArrowDown":
          
            direction.x= 0 ;
            direction.y= 1 ;
            break;
        case "ArrowLeft":
        
            direction.x=  -1;
            direction.y= 0 ;
            break;
        case "ArrowRight":
         direction.x=  1;
            direction.y=  0;
            break;
        default:
            break;
    }

})