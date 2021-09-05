//Variables to selected HTML IDs
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start");
var blockerEl = document.getElementById("block-questions");
var headerTextEl = document.querySelector(".count-of-three");
var questionEl = document.getElementById("question");
var answerElOne = document.getElementById("answer-choice-1");
var answerElTwo = document.getElementById("answer-choice-2");
var answerElThree = document.getElementById("answer-choice-3");
var answerElFour = document.getElementById("answer-choice-4");
var answerElFive = document.getElementById("answer-choice-5");
var answerEls = document.querySelector(".container");
var answerResult = document.getElementById("answer-result");
var playAgainEl = document.getElementById("goAgain");
var scoreResultsEl = document.getElementById("score-results");
var quizEl = document.getElementById("quiz");
var initialsContainerEl = document.getElementById("initials-container");
var showInitialsEl = document.getElementById("showInitials").style;
var initialButtonEl = document.getElementById("initialSubmit");
var initials = document.getElementById("typeInitials");
var showScoresEl = document.getElementById("scores");
var initialFormEl = document.getElementById("initialForm");
var playAgainEl = document.getElementById("play-again");
var viewScoresEl = document.getElementById("clear-scores");
var gameOverEl = document.getElementById("game-over-buttons");

//Global variable to control which question appears
var index = 0;

//Global variables for the timer
var timeRemaining = 100;
var increment = 10;
var decrement = 10;

//Other global variables
var finalScore = 0;
var scoresArray = [];


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

//starts joke timer and leads to function to start game timer
function timerStart() {
    var count = 3; //Change back to 1 after finishing
    var timerInterval = setInterval(function(){
        if(count < 3){
            startButton.textContent = count;
            count++;
        } else if (count === 3){
            startButton.textContent = 5;
            count++;
        } else {
            timerEl.textContent = "Seconds remaining: " + timeRemaining;
            clearInterval(timerInterval);
            startGameTimer();
        }
    }, 1000);
}

//Game timer function
function startGameTimer() {
    blockerEl.remove();
    startButton.remove();
    headerTextEl.remove();

    //Function to decrement and display the timer every 1 second
    var timerInterval = setInterval(function(){
        finalScore = parseInt(timerEl.textContent);
        if(timeRemaining>=0){
            timerEl.textContent = "Seconds remaining: " + timeRemaining;
            timeRemaining--;
        } else {
            clearInterval(timerInterval);
            if(index < 4) {
                getHighScore();
            }
        }
    }, 1000);
};

//Function to set the answer choices. If no questions remain in the question array, high scores are automatically loaded to local storage
function setAnswerChoices() {
    
    if(index < questionArray.length) {
        questionEl.textContent = questionArray[index].question;
        splitAnswerChoices(questionArray[index].answerChoices);
    } else {
        finalScore = timeRemaining;
        getHighScore();
    }

};

//Splits the question choices into different divs
function splitAnswerChoices(selectedQuestion) {
    var words = selectedQuestion.split("/");

    answerElOne.textContent = words[0]; //Make more scalable??
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
        answerResult.textContent = "Question " + (index+1) + " is incorrect! " + decrement + " seconds deducted!";
        answerEls.appendChild(answerResult);
        console.log("false!");
    }

    //Increases index after the passthrough and calls setAnswerChoices() to set up the next question
    //If the question is the last in the array, the input to enter initials pop up after answering
    if(index < 4) {
        index++;
        setAnswerChoices();
    } else {
        quizEl.remove();
        console.log("we got here");
        showInitialsEl.display = "flex";
        finalScore = timeRemaining;
        localStorage.setItem("score", finalScore);
        getHighScore();
    }
};

//Loads the webpage with user's high scores
function getHighScore(){    
    console.log(finalScore);
    var score = parseInt(finalScore);
    var highScore = localStorage.getItem("highscore");
    if(highScore !== null){
        if (score > highScore) {
            localStorage.setItem("highscore", score);   
            scoreResultsEl.textContent = "Congrats on the high score! Your new high score: " + score;
        }
    } else{
        localStorage.setItem("highscore", score);
        scoreResultsEl.textContent = "High score: " + highScore;
    }

    if(scoreResultsEl){
        scoreResultsEl.textContent = "High Score: " + localStorage.getItem("highscore");
        console.log(scoreResultsEl.textContent);
    }
};

function getInitials(event) { 

    event.preventDefault();
    initialButtonEl.remove();
    initialsContainerEl.remove();
    

    gameOverEl.style.display = "flex";
    
    showScoresEl.textContent = "You finished with a score of " + localStorage.getItem("score") + "!";

    showScores(initials.value, localStorage.getItem("score"));
}

function showScores(userInitials, UserScore) {
    console.log("made it to showScores", UserScore);

    var scoreObject = {
        initials: userInitials,
        score: UserScore
    };
    
    var showScoresArray = JSON.parse(localStorage.getItem("scoresArray")) || [];

    console.log("showScoresArray", showScoresArray);

    showScoresArray.push(scoreObject);

    localStorage.setItem("scoresArray", JSON.stringify(showScoresArray));

    var loopArray = JSON.parse(localStorage.getItem("scoresArray"));

    console.log(loopArray);

    loopArray.sort(function(a,b) {
        console.log(a);
        console.log(b);
        return b.score-a.score;
    })

    console.log(loopArray);

    /*console.log("After push to scoresArray:", scoresArray);
    debugger;
    var showScoresArray = localStorage.getItem("scoresArray");

    console.log("After getItem socresArray:", showScoresArray);

    var jsonArray = JSON.parse(showScoresArray);

    console.log("JSON", jsonArray); 

    console.log("After JSON", showScoresArray);

    localStorage.setItem("jsonArray", JSON.stringify(scoresArray));*/

    initialFormEl.reset();

    
    for(var i = 0; i < loopArray.length; i++){
        console.log("we got to the loop");
        var newScoreEl = document.createElement("div");
        newScoreEl.className = "score-row";

        newScoreEl.textContent = "Initials: " + loopArray[i].initials + " | Score: " + loopArray[i].score;
        showScoresEl.appendChild(newScoreEl);
    }   
}

function playAgain() {
    window.location.reload();
}

function clearScores() {
    localStorage.setItem("scoresArray", JSON.stringify([]));
}

//Listeners and functions to start posting questions
startButton.onclick = timerStart;
setAnswerChoices();
//splitAnswerChoices();
answerEls.addEventListener('click', getInput);
initialButtonEl.addEventListener('click', getInitials);
playAgainEl.addEventListener('click', playAgain);
viewScoresEl.addEventListener('click', clearScores);