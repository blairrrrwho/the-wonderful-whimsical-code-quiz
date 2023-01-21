// const part1 = document.getElementById("part1");
// const part2 = document.getElementById("part2");
// const myBtn1 = document.getElementById("btn");

// functionStart = function () {}
// myBtn.addEventListener("click", nameoffunction); 




// part1.querySelector("h1").innerHTML = "this fucking sucks";


// part2.querySelector("button").innerHTML = "this is an answer";

// const myBtn2 = document.createElement("button");
// myBtn2.innerHTML = "this is another fucking button";
// document.getElementById("part2").appendChild(myBtn2);

let startBtn = document.getElementById("start-button");
let homePage = document.getElementById("homepage");

// Defines the startQuiz funtion 
function startQuiz(){
    homePage.classList.add("hidden");

}

// Calls the startQuiz function when the start button is clicked
startBtn.addEventListener('click', startQuiz());

startQuiz();

//  ^^ does this work? 