var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

//quiz questions 
var quizQuestions = [{
    question: "Which type of JavaScript language is?",
    choiceA: "Object-Oriented",
    choiceB: "Object-Based",
    choiceC: "Assembly-Language",
    choiceD: "High-level",
    correctAnswer: "b"},
  {
    question: "Which one of the following also known as Conditional Expression:",
    choiceA: "Alternative to if-else",
    choiceB: "Switch statement",
    choiceC: "if-then-else statement",
    choiceD: "immediate if",
    correctAnswer: "d"},
   {
    question: "In JavaScript, what is a block of statement",
    choiceA: "Conditional block",
    choiceB: "block that combines a number of stateements into a single compound statement",
    choiceC: "both conditional block and a single statement",
    choiceD: "block that contains a single statement",
    correctAnswer: "b"},
    {
    question: "What HTML tags are JavaScri",
    choiceA: "&lt;div&gt;",
    choiceB: "&lt;link&gt;",
    choiceC: "&lt;head&gt;",
    choiceD: "&lt;script&gt;",
    correctAnswer: "d"},
    {
    question: "The 'function' and 'var' are known as:",
    choiceA: "Keywords",
    choiceB: "Data types",
    choiceC: "Declaration statements",
    choiceD: "Prototypes",
    correctAnswer: "c"},  
    {
    question: "When there is an indefinite or an infinite value during an arithmetic computation in a program, then JavaScript prints______.",
    choiceA: "Prints an exception error",
    choiceB: "Prints an overflow error",
    choiceC: "Displays 'Infinity'",
    choiceD: "Prints the value as such",
    correctAnswer: "c"},
    {
    question: "In the JavaScript, which one of the following is not considered as an error:",
    choiceA: "Syntax error",
    choiceB: "Missing of semicolons",
    choiceC: "Division by zero",
    choiceD: "Missing of Bracket",
    correctAnswer: "c"},

    ];

//global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

//function to generate the questions and answers
function generateQuizQuestion()
{
    gameoverDiv.style.display = "none";

    if (currentQuestionIndex === finalQuestionIndex)
    {
        return showScore();
    }

    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

//function that starts the quiz and the time ranges, and displays the first question 
function startQuiz()
{
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() 
    {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if(timeLeft === 0) 
        {
          clearInterval(timerInterval);
          showScore();
        }

    }, 1000);
    quizBody.style.display = "block";
}


//function that displays the score after completition or timer run out 
function showScore()
{
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

//click the submit button and runs the highscore function and also saves previous scores 
submitScoreBtn.addEventListener("click", function highscore()
{
    if(highscoreInputName.value === "") 
    {
        alert("Initials cannot be blank");
        return false;
    }
    else
    {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});

//clear the list, saves and generate new high scores 
function generateHighscores()
{
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];

    for (i=0; i<highscores.length; i++)
    {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

//display high scores
function showHighscore()
{
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";
    generateHighscores();
}

//clear local storage fo the high scores
function clearScore()
{
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

//This function sets all the variables back to their original values and shows the home page to enable replay of the quiz:
function replayQuiz()
{
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

//this function check the resonse of each answer 
function checkAnswer(answer)
{
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex)
    {
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();

        //display in the results div that the answer is correct.
    }

    else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex)
     {
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();

        //display in the results div that the answer is wrong.
    }
    else
    {
        showScore();
    }
}

//start quiz button 
startQuizButton.addEventListener("click",startQuiz);