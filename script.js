const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Transfer Machine Language",
      "Hyperlink Text Management Language",
      "Hyper Tool Multi Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which CSS property changes the text color?",
    options: ["text-color", "font-color", "color", "text-style"],
    answer: "color"
  },
  {
    question: "Which keyword is used to define a variable in JavaScript?",
    options: ["var", "let", "Both A and B", "None"],
    answer: "Both A and B"
  },
  {
    question: "Which HTML tag is used for inserting an image?",
    options: ["<img>", "<image>", "<src>", "<pic>"],
    answer: "<img>"
  },
  {
    question: "JavaScript is a ___ language?",
    options: ["Compiled", "Interpreted", "Markup", "Database"],
    answer: "Interpreted"
  }
];

// Added 5 more questions
quizData.push(
  {
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which HTML element is used for an unordered list?",
    options: ["<ol>", "<ul>", "<li>", "<list>"],
    answer: "<ul>"
  },
  {
    question: "Which method parses a JSON string into a JavaScript object?",
    options: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "JSON.convert()"],
    answer: "JSON.parse()"
  },
  {
    question: "Which company originally developed JavaScript?",
    options: ["Microsoft", "Sun Microsystems", "Netscape", "Mozilla"],
    answer: "Netscape"
  },
  {
    question: "What does DOM stand for in web development?",
    options: ["Document Object Model", "Data Object Management", "Document Order Model", "Display Object Model"],
    answer: "Document Object Model"
  }
);

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let currentQuestion = 0;
let score = 0;
let hintTimeout = null;

// Bottom-right hint element to show the correct answer on wrong selection
const answerHint = document.createElement('div');
answerHint.id = 'answer-hint';
answerHint.style.position = 'fixed';
answerHint.style.bottom = '16px';
answerHint.style.right = '16px';
answerHint.style.background = 'rgba(0,0,0,0.8)';
answerHint.style.color = '#fff';
answerHint.style.padding = '10px 14px';
answerHint.style.borderRadius = '8px';
answerHint.style.fontSize = '14px';
answerHint.style.display = 'none';
answerHint.style.zIndex = '9999';
document.body.appendChild(answerHint);

function loadQuestion() {
  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = `${currentQuestion + 1}. ${currentQuiz.question}`;
  optionsEl.innerHTML = "";
  // hide any previous answer hint
  answerHint.style.display = 'none';
  answerHint.textContent = '';

  currentQuiz.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => selectOption(li, currentQuiz.answer));
    optionsEl.appendChild(li);
  });
}

function selectOption(selectedLi, correctAnswer) {
  const allOptions = optionsEl.querySelectorAll("li");
  allOptions.forEach(li => li.style.pointerEvents = "none");

  if (selectedLi.textContent === correctAnswer) {
    selectedLi.style.backgroundColor = "#00FF7F";
    score++;
    // hide hint if it was visible
    answerHint.style.display = 'none';
    if (hintTimeout) {
      clearTimeout(hintTimeout);
      hintTimeout = null;
    }
  } else {
    selectedLi.style.backgroundColor = "#FF6347";
    // show the correct answer in the bottom-right corner
    answerHint.textContent = `Correct answer: ${correctAnswer}`;
    answerHint.style.display = 'block';
    // auto-hide after 4 seconds
    if (hintTimeout) clearTimeout(hintTimeout);
    hintTimeout = setTimeout(() => {
      answerHint.style.display = 'none';
      hintTimeout = null;
    }, 4000);
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  resultBox.classList.add("visible");
  scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  loadQuestion();
});

loadQuestion();
