console.log("hey")


//DOM elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("option-container");
const currentQuestionSpan = document.getElementById("start-question-index");
const totalQuestionsSpan = document.getElementById("end-question-index");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("scored-marks");
const maxScoreSpan = document.getElementById("max-marks");
const resultMessage = document.getElementById("result-msg");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

//Quiz State Vars
let currentQuestionIndex=0;
let currentScore=0;
let answerDisabled=false;

totalQuestionsSpan.textContent=quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length;

//event listeners
startButton.addEventListener("click",startQuiz)
restartButton.addEventListener("click",restartQuiz)

function startQuiz(){
    console.log("Quiz started");
    //reset vars
    currentQuestionIndex=0
    currentScore=0
    scoreSpan.textContent=0

    //Change page
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestions();
}

function showQuestions(){
    answerDisabled=false;
    const currentQuestion= quizQuestions[currentQuestionIndex];
    currentQuestionSpan.innerText=currentQuestionIndex+1;
    const currentProgress=(currentQuestionIndex/quizQuestions.length)*100;
    progressBar.style.width = currentProgress + "%";

    questionText.textContent=currentQuestion.question;

    //option render
    answersContainer.innerHTML=""

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.textContent=answer.text;
        
        button.classList.add("ans-btn");

        //dataset is a property of button that allows developer to store custom data
        button.dataset.correct=answer.correct;

        button.addEventListener("click",selectAnswer);
        answersContainer.appendChild(button);
    })
}

function selectAnswer(event){
    if(answerDisabled) return;
    answerDisabled=true;
    const selectedButton=event.target;
    const isCorrect=selectedButton.dataset.correct==="true";

    if(isCorrect){
        selectedButton.classList.add("correct");
        currentScore++;
        scoreSpan.textContent=currentScore;
    }else{
        selectedButton.classList.add("incorrect");
    }

    setTimeout(()=>{
        currentQuestionIndex++;
        if (currentQuestionIndex===quizQuestions.length){
            showResults();
        }else{
            showQuestions();
        }
    },1000);
}

function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent=currentScore;

    const percentage=(currentScore/quizQuestions.length)*100;
    if(percentage==100){
        resultMessage.textContent="Perfect you are a Genius!";
    }else if(percentage>=80){
        resultMessage.textContent="Great Job! You Know the stuff!";
    }else if(percentage>=60){
        resultMessage.textContent="Not bad! Try again to improve!"
    }else{
        resultMessage.textContent="Keep studying! you will get better!"
    }
}

function restartQuiz(){
    console.log("ReQuiz started");
    resultScreen.classList.remove("active");
    startQuiz();
}