var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start");


function startTimer() {
    var timeRemaining = 5;

    var timerInterval = setInterval(function(){

        if(timeRemaining>=0){
            timerEl.textContent = "Seconds remaining: " + timeRemaining;
            timeRemaining--;
        } else {
            clearInterval(timerInterval);
        }
    }, 1000);
};

startButton.onclick = startTimer;