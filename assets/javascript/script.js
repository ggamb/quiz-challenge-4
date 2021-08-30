var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start");
var questionEl = document.getElementById("question");
var answerElOne = document.getElementById("answer-choice-1");
var answerElTwo = document.getElementById("answer-choice-2");
var answerElThree = document.getElementById("answer-choice-3");
var answerElFour = document.getElementById("answer-choice-4");
var answerElFive = document.getElementById("answer-choice-5");
var answerEls = document.querySelector(".container");
var index = 0;


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
        answerChoices: "orange/red/green/blue/purple",
        a: "blue"
    }, {
        question: "What is you the capital of Assyria?", 
        answerChoices: "What is Assyria?/Babylon/Memphis/Assur/Ur",
        a: "Assur"
    }, {
        question: "What is the air-speed velocity of an unladen swallow?", 
        answerChoices: "Very fast!/Not too fast/An average speed/Slow./Huh...I don't know that",
        a: "Huh...I don't know that"
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
    questionEl.textContent = questionArray[index].question;
    splitAnswerChoices(questionArray[index].answerChoices);
    console.log(index);
    console.log(questionArray[index]);
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

/*
function checkAnswer(correctAnswer) {
    console.log("we got here");
    
    var userChoice = answerEls.addEventListener('click', getInput);

    console.log(userChoice);

    if(correctAnswer === userChoice){
        console.log("correct!");
    } else {
        console.log("false!");
    }
};*/

function getInput(event){
    var userChoice = event.target.textContent;
    console.log(userChoice);
    if(questionArray[index].a === userChoice){
        console.log("correct!");
    } else {
        console.log("false!");
    }
    index++;
    setAnswerChoices();
};


startButton.onclick = startTimer;
setAnswerChoices();
//splitAnswerChoices();
var userCorrect = answerEls.addEventListener('click', getInput);
