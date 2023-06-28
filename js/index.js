// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const newcubeSound = new Audio('music/newcube.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 19;
let score = 0;
let lastPaintTime = 0;
let cubeArr = [
    {x: 13, y: 15}
];

newcube = {x: 6, y: 7};

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(cube) {
    // If you bump into yourself 
    for (let i = 1; i < cubeArr.length; i++) {
        if(cube[i].x === cube[0].x && cube[i].y === cube[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(cube[0].x >= 18 || cube[0].x <=0 || cube[0].y >= 18 || cube[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the cube array & newcube
    if(isCollide(cubeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to Restart!");
        cubeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }

    // If you have eaten the newcube, increment the score and regenerate the newcube
    if(cubeArr[0].y === newcube.y && cubeArr[0].x ===newcube.x){
        newcubeSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        cubeArr.unshift({x: cubeArr[0].x + inputDir.x, y: cubeArr[0].y + inputDir.y});
        let a = 0;
        let b = 18;
        newcube = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the cube
    for (let i = cubeArr.length - 2; i>=0; i--) { 
        cubeArr[i+1] = {...cubeArr[i]};
    }

    cubeArr[0].x += inputDir.x;
    cubeArr[0].y += inputDir.y;

    // Part 2: Display the cube and newcube
    // Display the cube
    board.innerHTML = "";
    cubeArr.forEach((e, index)=>{
        cubeElement = document.createElement('div');
        cubeElement.style.gridRowStart = e.y;
        cubeElement.style.gridColumnStart = e.x;

        if(index === 0){
            cubeElement.classList.add('head');
        }
        else{
            cubeElement.classList.add('cube');
        }
        board.appendChild(cubeElement);
    });
    // Display the newcube
    newcubeElement = document.createElement('div');
    newcubeElement.style.gridRowStart = newcube.y;
    newcubeElement.style.gridColumnStart = newcube.x;
    newcubeElement.classList.add('newcube')
    board.appendChild(newcubeElement);


}


// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});