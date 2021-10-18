const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));


let currentQuestion = {};
let acceptAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions  = [];

let questions  = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: "<Script>",
        choice2: "<JavaScript>",
        choice3: "<js>",
        choice4: "<Scripting>",
        answer: 1,
    },
    {
        question: "What is the correct syntax for reffering to an external script called 'xxx.js'?",
        choice1: "<Script href = 'xxx.js'>",
        choice2: "<Script name  = 'xxx.js'>",
        choice3: "<Script src = 'xxx.js'>",
        choice4: "<Script file = 'xxx.js'>",
        answer: 3,
    },
    {
        question: "How do we write messages to an alert box?",
        choice1: "msgBox('Hello World!')",
        choice2: "alertBox('Hello world!')",
        choice3: "msg('Hello World!')",
        choice4: "alert('Hello World!')",
        answer: 4,
    },


];

//Constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame =() => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () =>{

    if(availableQuestions.length ==0 || questionCounter >= MAX_QUESTIONS)
    {
        return window.location.assign("/end.html");
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex,1);
    // console.log(availableQuestions);
    acceptAnswers = true;
};
    choices.forEach(choice =>{
        choice.addEventListener('click', e=>{
            if(!acceptAnswers) return;

            acceptAnswers = false;

            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset["number"];

            const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
            selectedChoice.parentElement.classList.add(classToApply);
            setTimeout(() =>{
                selectedChoice.parentElement.classList.remove(classToApply);

                getNewQuestion();

            }, 1000);
        });
    });



startGame();