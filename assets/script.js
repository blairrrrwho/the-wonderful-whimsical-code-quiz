const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-btn");
const homePage = document.getElementById("homepage");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-btns");
const correctAnsDisplay = document.getElementById("correct-ans");
const incorrectAnsDisplay = document.getElementById("incorrect-ans");

// Defaults both of these values to undefined, which is OK for what we need these variables for
let shuffledQuestions;
let currentQuestionIndex;


startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion();
})

// What needs to happen when you click the start button -- Starts the game function
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
    setNextQuestion();

}

// Function that will set up the next question
// Next button or set up so that choice clicked from previous question acts as next button
function setNextQuestion() {
    // Resets everything back to its default state every time we set a new question
    resetState()
    // Want to get and show the next question; create a function and put shuffledQuestions inside parameter
    showQuestion(shuffledQuestions[currentQuestionIndex])
    // showQuestion(state.quizState.shuffledQuestions[state.quizState.currentQuestionIndex])

}

function showQuestion (question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            // Adds a data attribute to the newly created button
            // We don't do so for the false answers bc we don't want them in our data attribute
            // Because they are just going to be strings, not actual booleans
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        // Adds this to the answerButtonsElement
        answerButtonsElement.appendChild(button);
    })
}

function resetState() {
    // Use next button to target this; clears out the default values in HTML and doesn't show them
    clearStatusClass(document.body) 
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}


// Does something when the user selects an answer
// Takes in our even from above as a parameter 
function selectAnswer(event) {
    // This is just whatever button the user clicks on
    const selectedButton = event.target;
    // Created variable checks to see if it's the correct answer or not
    const correct = selectedButton.dataset.correct;
    
    // if (correct === undefined) {
    //     state.quizState.timeRemaining -= 10
    // }

    // Create a function to set the status class of our body
    // It's going to take whether or not it actually should be set to correct or incorrect
    setStatusClass(document.body, correct);
    // We need to loop through all of the other buttons and select and set the class for them
    // Convert this to an array bc this is returning a live collection; need to use for the for each loop
    Array.from(answerButtonsElement.children).forEach(button => {
        // Set the status for the other buttons
        // Want to set the status on whether or not that answer was a correct answer
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else { 
        getInitialsPage()
        // ^^^^^^ need to create and define
    }
}

// Defining setStatusClass function
// In the parameters we are going to take an element, and whether or not it is correct
function setStatusClass(element, correct) {
    // clearStatusClass(element)
    if (correct) {
        element.classList.add("correct"); correctAnsDisplay.classList.remove("hide");
    } else {
        element.classList.add("incorrect"); incorrectAnsDisplay.classList.remove("hide")
    }

// doesn't work to display correct or incorrect on screen
    // if (correct) {
    //     correctAnsDisplay.classList.remove("hide");
    // } else {
    //     incorrectAnsDisplay.classList.remove("hide");
    // }
}

// Defining clearStatusClass function; takes the element in the parameter 
// Want to remove these classes instead of add them
function clearStatusClass (element) {
    element.classList.remove("correct");
    element.classList.remove("incorrect");
    correctAnsDisplay.classList.add("hide");
    incorrectAnsDisplay.classList.add("hide");
}



// List of questions initialized a giant array
// Inside of the array, we have 10 objects - each object poses as one of our questions
// Inside of each question we have a few elements: a question property and an answers property
// The question property contains a string
// The answers property contains an array of four objects 
// Within each of those objects is text property containing a string, and a correct property containing a boolean
// The boolean keys out our correct answer value 
// Inserted a comment above each question to number strictly for my own reference and editing purposes
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
