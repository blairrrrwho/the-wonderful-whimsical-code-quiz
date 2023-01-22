const startButton = document.getElementById("start-button");
const homePage = document.getElementById("homepage");
const questionContainerElement = document.getElementById("question-container");

startButton.addEventListener("click", startGame);

// What needs to happen when you click the start button 
function startGame() {
    // Test to make sure our startGame function is being called w/startBtn when clicked
    console.log("started");
    // Need to hide the startBtn + title page; need to display the first set of questions
    startButton.classList.add("hide");
    homePage.classList.add("hide");
    questionContainerElement.classList.remove("hide");



}

// Function that will set up the next question
// Next button or set up so that choice clicked from previous question acts as next button
function setNextQuestion() {

}

// Does something when the user selects an answer
function selectAnswer() {

}
