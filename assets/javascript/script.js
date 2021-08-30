//Variables to selected HTML IDs
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

//Global variable to control which question appears
var index = 0;

//Global variables for the timer
var timeRemaining = 100;
var increment = 10;
var decrement = 10;

//Array holding the questions for the quiz. Property answerChoices contains all answers for one question separated by a slash
var questionArray = [
    {
        question: "What is your name?", 
        answerChoices: "Sir Lancelot of Camelot/The Lady of the Lake/A Knight who says Ni/Sir Robin of Camelot/Sir Galahad of Camelot",
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

//Timer functrion
function startTimer() {
    //Function to decrement and display the timer every 1 second
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

//Function to set the answer choices. If no questions remain in the question array, high scores are automatically loaded
function setAnswerChoices() {
    if(index < questionArray.length) {
        questionEl.textContent = questionArray[index].question;
        splitAnswerChoices(questionArray[index].answerChoices);
    } else {
        loadScores();
    }

};

//Splits the question choices into different divs
function splitAnswerChoices(selectedQuestion) {
    var words = selectedQuestion.split("/");

    answerElOne.textContent = words[0];
    answerElTwo.textContent = words[1];
    answerElThree.textContent = words[2];
    answerElFour.textContent = words[3];
    answerElFive.textContent = words[4];

    return;
};

//Function to handle and evaluate a user's choice via a click
function getInput(event){
    //Stores the text of the user's choice
    var userChoice = event.target.textContent;

    //Evaluates user's choice against the correct answer
    if(questionArray[index].a === userChoice){
        timeRemaining += increment;
        answerResult.textContent = "Question " + (index+1) + " is correct! " + increment + " seconds added!";
        answerEls.appendChild(answerResult);
        console.log("correct!");
    } else {
        timeRemaining -= decrement;
        answerResult.textContent = "Question " + (index+1) + " is incorrect!" + decrement + " seconds deducted!"; //add CSS
        answerEls.appendChild(answerResult);
        console.log("false!");
    }

    //Increases index after the first passthrough and calls setAnswerChoices() to set up the next question
    index++;
    setAnswerChoices();
};

//Loads the webpage with user's high scores
function loadScores(){
    window.location.href = "./assets/html/score.html";
};

//Listeners and functions to start posting questions
startButton.onclick = startTimer;
setAnswerChoices();
//splitAnswerChoices();
answerEls.addEventListener('click', getInput);
