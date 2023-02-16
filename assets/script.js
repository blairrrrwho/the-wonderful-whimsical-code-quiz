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
// //element in which the high scores will log to; the ol tag
const scoreContainer = document.getElementById("scores-log");
//will be located on the initials form page
const subButton = document.getElementById("submit-button");
//will be located on the high scores page
const restartBtn = document.getElementById('restart-button');
//will be located on high scores page
const clearHighScoreBtn = document.getElementById('clear-button');

// const highScoreEl = document.getElementById("hisco-id");
// //highscores page link -- top left in navbar 
// const navEl = document.getElementById("nav-score"); 
// // //event listener for view high score navbar link
// // navEl.addEventListener('click', hiScorePage????);
// // var olEl = document.getElementById('scores-log'); ???


//variables to track array and time
let currentQuestionIndex = 0;
let shuffledQuestions = null;
//timer -- top right in navbar
var timer = document.getElementById("display-time");
//value of time will be applied to each of the questions index, 
//thereby questions have to be hoisted first, at top
var timeLeft = questions.length * 7;
var timerInterval;
var highScore;

//event listener for start quiz button -- starts the quiz by firing the startQuiz function
startButton.addEventListener("click", startQuiz);

//event listener for submit button on initials page
subButton.addEventListener('click', elementHighScores);

//countdown timer function
function setTime(){
    //sets interval in a variable
    timerInterval = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            //stops the execution of action at set interval
            endQuiz();
        }
    }, 1000);
}

// //event listener for restart quiz button click
restartBtn.addEventListener('click', reloadQuiz);

// reload the quiz to retake
function reloadQuiz() {
    location.reload();
    console.log('i reloaded the quiz');
  }


 //event listener to clear high score storage
clearHighScoreBtn.addEventListener('click', clearStorage);

function clearStorage() {
  localStorage.clear();
  console.log('i cleared the local storage');
}


restartBtn.setAttribute('class', 'hide');
clearHighScoreBtn.setAttribute('class', 'hide');

function returnToQuiz() {
    homePage.classList.remove('hide');
    elementHighScores.classList.add('hide');
}





function startQuiz() {
    console.log("i clicked the startQuiz button");
    highScore = 0;
    console.log("started");
    startButton.classList.add("hide");
    homePage.classList.add("hide");

    shuffledQuestions = questions.sort(() => Math.random() - .5);
    questionContainerElement.classList.remove("hide");
    //start clock -- add to a timer to execute by each second countdown
    //the first thing our startQuiz should do is show the next set of questions
    setTime();
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
        btn.setAttribute("class", "option btn btn-flex");
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
        incorrectAnsDisplay.removeAttribute('class', 'hide');
        setTimeout(function(){
            incorrectAnsDisplay.setAttribute('class', 'hide');
        }, 700);
        // alert("Incorrect! You lost 27 seconds");
        timeLeft -= 7;
        timer.textContent = timeLeft;
        console.log("user's a loser");
    }  else {
            correctAnsDisplay.removeAttribute('class', 'hide');
            setTimeout(function(){
                correctAnsDisplay.setAttribute('class', 'hide');
            }, 700);
            highScore += 7;
            // alert("Correct!")
        }

    currentQuestionIndex++;
    if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
        console.log(questions.length);
        console.log("help lol");
        console.log(highScore);
        endQuiz ();
            console.log("i started the end of the quiz");
    } else {
        setNextQuestion();
            console.log("i went to the next question");
      }
}

// main page after game is over w/score and initials input
function endQuiz() {
    clearInterval(timerInterval);
    yourScore.textContent = highScore;
    quizComplete.removeAttribute('class', 'hide');
    quizComplete.setAttribute('class', 'h-style');
    quizComplete.setAttribute('style', 'margin-top: 0%');
    questionContainerElement.setAttribute('class', 'hide');   
    subButton.removeAttribute('class', 'hide');
    subButton.classList.add('btn', 'btn-flex');
    localStorage.setItem('scoreContainer', highScore); 
}


subButton.onclick = scoreLog;

// logs the player's initials and score to the high score page
// also saves the values to local storage as an object
function scoreLog() {
    subButton.setAttribute('class', 'hide');
    restartBtn.removeAttribute('class', 'hide');
    restartBtn.classList.add('btn', 'btn-flex');
    clearHighScoreBtn.removeAttribute('class', 'hide');
    clearHighScoreBtn.classList.add('btn', 'btn-flex');

    //need to take in and identify the user input data
    let userInitials = initials.value.trim();
    if (userInitials === "") {
        // return;
    }

    var highScoreArray = JSON.parse(localStorage.getItem("highScores")) || [];
    var playerScore = {
        score: highScore, 
        initials:userInitials
    };

    console.log(playerScore);
    //add the score to the array
    highScoreArray.push(playerScore);
    //when sending to local systmem must stringify and then set it
    localStorage.setItem("highScores", JSON.stringify(highScoreArray));
    quizComplete.setAttribute('class', 'hide');
    // this is what makes the score log show up
    elementHighScores.removeAttribute('class', 'hide');
    highScoreArray.sort(function(x,y){
        return y.score - x.score;
    })
    // this prints the high score and initials of user on the page
    scoreContainer.innerHTML = "";
    for (let i = 0; i < highScoreArray.length; i++) {
        let li = document.createElement("li");
        li.textContent = highScoreArray[i].initials + "     --------     " + highScoreArray[i].score;
        scoreContainer.appendChild(li);
        scoreContainer.setAttribute('style', 'font-weight:bolder; color: rgba(27, 27, 93, 0.95)', 'line-height: 1.5')
    }
}





    // another way to write these? 
        // homePage.classList.add('hide');
        // quizComplete.classList.add('hide');
        // elementHighScores.classList.remove('hide');
        // questionContainerElement.classList.add('hide');

//notes sandy left: 

//create an event listener and send to the next function - target the answer-btns div
//create a function, and pass thru event, then define event.target.  Does it match the class you assigned to the button, or solve for the doesnt match.  Also, solve for the wrong answer -- as you have 3 wrong answers and one right one.  You solve for the incorrect and deduct pts off the time.  
//utilize the index variable to ++
//solve to determine are you out of time or out of questions - if either are true, end of quiz, if not, then go back to the nextQuestion function to repeat process.