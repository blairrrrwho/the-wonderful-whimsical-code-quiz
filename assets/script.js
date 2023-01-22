const startButton = document.getElementById("start-button");
const homePage = document.getElementById("homepage");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-btns");

// Defaults both of these values to undefined, which is OK for what we need these variables for
let shuffledQuestions;
let currentQuestionIndex;

startButton.addEventListener("click", startGame);

// What needs to happen when you click the start button 
function startGame() {
    // Test to make sure our startGame function is being called w/startBtn when clicked
    console.log("started");
    // Need to hide the startBtn + title page; need to display the first set of questions
    startButton.classList.add("hide");
    homePage.classList.add("hide");
    // Shuffles all of the questions so that Question #1 won't always show up as the fist one, etc.
    // Math.random() gives us a number between 0 and 1
    // We subtract that by 0.5 to get a number either <0 or >0 50% of the time, which gives us a completely random array
    shuffledQuestions = questions.sort(() => Math.random()- 0.5);
    // Set to 0 since we're starting on the first question of our shuffled questions array
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    // First thing our startGame should do is show the next set of questions
    setNextQuestion()



}

// Function that will set up the next question
// Next button or set up so that choice clicked from previous question acts as next button
function setNextQuestion() {
    // Want to get nd show the next question; create a function and put in shuffledQuestions
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion (question) {
    questionElement.innerText = question.question;
}



// Does something when the user selects an answer
function selectAnswer() {

}


// List of questions initialized as an array
// The first object in the array is going to be the first question 
// Each question is going to have some elements:
//   ^The first one is going to be the actual question itself, which is just the text of the question
// Then there will be an array which will have our answers
// Answers are going to have an ojbect which is going to have a text keyword -- the correct answer

const questions = [
    {
        // Question #1
        question: "Arrays in JavaScript can be used to store _______.",
        answers: 
        [
            { text: "Numbers and strings", correct: false },
            { text: "Other arrays", correct: false },
            { text: "Booleans", correct: false },
            { text: "All of the above", correct: true }
        ]
    },
    {
        // Question #2
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: 
        [
            { text: "JavaScript", correct: false },
            { text: "Terminal/Bash", correct: false },
            { text: "for loops", correct: false },
            { text: "console.log()", correct: true }
        ]
    },
    {
        // Question #3
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: 
        [
            { text: "onmouseclick", correct: false },
            { text: "onchange", correct: false },
            { text: "onclick", correct: true },
            { text: "onmouseover", correct: false }
        ]
    },
    {
        // Question #4
        question: "How can you add a comment in JavaScript?",
        answers: 
        [
            { text: "// This is a comment", correct: true },
            { text: "`This is a comment`", correct: false },
            { text: "<!-- This is a comment --!>", correct: false },
            { text: "all of the above", correct: false }
        ]
    },
    {
        // Question #5
        question: "Commonly used data types DO NOT include:",
        answers: 
        [
            { text: "Strings", correct: false },
            { text: "Alerts", correct: true },
            { text: "Booleans", correct: false },
            { text: "Numbers", correct: false }
        ]
    },
    {
        // Question #6
        question: "The condition in an if/else statement is enclosed with _______",
        answers: 
        [
            { text: "Parenthesis", correct: true },
            { text: "Quotes", correct: false },
            { text: "Square brackets", correct: false },
            { text: "Curly braces", correct: false }
        ]
    },
    {
        // Question #7
        question: "Which operator is used to assign a value to a variable?",
        answers: 
        [
            { text: "==", correct: false },
            { text: "===", correct: false },
            { text: "+=", correct: false },
            { text: "=", correct: true }
        ]
    },
    {
        // Question #8
        question: "String values must be enclosed within ______ when being assigned to variables",
        answers: 
        [
            { text: "Square brackets", correct: false },
            { text: "Parenthesis", correct: false },
            { text: "Quotes", correct: true },
            { text: "Curly braces", correct: false }
        ]
    },     
    {
        // Question #9
        question: "Inside of which HTML element do we put any JavaScript?",
        answers: 
        [
            { text: "<header> </header> tag", correct: false },
            { text: "<script> </script> tag", correct: true },
            { text: "You don't; it goes elsewhere", correct: false },
            { text: "Wherever you want", correct: false }
        ]
    },     
    {
        // Question #10
        question: "How many hours/days did it take blair to create this quiz applicatoin?",
        answers: 
        [
            { text: "3.5 days and 4 hours", correct: false },
            { text: "Probably about a day or so", correct: false },
            { text: "No more than a week", correct: false },
            { text: "Light years", correct: true }
        ]
    }      
]
