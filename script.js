// Game nav bar fade
// const slideshow = document.querySelector(".slideshow-container");
// const gameNav = document.querySelector('.games-nav-wrapper');

// const appearOptions = {
//     threshold : 1
// };

// const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
//     entries.forEach(entry=> {
//         if(!entry.isIntersecting){
//             gameNav.classList.remove("show");
//         }else {
//             gameNav.classList.add("show");
//         }
//     });
// }, appearOptions);

// appearOnScroll.observe(slideshow);

//Toast generation
function showToast() {
var email = document.querySelector('input[name="email"]');
var name = document.querySelector('input[name="name"]');
var subject = document.querySelector('input[name="subject"]');

    var x = document.getElementById("snackbar");
    if(
        email.value == '' ||
        name.value == '' ||
        subject.value == ''
    ){
        return;
    }
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

//Media selection
const mainMedia = document.querySelector(".main-media-container");
const otherMedia = document.querySelectorAll('.other-media-wrapper');

otherMedia.forEach(medium =>{
    medium.addEventListener("click", ()=>{
        mainMedia.childNodes[1].src = medium.childNodes[1].src;
    });
})

//Resume sidebar and text wrapper height adjustment
const sidebar = document.querySelector(".sidebar-wrapper");
const textContainer = document.querySelector(".text-container-resume");

function matchHeight() {
    var barHeight = sidebar.scrollHeight;
    textContainer.style.height = barHeight + 'px';
    // console.log(barHeight);
}

//matchHeight();

//Minigame
var character = document.querySelector(".character");
var obstacle = document.querySelector(".obstacle");
var pauseButton = document.querySelector(".fa-play-circle");
let leftMostObstacle;
let i = 0;
let paused = false;
let end = true;
let myHighScore = 0;

// leftMostObstacle = spawnTimer();
var bounceStart = setInterval(function(){
    if(end){
        pauseButton.classList.add("animate-play");
        setTimeout(function(){
            pauseButton.classList.remove("animate-play");
        }, 1000);
    }
}, 3000);

//obstacle movement
function spawnTimer(){
    var newOb = addNewObstacle(); 
    newOb.classList.add("obstacle-moving");
    newOb.classList.add("obstacle-spawn");

    setTimeout(function(){
        if(!paused){
            spawnTimer();
        }
    }, getRandomInt(3));

    return newOb;
}

var checkEnd = setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(leftMostObstacle != null){
        var obstacleLeft = parseInt(window.getComputedStyle(leftMostObstacle).getPropertyValue("left"));
        console.log("set interval" + leftMostObstacle.id);
    }
    if(obstacleLeft < 20 && obstacleLeft >= 0 && characterTop >= 180){
        // obstacle.style.animation = "none";
        // obstacle.style.display = "none";
        // alert();
        if(!paused){pauseGame();}
        if(!end){endGame();}
        return;
    }
    if(obstacleLeft == 0){
        removeLeftMost();
    }
},10);


function removeLeftMost(){
    leftMostObstacle.classList.remove("obstacle-spawn");
    var _leftMostObstacle = document.getElementById(leftMostObstacle.id).nextSibling;
    leftMostObstacle.remove();
    leftMostObstacle = _leftMostObstacle;
    // console.log(leftMostObstacle.id);
    addScore();
}

function getRandomInt(max){
    return Math.random() * max * 1000;
}

function addScore(){
    var currentScore = document.querySelector(".current").childNodes[0].nodeValue;
    var currentScoreInt = parseInt(currentScore);
    currentScoreInt++;
    document.querySelector(".current").childNodes[0].nodeValue = currentScoreInt;
    updateMyHighScore(currentScoreInt);
}

function updateMyHighScore(currentScoreInt){
    if(currentScoreInt > myHighScore){myHighScore = currentScoreInt;}
    document.querySelector(".my-high-score").childNodes[0].nodeValue = myHighScore;
}

function restartScore(){
    document.querySelector(".current").childNodes[0].nodeValue = 0;
}

function addNewObstacle(){
    var original = document.querySelector(".obstacle");
    var clone = original.cloneNode(true);
    clone.id = "obstacle" + ++i;
    original.parentNode.appendChild(clone);
    return clone;
}

function pauseGame(){
    if(!paused){
        var spawnedObstacles = document.querySelectorAll(".obstacle-moving");
        spawnedObstacles.forEach(spawnedObstacle => {
            console.log("paused");
            spawnedObstacle.classList.add("paused");
        })
        paused = true;
        pauseButton.className = "far fa-play-circle";
        return;
    }

    var spawnedObstacles = document.querySelectorAll(".obstacle-moving");
    spawnTimer();
    spawnedObstacles.forEach(spawnedObstacle => {
        spawnedObstacle.classList.remove("paused");
        spawnedObstacle.classList.add("obstacle-spawn");
    })
    paused = false;
    pauseButton.className = "far fa-pause-circle";
}

function endGame(){
    end = true;
}

//player movement
function jump(){
    if(character.classList != "character-animate"){
        character.classList.add("character-animate");
        setTimeout(function(){
            character.classList.remove ("character-animate");
        },500);
    }    
}

//old functions
function spawn(){
    obstacle.classList.add("obstacle-spawn");
    setTimeout(function(){
        obstacle.classList.remove("obstacle-spawn");
        addScore();
        setTimeout(function(){
            spawn();
        }, getRandomInt(3));
    }, 3000);
}

function spawnVar(thisObstacle){
    thisObstacle.classList.add("obstacle-spawn");
    setTimeout(function(){
        // thisObstacle.classList.remove("obstacle-spawn");
        // addScore();
        // leftMostObstacle = document.getElementById(thisObstacle.id).nextSibling;
        // console.log(leftMostObstacle.id);
        // thisObstacle.remove();
    }, 3000);
}


pauseButton.addEventListener("click", ()=>{
    if(end){
        var spawnedObstacles = document.querySelectorAll(".obstacle-moving");
        spawnedObstacles.forEach(spawnedObstacle => {
            spawnedObstacle.remove();
        })
        paused = false;
        end = false;
        i = 0;
        leftMostObstacle = spawnTimer();
        restartScore();
        pauseButton.className = "far fa-pause-circle";
        return;
    }
    pauseGame();
});

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        jump();
    }
}

window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });