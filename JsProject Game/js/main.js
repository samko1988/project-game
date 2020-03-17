var allPlayers = [
    { player: "Meir Sabbah", score: 170, date: "2020-02-11" },
    { player: "Yanki moses", score: 130, date: "2020-02-12" },
    { player: "yossi Saturn", score: 150, date: "2020-02-16" },
    { player: "Meir Sobel", score: 100, date: "2020-02-17" }
]

var sec = 60;
var my_timer = document.getElementById("my_timer");
var timer = null;
var dur = 2;

function start() {
    if (confirm("Are you ready?")) {
        timer = setInterval(myTimer, 1000);
        clickMe.style.animationDuration = dur + "s";
        clickMe.addEventListener("mouseover", moveIt);
        clickOn.addEventListener("click", scoreByClick);
        playAr.addEventListener("click", misClick);
    }
};

function myTimer() {
    my_timer.innerText = sec;

    if (sec > 0) { sec-- };
    if (sec < 10) {
        my_timer.style.color = "red",
            my_timer.style.fontSize = "20px"
    }
    if (sec < 6) {
        setTimeout(() => {
            my_timer.style.display = 'none';
        }, 250);
        setTimeout(() => {
            my_timer.style.display = 'block';
        }, 500);
        setTimeout(() => {
            my_timer.style.display = 'none';
        }, 750);
        setTimeout(() => {
            my_timer.style.display = 'block';
        }, 1000);
    }
    if (my_timer.innerText == 0) {
        clearInterval(timer);
        clickMe.removeEventListener("mouseover", moveIt);
        clickMe.style.animationDuration = "0s";
        clickMe.style.left = 0 + "px";
        clickMe.style.top = 0 + "px";
        clickOn.removeEventListener("click", scoreByClick);
        playAr.removeEventListener("click", misClick);
        alert("Game Over! Your score is: " + score.innerText);
        if (players.length < 5 || players[4].score < points) {
            let player = prompt("Enter your name");
            addPlayer(player);
        }
        reset()
    }
};
function reset() {
    sec = 60;
    timer = null;
    dur = 2;
    timeToMove = 300
    pointsToNe = 10;
    level = 1;
    CoLevel.innerHTML = level;
    points = 0;
    a = 1;
    b = a * 10
    my_timer.innerText = sec;
    score.innerHTML = points;
    pointsTo.innerHTML = pointsToNe;
    missed = 0;
    mis.innerHTML = missed
};

var clickOn = document.getElementById("clickMe");

function moveIt() {
    setTimeout(function () {
        clickOn.style.left = Math.floor(Math.random() * 750) + "px";
        clickOn.style.top = Math.floor(Math.random() * 370) + "px";
    }, timeToMove)
};

var timeToMove = 300;
var playAr = document.getElementById("playArea");
var mis = document.getElementById("missClicks");
var score = document.getElementById("currentScore");
var pointsTo = document.getElementById("points");
var CoLevel = document.getElementById("correntlevel");
var topHigh = document.getElementById("topHighScore");

var a = 1;
var points = 0;
var b = a * 10;
var pointsToNe = 10;
var level = 1;
var missed = 0;
var theDivs = document.getElementsByTagName("div");

function scoreByClick() {
    points += b;
    score.innerHTML = points;
    pointsToNe -= 1
    pointsTo.innerHTML = pointsToNe;

    for (let div of theDivs) {
        div.addEventListener("click", myFunc, {
            capture: false
        });
    }
    function myFunc(e) {
        e.stopPropagation();
    };

    if (pointsToNe == 0) {
        level++
        pointsToNe = 10
        pointsTo.innerHTML = pointsToNe;
        CoLevel.innerHTML = level;
        sec += 10;
        my_timer.innerText = sec;
        dur -= 0.25;
        clickMe.style.animationDuration = dur + 's';
        timeToMove -= 50;
        a++;
        b = a * 10
    }
};

function misClick() {
    missed++;
    points -= a;
    score.innerHTML = points;
    mis.innerHTML = missed;
    if (pointsToNe == 0) {
        a++
    }
};

var players = [];
var topHigh = document.getElementById("topHighScore");

function addPlayer(player) {
    var d = new Date;
    var newPlayer = {
        player: player,
        score: points,
        date: d.toLocaleDateString(),
    };
    players.push(newPlayer);

    compair()
    if (players.length > 5) {
        players.pop()
    };
    updateLocal();
    createHTML();
};

function updateLocal() {
    playerJSON = JSON.stringify(players)
    localStorage.setItem("thePlayers", playerJSON)
};
var toAppend = "";
function createHTML() {
    toAppend = "";
    players.forEach(createPlayers);
    topHigh.innerHTML = toAppend;
};
function createPlayers(highPlayer, i) {
    toAppend +=
        `<br> <p class="inline">${(i + 1)} ) ${highPlayer.player} : ${highPlayer.score},
        <span class="none"> ${highPlayer.date}</span></p>`
};

var playerJSON = localStorage.getItem("thePlayers");
players = JSON.parse(playerJSON);
createHTML();

function compair() {
    players.sort((a, b) => {
        return b.score - a.score;
    })
};