const co2Range = document.getElementById('co2Range');
const requestsRange = document.getElementById('requestsRange');
const co2Value = document.getElementById('co2Value');
const requestsValue = document.getElementById('requestsValue');
const impactText = document.getElementById('impactText');
const impactNumber = document.getElementById('impactNumber');

function updateImpact() {
  const co2 = Number(co2Range.value);
  const requests = Number(requestsRange.value);
  const total = co2 * requests;

  co2Value.textContent = co2;
  requestsValue.textContent = requests;
  impactNumber.textContent = total;

  if (total < 400) {
    impactText.textContent = 'Impatto basso: uso moderato e relativamente efficiente.';
  } else if (total < 900) {
    impactText.textContent = 'Impatto medio: l’uso cresce e servono più risorse.';
  } else {
    impactText.textContent = 'Impatto alto: più richieste e maggiore consumo di energia.';
  }
}

co2Range.addEventListener('input', updateImpact);
requestsRange.addEventListener('input', updateImpact);
updateImpact();

const quizData = [
  {
    question: 'Che cos’è la transizione energetica?',
    options: [
      'Il passaggio da fonti fossili a fonti più sostenibili',
      'L’aumento del consumo di petrolio',
      'La costruzione di più discariche'
    ],
    correct: 0
  },
  {
    question: 'Perché l’IA ha un impatto ambientale?',
    options: [
      'Perché esiste solo online e non consuma nulla',
      'Perché richiede data center, chip e molta energia',
      'Perché funziona senza elettricità'
    ],
    correct: 1
  },
  {
    question: 'Quale idea appartiene all’economia circolare?',
    options: [
      'Buttare spesso i dispositivi elettronici',
      'Ridurre, riutilizzare, riparare e riciclare',
      'Produrre più rifiuti'
    ],
    correct: 1
  }
];

const quizStep = document.getElementById('quizStep');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');

let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;

function renderQuiz() {
  const item = quizData[currentQuestion];
  quizStep.textContent = `Domanda ${currentQuestion + 1} di ${quizData.length}`;
  quizQuestion.textContent = item.question;
  quizOptions.innerHTML = '';
  selectedAnswer = null;
  nextBtn.classList.add('hidden');
  restartBtn.classList.add('hidden');

  item.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'quiz-option';
    button.textContent = option;

    button.addEventListener('click', () => {
      if (selectedAnswer !== null) return;
      selectedAnswer = index;

      const buttons = [...quizOptions.querySelectorAll('.quiz-option')];
      buttons.forEach((btn, btnIndex) => {
        if (btnIndex === item.correct) btn.classList.add('correct');
        else if (btnIndex === index) btn.classList.add('wrong');
      });

      if (index === item.correct) score += 1;
      nextBtn.textContent = currentQuestion < quizData.length - 1 ? 'Domanda successiva' : 'Vedi risultato';
      nextBtn.classList.remove('hidden');
    });

    quizOptions.appendChild(button);
  });
}

function showResult() {
  quizStep.textContent = 'Quiz completato';
  quizQuestion.textContent = `Hai risposto correttamente a ${score} domande su ${quizData.length}.`;
  quizOptions.innerHTML = '';
  nextBtn.classList.add('hidden');
  restartBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion += 1;
    renderQuiz();
  } else {
    showResult();
  }
});

restartBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  renderQuiz();
});

renderQuiz();
