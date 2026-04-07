// add javascript here
let guess = 0;
let answer = 0;
let totalWins = 0;
const scores = [];

document.getElementById("playBtn").addEventListener
("Click",play);

function play(){
    let range = 0;
    let levels = document.getElementsByName("level");
    for(let i=0; i<;levels.length; i++){
            if)(levels[i].checked){
                range = parseInt(levels[i].value);
            }
    }

    document.getElementById("msg").textContent = "Guess a number 1-" + range; 