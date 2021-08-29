var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start");
var questionEl = document.getElementById("question");
var answerElOne = document.getElementById("answer-choice-1");
var answerElTwo = document.getElementById("answer-choice-2");
var answerElThree = document.getElementById("answer-choice-3");
var answerElFour = document.getElementById("answer-choice-4");
var answerElFive = document.getElementById("answer-choice-5");
var answerEls = document.querySelector(".container");

var questionArray = [
    {
        question: "What is your favorite color?", 
        answerChoices: "blue/red/green/orange/purple",
        a: "red"
    }, {
        question: "What is your least favorite color?", 
        answerChoices: "blue/red/green/orange/purple",
        a: "blue"
    },  {
        question: "What is your favorite color?", 
        answerChoices: "blue/red/green/orange/purple",
        a: "red"
    }, {
        question: "What is your favorite color?", 
        answerChoices: "blue/red/green/orange/purple",
        a: "red"
    }, {
        question: "What is your favorite color?", 
        answerChoices: "blue/red/green/orange/TESTESTEST",
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
        questionEl.textContent = questionArray[i].question;

        splitAnswerChoices(questionArray[i].answerChoices);

        checkAnswer(questionArray[i].a);
    }
};

function splitAnswerChoices(selectedQuestion) {
    var words = selectedQuestion.split("/");

    answerElOne.textContent = words[0];
    answerElTwo.textContent = words[1];
    answerElThree.textContent = words[2];
    answerElFour.textContent = words[3];
    answerElFive.textContent = words[4];

    return;
};

function checkAnswer(correctAnswer) {
    console.log("we got here");
    
    var userChoice = getInput(); //fix this somehow

    console.log(userChoice);

    if(correctAnswer === userChoice){
        console.log("correct!");
    } else {
        console.log("false!");
    }
};

function getInput(event){
    var userChoice = event.target.textContent;
    console.log(userChoice);
    return userChoice;
};


startButton.onclick = startTimer;
setAnswerChoices();
splitAnswerChoices();
answerEls.addEventListener('click', getInput);