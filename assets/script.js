// array of questions
const questions = [
    {
        //uestion #1
        question: 'Arrays in JavaScript can be used to store _______.',
        options: ['Numbers and strings', 'other arrays', 'Booleans', 'All of the above'],
        answer: 'All of the above'
    },
    {
        //Question #2
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        options: ['Javascript', 'Terminal/Bash', 'for loops', 'console.log()'],
        answer: 'console.log()'
    },
    {
        //Question #3
        question: "Which event occurs when the user clicks on an HTML element?",
        options: ['onmouseclick', 'onchange', 'onclick', 'onmouseover'],
        answer: 'onclick'
    },
    {
        //Question #4
        question: 'How can you add a comment in JavaScript?',
        options: ['// This is a comment', '`This is a comment`', '<!-- This is a comment --!>', 'All of the above'],
        answer: '// This is a comment'
    },
    {
        //Question #5
        question: 'Commonly used data types DO NOT include:',
        options: ['Strings', 'Alerts', 'Booleans', 'Numbers'],
        answer: 'Alerts'
    },
    {
        //Question #6
        question: 'The condition in an if/else statement is enclosed with _______.',
        options: ['Parenthesis', 'Quotes', 'Square brackets', 'Curly braces'],
        answer: 'Parenthesis'
    },
    {
        //Question #7
        question: 'Which operator is used to assign a value to a variable?',
        options: ['==', '===', '+=', '='],
        answer: '='
    },
    {
        //Question #8
        question: 'String values must be enclosed within ______ when being assigned to variables.',
        options: ['Square brackets', 'Parenthesis', 'Quotes', 'Curly braces'],
        answer: 'Quotes'
    },
    {
        //Question #9
        question: 'Inside of which HTML element do we put any JavaScript?',
        options: ['<header> </header> tag', '<script> </script> tag', 'You don\'t; it goes elsewhere', 'Wherever you want'],
        answer: '<script> </script> tag'
    },
    {
        // Question #10
        question: 'How many hours/days did it take blair to create this quiz applicatoin?',
        options: ['3.5 days and 4 hours', 'Probably about a day or so', 'No more than a week"', 'Light years'],
        answer: 'Light years'
    }
]

//first div -- the hompage
const homePage = document.getElementById("homepage");
const startButton = document.getElementById("start-button");
//highscores page link -- top left in navbar 
const navEl = document.getElementById("nav-score");
//questions container
const questionContainerElement = document.getElementById("question-container");
//element where the question will be displayed
const questionElement = document.getElementById("question");
//element wwhere the multiple choice option buttons will be displayed
const answerButtonsEl = document.getElementById("answer-btns");
//correct answer message
const correctAnsDisplay = document.getElementById("correct-ans");
//incorrect answer message
const incorrectAnsDisplay = document.getElementById("incorrect-ans");
//the score page - displays after quiz is over
const quizComplete = document.getElementById("score-input");
//inside the span tag; where the score number will be displayed
const yourScore = document.getElementById("display-score");
//initials
const initials = document.getElementById("input-initials");
//high scores page
const elementHighScores = document.getElementById("highscore-log");
//element in which the high scores will log to; the ol tag
const scoreContainer = document.getElementById("scores-log");
//will be located on the initials form page
const subButton = document.getElementById("submit-button");
//will be located on the high scores page
const restartBtn = document.getElementById('restart-button');
//will be located on high scores page
const clearHighScoreBtn = document.getElementById('clear-button');
//variables to track array and time
let currentQuestionIndex = 0;
let shuffledQuestions = null;
//timer -- top right in navbar
var timer = document.getElementById("display-time");
//value of time will be applied to each of the questions index, 
//thereby questions have to be hoisted first, at top
var timeLeft = questions.length * 15;
var timerInterval;
var highScore;
var olEl = document.getElementById('score-logs');


function setTime(){
    //sets interval in a variable
    timerInterval = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            //stops the execution of action at set interval
            gameOver();
        }
    }, 1000);
}

var olEl = document.getElementById("scores-log")
//event listener for restart quiz button click
restartBtn.addEventListener('click', reloadQuiz);
//event listener to clear high score storage
clearHighScoreBtn.addEventListener('click', clearStorage);
//event listener for submit button on initials page
subButton.addEventListener('click', scoreLog);
//event listener for start quiz button -- starts the quiz by firing the startQuiz function
startButton.addEventListener("click", startQuiz);

//event listener for view high score navbar link
navEl.addEventListener('click', h);


//function that fires on restart button click; reloads quiz to take again
function reloadQuiz() {
    location.reload();
  }

function clearStorage() {
  localStorage.clear();
  reloadQuiz();
}


//hide the intro div, unhide the questions div -- apply to the parent which is the main div of the 'box'
//create a clock -- using the time variable -- define it, then apply a timer to execute the function by each second countdown
function startQuiz() {
    highScore = 0;
    //test to make sure our startQuiz function is being called w/startBtn when clicked
    console.log("started");
    //meed to hide the startBtn + title page; need to display the first set of questions
    startButton.classList.add("hide");
    homePage.classList.add("hide");

    shuffledQuestions = questions.sort(() => Math.random() - .5);
    questionContainerElement.classList.remove("hide");
    //start clock -- add to a timer to execute by each second countdown
    //the first thing our startQuiz should do is show the next set of questions
    setNextQuestion();
}

//this function is to pull and display the question and display to the h2 in the question h2 div,
// and then loop thru the options array and dynamically display to the answer-btns on html
function setNextQuestion() {
    var currentQuest = shuffledQuestions[currentQuestionIndex]
    questionElement.textContent = currentQuest.question;
    answerButtonsEl.innerHTML = '';
    //setup a loop such as .each loop thru the options array -- an array solves for one index at a time
    //  -- solve to produce a button element and add both a class and value attribute to the button element
    for (let i = 0; i < currentQuest.options.length; i++) {
        const option = currentQuest.options[i];
        console.log(option);
        var btn = document.createElement("button");
        btn.setAttribute("class", "option btn");
        btn.setAttribute("value", option);
        btn.textContent = "" + option;
        answerButtonsEl.appendChild(btn);
    }
}

answerButtonsEl.onclick = userChoice;
function userChoice(event) {
    var btnEl = event.target;
    if (!btnEl.matches(".option")) {
        return
    }
    if (btnEl.value !== questions[currentQuestionIndex].answer) {
        console.log(questions[currentQuestionIndex].answer);
        incorrectAnsDisplay.removeAttribute('class');
        setTimeout(function(){
            incorrectAnsDisplay.setAttribute('class', 'hide')
        }, 800);
        // alert("Incorrect! You lost 3 seconds");
        time -= 7;
        timer.textContent = time;
        console.log("user's a loser");
    } else {
        correctAnsDisplay.removeAttribute('class');
        setTimeout(function(){
            correctAnsDisplay.setAttribute('class', 'hide')
        }, 800);
        highScore += 10;
        // alert("Correct!")
    }
    currentQuestionIndex++;
    if (time <= 0 || currentQuestionIndex === questions.length) {
        console.log(questions.length);
        console.log("help lol");
        console.log(highScore);
        endQuiz ();
    } else {
        setNextQuestion();
    }
}

function endQuiz() {
    clearInterval(clockTimer);
    yourScore.textContent = highScore;
    localStorage.setItem('scoreContainer', highScore); 
    quizComplete.removeAttribute('class', 'hide');
    quizComplete.setAttribute('class', 'h-style')
    subButton.removeAttribute('class', 'hide');
    subButton.setAttribute('class', 'btn');
    questionContainerElement.setAttribute('class', 'hide');
}

subButton.onclick = scoreLog();

function scoreLog(event) {
    event.preventDefault();
    //need to take in and identify the user input data
    let userInitials = initials.value.trim();
    if (userInitials === "") {
        // return;
        var  highScoreArray = JSON.parse(localStorage.getItem("highScores")) || [];
        var playerScore = {
            score: highScore, 
            initials:userInitials
        }
        //add the score to the array
        highScoreArray.push(playerScore);
        //when sending to local systme must stringify and then set it
        localStorage.setItem("highScores", JSON.stringify(highScoreArray));
    };
    // another way to write these? 
        // homePage.classList.add('hide');
        // quizComplete.classList.add('hide');
        // elementHighScores.classList.remove('hide');
        // questionContainerElement.classList.add('hide');
    homePage.classList.add('hide');
    quizComplete.setAttribute('class', 'hide');
    subButton.setAttribute('class', 'hide');
    elementHighScores.removeAttribute('class', 'hide');
    elementHighScores.setAttribute('class', 'h-style');

    highScoreArray.sort(function(x,y){
        return y.score - x.score;
    })
    scoreContainer.innerHTML = "";
    for (let i = 0; i < highScoreArray.length; i++) {
        let liTag = document.createElement("li");
        liTag.textContent = highScoreArray[i].initials + " - " + highScoreArray[i].score;
        scoreContainer.appendChild(liTag);
        scoreContainer.setAttribute('style', 'color: rgba(27, 27, 93, 0.95)')
    }
}

function gameOver() {
    clearInterval(timerInterval);
    yourScore.textContent = highScore;
    quizComplete.classList.remove('hide');
    questionContainerElement.classList.add('hide');
}

function returnToQuiz() {
    homePage.classList.remove('hide');
    elementHighScores.classList.add('hide');
}


//create an event listener and send to the next function - target the answer-btns div
//create a function, and pass thru event, then define event.target.  Does it match the class you assigned to the button, or solve for the doesnt match.  Also, solve for the wrong answer -- as you have 3 wrong answers and one right one.  You solve for the incorrect and deduct pts off the time.  
//utilize the index variable to ++
//solve to determine are you out of time or out of questions - if either are true, end of quiz, if not, then go back to the nextQuestion function to repeat process.