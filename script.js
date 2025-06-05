const questions = [
  {
    question: "Adakah anda dapat melihat penunggang motosikal dari arah hadapan anda?",
    choices: ["Ya", "Tidak"],
    correctAnswer: 0,
    explanation: "Anda seharusnya dapat memerhati dan melihat sebuah motosikal menuju ke arah anda dari arah hadapan."
  },
  {
    question: "Kelajuan motosikal tersebut adalah:",
    choices: ["Semakin meningkat atau tidak berubah", "Semakin menurun"],
    correctAnswer: 0,
    explanation: "Motosikal tersebut dipandu dengan kelajuan yang semakin meningkat atau konsisten."
  },
  {
    question: "Sekiranya anda meneruskan olahgerak pusingan U tersebut, berapa lamakah masa sebelum perlanggaran mungkin berlaku antara anda dan motosikal tersebut?",
    choices: ["3.5 s", "8-10 s"],
    correctAnswer: 0,
    explanation: "Kelajuan motosikal menunjukkan perlanggaran boleh berlaku dalam masa kira-kira 3.5 saat."
  }
];

let currentQuestion = 0;
let score = 0;

const video = document.getElementById("video");
const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const scoreSummary = document.getElementById("scoreSummary");
const finalMessage = document.getElementById("finalMessage");
const explanationEl = document.getElementById("explanation");

video.onended = () => {
  quiz.classList.remove("hidden");
  showQuestion();
};

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = `Soalan ${currentQuestion + 1}: ${q.question}`;
  choicesEl.innerHTML = "";
  explanationEl.classList.add("hidden");
  explanationEl.textContent = "";

  q.choices.forEach((choice, index) => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.addEventListener("click", () => handleAnswer(index, li));
    choicesEl.appendChild(li);
  });

  nextBtn.classList.add("hidden");
}

function handleAnswer(selectedIndex, selectedElement) {
  const q = questions[currentQuestion];
  const allChoices = choicesEl.querySelectorAll("li");

  allChoices.forEach((li, idx) => {
    li.style.pointerEvents = "none";
    if (idx === q.correctAnswer) {
      li.classList.add("correct");
    } else if (idx === selectedIndex) {
      li.classList.add("incorrect");
    }
  });

  if (selectedIndex === q.correctAnswer) {
    score++;
  }

  explanationEl.textContent = `Penjelasan: ${q.explanation}`;
  explanationEl.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showSummary();
  }
});

function showSummary() {
  quiz.classList.add("hidden");
  resultEl.classList.remove("hidden");

  const percentage = Math.round((score / questions.length) * 100);
  scoreSummary.innerHTML = `Anda menjawab <strong>${score}</strong> daripada <strong>${questions.length}</strong> soalan dengan betul. (${percentage}%)`;

  let message = "";

  if (percentage === 100) {
    message = "Tahniah! Anda sangat peka terhadap persekitaran semasa menunggang.";
  } else if (percentage >= 67) {
    message = "Bagus! Namun, sentiasa perhatikan risiko dan kenderaan lain di jalan raya.";
  } else {
    message = "Kewaspadaan anda perlu ditingkatkan. Sistem amaran pra-pelanggaran seperti MCAS dapat membantu anda bertindak lebih pantas.";
  }

  finalMessage.innerHTML = `<em>${message}</em>`;
}
