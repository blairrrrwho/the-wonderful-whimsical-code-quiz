//array of questions
const questions = [
    {
        // Question #1
        question: 'Arrays in JavaScript can be used to store _______.',
        options: ['Numbers and strings', 'other arrays', 'Booleans', 'All of the above'],
        answer: 'All of the above'
    },
    {
        // Question #2
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        options: ['Javascript', 'Terminal/Bash', 'for loops', 'console.log()'],
        answer: 'console.log()'
    },
    {
        // Question #3
        question: "Which event occurs when the user clicks on an HTML element?",
        options: ['onmouseclick', 'onchange', 'onclick', 'onmouseover'],
        answer: 'onclick'
    },
    {
        // Question #4
        question: 'How can you add a comment in JavaScript?',
        options: ['// This is a comment', '`This is a comment`', '<!-- This is a comment --!>', 'All of the above'],
        answer: '// This is a comment'
    },
    {
        // Question #5
        question: 'Commonly used data types DO NOT include:',
        options: ['Strings', 'Alerts', 'Booleans', 'Numbers'],
        answer: 'Alerts'
    },
    {
        // Question #6
        question: 'The condition in an if/else statement is enclosed with _______.',
        options: ['Parenthesis', 'Quotes', 'Square brackets', 'Curly braces'],
        answer: 'Parenthesis'
    },
    {
        // Question #7
        question: 'Which operator is used to assign a value to a variable?',
        options: ['==', '===', '+=', '='],
        answer: '='
    },
    {
        // Question #8
        question: 'String values must be enclosed within ______ when being assigned to variables.',
        options: ['Square brackets', 'Parenthesis', 'Quotes', 'Curly braces'],
        answer: 'Quotes'
    },
    {
        // Question #9
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

//first div
const startButton = document.getElementById("start-button");
const homePage = document.getElementById("homepage");
//highscores - top div
const viewHighScores = document.getElementById("viewhighscore");
//timer
var timer = document.getElementById("display-time");
//questions
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsEl = document.getElementById("answer-btns");
//answers
const correctAnsDisplay = document.getElementById("correct-ans");
const incorrectAnsDisplay = document.getElementById("incorrect-ans");
//scores
const quizComplete = document.getElementById("score-input");
const yourScore = document.getElementById("display-score");
//other
const subButton = document.getElementById("submit-button");
const clearButton = document.getElementById("clear-button");
const restartButton = document.getElementById("restart-button");
//highscores - end
const elementHighScores = document.getElementById("highscore-log");
const scoreContainer = document.getElementById("scores-log");


//variables to track array and time
let shuffledQuestions;
let currentQuestionIndex = 0;
//value of time will be applied to each of the questions index, thereby questions has to be hoisted first, at top
var time = questions.length * 15;
var clockTimer;

// Need to add these things into the rest of our functions now
//starts the quiz -- event listener to button, app goes to function
startButton.addEventListener("click", startGame);

//first function?? hide the intro div, unhide the questions div -- apply to the parent which is the main div of the 'box'
//create a clock -- using the time variable -- define it, then apply a timer to execute the function by each second countdown

function startGame() {
    // Test to make sure our startGame function is being called w/startBtn when clicked
    console.log("started");
    // Need to hide the startBtn + title page; need to display the first set of questions
    startButton.classList.add("hide");
    homePage.classList.add("hide");

    questionContainerElement.classList.remove("hide");

    //start clock -- add to a timer to execute by each second countdown
    clockTimer = setInterval(clock, 1000)
    // First thing our startGame should do is show the next set of questions
    setNextQuestion();

}
function clock(){
    time--;
    timer.textContent = time;

    if(time < 0){
     time = 0;
    }
}

//this function is to pull and display the question and display to the h2 in the question h2 div, and then loop thru the options array and dynamically display to the answer-btns on html
function setNextQuestion() {
    var currentQuest = questions[currentQuestionIndex]

    questionElement.textContent = currentQuest.question;

    answerButtonsEl.innerHTML = '';
    //setup a loop such as .each loop thru the options array -- an array solves for one index at a time -- solve to produce a button element and add both a class and value attribute to the button element
    for (let i = 0; i < currentQuest.options.length; i++) {
        const option = currentQuest.options[i];
        console.log(option);
        var btn = document.createElement("button");
        btn.setAttribute("class", "option");
        btn.setAttribute("value", option);
        btn.textContent = i + "1" + ". " + option;
        answerButtonsEl.appendChild(btn);
    }
    
}

answerButtonsEl.onclick = userChoice;
function userChoice(event) {
    var btnEl = event.target;
    if (!btnEl.matches(".option")) {
        return
    }
    if (btnEl.value !== questions[currentQuestionIndex].answer)
    {
        console.log(questions[currentQuestionIndex].answer);
        incorrectAnsDisplay.removeAttribute('class');
        setTimeout(function(){
            incorrectAnsDisplay.setAttribute('class', 'hide')}, 1000
        );
        // alert("Incorrect! You lost 3 seconds");
        time -= 3;
        timer.textContent = time;
        console.log("user's a loser");
    } else {
        correctAnsDisplay.removeAttribute('class');
        setTimeout(function(){
            correctAnsDisplay.setAttribute('class', 'hide')}, 1000
        );
        // alert("Correct!")
    }
    currentQuestionIndex++;
    if (time <= 0 || currentQuestionIndex === questions.length) {
        console.log(questions.length);
        console.log("help lol");
        clockTimer = time;
        endGame ();
    } else {
        setNextQuestion();
    }
}

function endGame() {
    localStorage.setItem('scoreContainer', time);
}



//create an event listener and send to the next function - target the answer-btns div
//create a function, and pass thru event, then define event.target.  Does it match the class you assigned to the button, or solve for the doesnt match.  Also, solve for the wrong answer -- as you have 3 wrong answers and one right one.  You solve for the incorrect and deduct pts off the time.  
//utilize the index variable to ++
//solve to determine are you out of time or out of questions - if either are true, end of game, if not, then go back to the nextQuestion function to repeat process.