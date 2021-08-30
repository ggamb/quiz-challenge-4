var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start");
var questionEl = document.getElementById("question");
var answerElOne = document.getElementById("answer-choice-1");
var answerElTwo = document.getElementById("answer-choice-2");
var answerElThree = document.getElementById("answer-choice-3");
var answerElFour = document.getElementById("answer-choice-4");
var answerElFive = document.getElementById("answer-choice-5");
var answerEls = document.querySelector(".container");
var answerResult = document.getElementById("answer-result");
var index = 0;
var timeRemaining = 100;


var questionArray = [
    {
        question: "What is your name?", 
        answerChoices: "Sir Lancelot of Camelot/Tyrant King George the Third/A Knight who says Nee/Sir Robin of Camelot/Sir Galahad of Camelot",
        a: "Sir Lancelot of Camelot"
    }, {
        question: "What is your quest?", 
        answerChoices: "Fame and fortune/Honestly, I don't know/Knowledge/To seek the Holy Grail/Immortality",
        a: "To seek the Holy Grail"
    },  {
        question: "What is your favorite color?", 
        answerChoices: "Orange/Red/Green/Blue/Purple",
        a: "Blue"
    }, {
        question: "What is you the capital of Assyria?", 
        answerChoices: "What is Assyria?/Babylon/Memphis/Assur/Ur",
        a: "Assur"
    }, {
        question: "What is the air-speed velocity of an unladen swallow?", 
        answerChoices: "Very fast!/Not too fast/An average speed/Slow/Huh...I don't know that",
        a: "Huh...I don't know that"
    }
];


function startTimer() {
    var timerInterval = setInterval(function(){

        if(timeRemaining>=0){
            timerEl.textContent = "Seconds remaining: " + timeRemaining;
            timeRemaining--;
        } else {
            clearInterval(timerInterval);
            loadScores();
        }
    }, 1000);
};


function setAnswerChoices() {

    if(index < 5) {
        questionEl.textContent = questionArray[index].question;
        splitAnswerChoices(questionArray[index].answerChoices);
    } else {
        loadScores();
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


function getInput(event){
    var userChoice = event.target.textContent;

    if(questionArray[index].a === userChoice){
        timeRemaining += 10;
        answerResult.textContent = "Question " + (index+1) + " is correct!"; // add CSS
        answerEls.appendChild(answerResult);
        console.log("correct!");
    } else {
        timeRemaining -= 10;
        answerResult.textContent = "Question " + (index+1) + " is incorrect!"; //add CSS
        answerEls.appendChild(answerResult);
        console.log("false!");
    }
    index++;
    setAnswerChoices();
};

function loadScores(){
    window.location.href = "./assets/html/score.html";
};


startButton.onclick = startTimer;
setAnswerChoices();
//splitAnswerChoices();
answerEls.addEventListener('click', getInput);
