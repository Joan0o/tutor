var markers = ["X", "0"];
var players = [];
players[0] = prompt("Enter Player 1 Name:");
players[1] = prompt("Enter Player 2 Name:");
var totals = [];
var winCodes = [7, 56, 73, 84, 146, 273, 292, 448];
var gameOver = false;
var whoseTurn = 0;
var playerScore0 = 0;
var playerScore1 = 0;
var winsound = new Audio("winsound.mp3");
var failuresound = new Audio("failuresound.mp3");

function startGame() {
    document.getElementById("restart-game").style.display = "none";
    var counter = 1;
    var innerDivs = "";
    for (i = 1; i <= 3; i++) {
        innerDivs += '<div id="row-' + i + '">';

        for (j = 1; j <= 3; j++) {
            innerDivs += '<div onclick="playGame(this,' + counter + ');"></div>';
            counter *= 2;
        }
        innerDivs += '</div>';
    }

    document.getElementById("game-board").innerHTML = innerDivs;

    totals = [0, 0];
    gameOver = false;
    document.getElementById("game-message").innerText = "It's " + players[whoseTurn] + "'s Turn";
}

function playGame(clickedDiv, divValue) {
    if (!gameOver) {
        clickedDiv.innerText = markers[whoseTurn];

        totals[whoseTurn] += divValue;
        if (isWin()) {
            document.getElementById("game-message").innerText = players[whoseTurn] + " Wins!";
            toggleButton();

        } else if (gameOver) {
            document.getElementById("game-message").innerText = "No One Wins!";
            toggleButton();

        } else {
            if (whoseTurn) whoseTurn = 0;
            else whoseTurn = 1;

            clickedDiv.attributes["0"].nodeValue = "";

            document.getElementById("game-message").innerText = "It's " + players[whoseTurn] + "'s Turn";
        }
    }
}

function isWin() {
    for (i = 0; i < winCodes.length; i++) {
        if ((totals[whoseTurn] & winCodes[i]) == winCodes[i]) {
            gameOver = true;
            return true;
        }
    }
    if (totals[0] + totals[1] == 511) { gameOver = true; }

    return false;
}

function toggleButton() {
    let button = document.getElementById("restart-game");

    if (!button.style.display == "none") {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
}