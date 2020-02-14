let addCards = document.querySelectorAll(".add-cards");
let playArea = document.querySelector("#playarea");
let playerCards = document.querySelectorAll(".cards");
let enemyCards = document.querySelectorAll(".enemycards")
let countArea = document.querySelector("#playerAdded");
let enemyCountArea = document.querySelector("#opponentAdded");
let cardArea = document.querySelector("#cardarea");
let end = document.querySelector("#end");
let resultArea = document.querySelector("#GameOver");
let used = [false, false, false, false, false];
let playerLimiter = 0;
let count = 0;
let opponentCount = 0;
let playerFolded = false;
let enemyFolded = false;
let started = false;

let images = document.querySelectorAll(".image");
let opponentImage = document.querySelectorAll(".opponentImage");
var playerCardImages = [
    "../img/pazaak_base_1.jpg",
    "../img/pazaak_base_2.jpg",
    "../img/pazaak_base_3.jpg",
    "../img/pazaak_base_4.jpg",
    "../img/pazaak_base_5.jpg",
    "../img/pazaak_base_6.jpg",
    "../img/pazaak_base_7.jpg",
    "../img/pazaak_base_8.jpg",
    "../img/pazaak_base_9.jpg",
    "../img/pazaak_base_10.jpg"
];
var opponentCardImages = [
    "../img/pazaak_opponent_base_1.jpg",
    "../img/pazaak_opponent_base_2.jpg",
    "../img/pazaak_opponent_base_3.jpg",
    "../img/pazaak_opponent_base_4.jpg",
    "../img/pazaak_opponent_base_5.jpg",
    "../img/pazaak_opponent_base_6.jpg",
    "../img/pazaak_opponent_base_7.jpg",
    "../img/pazaak_opponent_base_8.jpg",
    "../img/pazaak_opponent_base_9.jpg",
    "../img/pazaak_opponent_base_10.jpg"
];

const turnButton = document.querySelector("#turn-button");
turnButton.addEventListener("click", (event)=>{
    enemyFold();
    //player
    if(count>20){playerFolded = true;}
    if(!playerFolded){
        let number = Math.floor(Math.random()*11);
        if(number==0){number=1;}
        images[playerLimiter].setAttribute("src", playerCardImages[number-1]);
        count += number;
        countArea.innerHTML ="Total points: " + count;
    }
    //opponent
    if(!enemyFolded){
        number = Math.floor(Math.random()*11);
        if(number==0){number=1;}
        opponentImage[playerLimiter].src = opponentCardImages[number-1];
        opponentCount += number;
        enemyCountArea.innerHTML ="opponent's points: " + opponentCount;
        if(opponentCount >= 20){enemyFolded = true;}
    }
        playerLimiter++;
       
        if (playerLimiter > 9){GameOver();}
        if(playerFolded && enemyFolded){GameOver();}
         turnButton.innerHTML="End Turn";
         started = true;
});

const foldButton = document.querySelector("#foldButton");
foldButton.addEventListener("click", ()=>{
    playerFolded = true;
    if(playerFolded && enemyFolded){GameOver();}
});

function enemyFold(){
    let randomFold = Math.floor(Math.random()*101);
    if(personalities[0] && randomFold >=60 && opponentCount > 10 && opponentCount<16){
        enemyFolded = true;
        console.log("folded")
    }
    else if(personalities[0] && opponentCount >= 16){
        enemyFolded = true;
        console.log("folded")
    }
    else if(personalities[1] && randomFold >= 75 && opponentCount > 12 && opponentCount<18){
        enemyFolded = true;
        console.log("folded")
    }
    else if(personalities[1] && opponentCount >= 18){
        enemyFolded = true;
        console.log("folded")
    }
    else if(personalities[2] && randomFold >= 90 && opponentCount > 15 && opponentCount<20){
        enemyFolded = true;
        console.log("folded")
    }
    else if(personalities[2] && opponentCount == 20){
        enemyFolded = true;
        console.log("folded")
    }
}

for (let i = 0; i < addCards.length; i++) {
    addCards[i].addEventListener("click", ()=>{
        if (started){
            if(!playerFolded){
                if(!used[i]){

                        count += addCards[i].value;
                    
                    used[i]=true;
                    countArea.innerHTML ="Total points: " + count;
                    addCards[i].style.display="none";
                    if(count>20){playerFolded = true;}
                }
            }
        }
    });    
}

let replayBtn = document.querySelector("#replay");
replayBtn.addEventListener("click", ()=>{
    location.reload();
});

function GameOver(){
    playArea.style.display="none";
    cardArea.style.display="none";
    end.style.display="none";
    resultArea.style.display="block";
    foldButton.style.display="none";
    replayBtn.style.display="block";
    if ( (count > opponentCount && count <= 20) || ( opponentCount > 20 && count <= 20) ){
        resultArea.innerHTML="You Win";
    }
    else if ((opponentCount > count && opponentCount <= 20) || (count > 20 && opponentCount <= 20)){
        resultArea.innerHTML="you lose";
    }
    else {
        resultArea.innerHTML="draw";
    }
}
var addCardImage_negative = [
    "../img/pazaak_add_n1.jpg",
    "../img/pazaak_add_n2.jpg",
    "../img/pazaak_add_n3.jpg",
    "../img/pazaak_add_n4.jpg",
    "../img/pazaak_add_n5.jpg",
    "../img/pazaak_add_n6.jpg",
]
var addCardImage_positive = [
    "../img/pazaak_add_p1.jpg",
    "../img/pazaak_add_p2.jpg",
    "../img/pazaak_add_p3.jpg",
    "../img/pazaak_add_p4.jpg",
    "../img/pazaak_add_p5.jpg",
    "../img/pazaak_add_p6.jpg"
]
let addCardImages = document.querySelectorAll(".addCard")
let personalities = [false, false, false];  //careful, aggressive, stupid
let numbers = [0, 0, 0, 0, 0];
window.onload = (event) => {
    
    for (let i = 0; i < numbers.length; i++) {
        let element = Math.floor(Math.random()*7);
        let multiplier = Math.random();
        if (multiplier < 0.5){multiplier = -1;}
        else{multiplier = 1}
        if(element == 0){element = 1;}
        numbers[i] = element*multiplier;
        addCards[i].value = numbers[i];
        //addCards[i].innerHTML = addCards[i].value;
        let test = addCards[i].value;
        if (addCards[i].value > 0){
            addCardImages[i].setAttribute("src", addCardImage_positive[test - 1]);
            addCardImages[i].setAttribute("alt", test)
        }
        else{
            test *= -1;
            addCardImages[i].setAttribute("src", addCardImage_negative[test-1]);
            addCardImages[i].setAttribute("alt", test)
            test *= -1;
        }
    }
    let rand = Math.floor(Math.random()*3);
    switch(rand){
        case 0:
            personalities[0] = true;
        break;
        case 1:
            personalities[1] = true;
        break;
        case 2:
            personalities[2] = true;
        break;
        default:
            console.log("undefined case");
    }
};