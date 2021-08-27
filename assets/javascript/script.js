var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start");
var answerElOne = document.getElementById("answer-choice-1");
var answerElTwo = document.getElementById("answer-choice-2");
var answerElThree = document.getElementById("answer-choice-3");
var answerElFour = document.getElementById("answer-choice-4");
var answerElFive = document.getElementById("answer-choice-5");

var questionArray = [
    questionOne = {
        question: "What is your favorite color?", 
        answerChoices: "blue/red/green/orange/purple",
        a: "red"
    }, questionTwo = {
        question: "What is your least favorite color?", 
        answerChoices: "blue/red/green/orange/purple",
        a: "blue"
    }, questionThree = {
        question: "What is your favorite color?", 
        answerChoices: "blue/red/green/orange/purple",
        a: "red"
    }, questionFour = {
        question: "What is your favorite color?", 
        answerChoices: "blue/red/green/orange/purple",
        a: "red"
    }, questionFive = {
        question: "What is your favorite color?", 
        answerChoices: "blue/red/green/orange/purple",
        a: "red"
    }
];


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


function setAnswerChoices() {
    
    for(var i = 0 ; i < questionArray.length; i++){
        var words = questionArray[i].split("/");

        for(var j = 0; j < words.length; i++){
            
        }
    }
}

startButton.onclick = startTimer;