let currentQuestionIndex = 0;
let score = 0;
let time = 600; // 10 minutes in seconds
let questions = [];

const timerElement = document.getElementById('timer');
const quizContainer = document.getElementById('quiz-container');

// Fetch questions from the JSON file
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    loadQuestion();
    startTimer();
  })
  .catch(error => console.error('Error loading questions:', error));

function startTimer() {
  const timer = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerElement.innerText = `${minutes} minutes ${seconds < 10 ? '0' : ''}${seconds} seconds left`;
    if (time <= 0) {
      clearInterval(timer);
      endExam();
    } else {
      time--;
    }
  }, 1000);
}

function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endExam();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  quizContainer.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">${currentQuestion.questionText}</h2>
    <div class="options">
      ${currentQuestion.options.map(option => `
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
          onclick="handleAnswer(${option.isCorrect})"
        >
          ${option.text}
        </button>
      `).join('')}
    </div>
  `;
}

function handleAnswer(isCorrect) {
  if (isCorrect) {
    score++;
  }
  currentQuestionIndex++;
  loadQuestion();
}

function endExam() {
  localStorage.setItem('score', score);
  window.location.href = 'result.html';
}
