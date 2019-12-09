//MY VARIABLES
var startQuiz = document.querySelector("#startquiz");
var timer = document.querySelector("#timer");
var ptag = document.querySelector("p");
var box = document.querySelector(".col-md-12");
var h1 = document.querySelector("h1");
var choicesbox = document.querySelector(".choicesbox");
var button = document.querySelector("button");
var form = document.querySelector("form")
var userScore = document.querySelector("#userscore");
var userInput = document.querySelector("#addyourself");
var highscore = document.querySelector("#highscore");
var nav = document.querySelector("nav");
var container = document.querySelector(".container");
var scorecontainer = document.querySelector(".scorecontainer");
var scorebox = document.querySelector("#scorebox");
var goback = document.querySelector("#goback");
var view = document.querySelector("#view");
var scoreheader = document.querySelector("#scoreheader")

//code questions in an array defined as objects with multiple properties
var questions = [{
    title: "Commonly used data types DO NOT include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["Quotes", "Parentheses", "Curly brackets", "Square brackets"],
    answer: "Parentheses"
  },
  {
    title: "What does HTML stand for?",
    choices: ["Home Tool Markup Language", "Hyperlinks and Text Markup Language ", "Hyper Text Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    title: "What is the HTML tag under which one can write the JavaScript code?",
    choices: ["<javascript>", "<scripted>", "<script>", "<js>"],
    answer: "<script>"
  },
  {
    title: "You can only use the document method querySelector() in your javascript file to return the first Element within the document that matches the specified selector, or group of selectors. ",
    choices: ["True", "False"],
    answer: "False"
  },
  // {
  //   title: "What is the correct HTML for creating a hyperlink?",
  //   choices: ["A>http://www.vbimedia.com", "A url='http://www.vbimedia.com'>VBIMEdia.com", "A href='http://www.vbimedia.com'>VBIMEDIA"],
  //   answer: "A href='http://www.vbimedia.com'>VBIMEDIA"
  // },
];

//created a global variable to store the value of my timer so I can dynamically update where my timer starts and adds to
var start;

//MUST always have a counter to start from
var counter = 0

//in order to stop the timer I need a global variable to reference it in two functions
var timerInterval;

//created an object array to keep track of scores and initials
var score = [];




//AT PAGE LOAD

//when page loads hide form element
form.style.display = "none";

//when page loads browser pulls object stored in local storage if available
if (localStorage.getItem("score")) {
  console.log("LOCAL STORAGE = TRUE");
  score = JSON.parse(localStorage.getItem("score"));
  console.log("score = " + JSON.stringify(score));
} else {
  score = [];
}




//ALL MY CLICK EVENTS

//this event starts the timer
startQuiz.addEventListener("click", startTimer);

//this event hides the image, ptag and Start Quiz elements
startQuiz.addEventListener("click", hideElement);

//this event renders the first set of questions in the array
startQuiz.addEventListener("click", RenderQ);

//this event renders the first set of choices in the var question's array
startQuiz.addEventListener("click", RenderChoices);

//check if answer is correct. if the answer is correct render the next set of choices & questions. If false then alert and add 10 secs.
//running a click event method on the choicesbox div
choicesbox.addEventListener("click", function (event) {
  //creating variable for property Answer that is in the object array "questions"
  var correctAnswer = questions[counter].answer;
  console.log(correctAnswer);
  //creating variable for property choices that is in the object array "questions"
  var C = questions[counter].choices;
  console.log(C);
  //running an if/else statement if what I click is true go to the next if statement
  if (event.target.matches("button")) {
    //if in the choicesbox div user clicks on a button then show me the text in that target
    console.log(event.target.textContent);
    //another if/else statement with a for loop to identify if the text in the button matchs the correct answer and if it does hide the buttons and run the next set of questions and choices dyanmically
    if (event.target.textContent === correctAnswer) {
      alert("Woohoo!");
      var choiceChildren = event.target.parentElement.children;
      console.log(choiceChildren);
      // for (var i = 0; i < choiceChildren.length; i++) {
      //   choiceChildren[i].style.display = "none";
      // };
      counter++;
      console.log(counter);
      //nested if statement to check once the answer is true if the counter is less than the array
      if (counter < questions.length) {
        RenderQ();
        RenderChoices();
      } else {
        //stop timer
        stopTimer();
        //show score and userinput. hide elements
        displayscoreinput();
        form.addEventListener("submit", function (event) {
          initials = userInput.value.trim();
          console.log("score array 1 = " + JSON.stringify(score));
          score.push({
            "score": start,
            "name": initials
          });
          console.log("score array 2 = " + JSON.stringify(score));
          localStorage.setItem("score", JSON.stringify(score));
          window.location.reload(true);
        });
      }
    } else {
      alert("Wrong answer! Your timer increased by 10 secs.");
      start += 10;
      console.log("start = " + start);
    };
  };
});

//when user clicks "View Highscore" it runs the display scoreboard and loadscore function
highscore.addEventListener("click", function (event) {
  displayscoreboard();
  loadscore();
  view.style.display = "none";
  goback.textContent = "< Go Back";
  timer.style.display = "none";
});

//when user clicks on "go back" it reload the page and return to the previous page
goback.addEventListener("click", function (event) {
  window.location.reload(true);
})

//when user clicks "clear score" button. Removes from local storage
scorebox.addEventListener("click", function (event) {
  var element = event.target;
  console.log(element);

  // If that element is a button...
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.dataset.index;
    console.log("position of element" + index)
    score.splice(index, 1);
    console.log("object array " + JSON.stringify(score));
    // store changes to local storage
    localStorage.setItem("score", JSON.stringify(score));
    // clear scorebox
    scorebox.textContent = "";
    // render updated score
    loadscore();
  }
})




//ALL MY FUNCTIONS

//hide elements and display form element
function displayscoreinput() {
  choicesbox.style.display = "none";
  h1.style.display = "none";
  userScore.textContent = "Your score is " + start;
  console.log(start);
  form.style.display = "";
};

//this function hides the some elements when the user clicks "start quiz"
function hideElement() {
  ptag.style.display = "none";
  startQuiz.style.display = "none";
}

//this function starts the timer on the top right corner of the page
function startTimer() {
  start = 0;
  timerInterval = setInterval(function () {
    start++;
    console.log(start);
    timer.textContent = "Time: " + start;
    console.log(timer);
  }, 1000);
}

//this function stops the timer
function stopTimer() {
  clearInterval(timerInterval)
}
//Render the question(object) title property
function RenderQ() {
  h1.textContent = questions[counter].title;
  h1.style.textAlign = "none";
  choicesbox.style.textAlign = "none";
}

//Render the question(object) choices property
function RenderChoices() {
  var C = questions[counter].choices;
  choicesbox.textContent = '';
  console.log("all the choices :" + C);
  for (var i = 0; i < C.length; i++) {
    console.log(i);
    var choicesbutton = document.createElement("button");
    choicesbutton.textContent = questions[counter].choices[i];
    choicesbox.appendChild(choicesbutton);
    choicesbutton.setAttribute("class", "submitbutton")
  };
}

//Display scoreboard div
function displayscoreboard() {
  container.style.display = "none";
  scorecontainer.style.display = "";
  scoreheader.textContent = "Scoreboard"
}

//loads the object array of score
function loadscore() {
  for (var i = 0; i < score.length; ++i) {
    var newLI = document.createElement("li");
    //newLI.innerHTML = JSON.stringify(score[i]) + "<button>Clear Score</button>";
    console.log(score[i].name + score[i].score);
    newLI.innerHTML = "Name: " + score[i].name + "| Score: " + score[i].score + "<button>Clear Score</button>";
    newLI.setAttribute("data-index", i);
    scorebox.appendChild(newLI);
  }
};


//Console log