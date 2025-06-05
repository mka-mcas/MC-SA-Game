const questions = [
  {
    question: "Adakah anda dapat melihat penunggang motosikal dari arah hadapan anda?",
    choices: ["Ya", "Tidak"],
    correctIndex: 0,
    explanation: "Anda seharusnya dapat memerhati dan melihat sebuah motosikal menuju ke arah anda dari arah hadapan.",
  },
  {
    question: "Kelajuan motosikal tersebut adalah:",
    choices: ["Semakin meningkat atau tidak berubah", "Semakin menurun"],
    correctIndex: 0,
    explanation: "Motosikal tersebut dipandu dengan kelajuan yang semakin meningkat atau konsisten.",
  },
  {
    question: "Sekiranya anda meneruskan olahgerak pusingan U tersebut, berapa lamakah masa sebelum perlanggaran mungkin berlaku antara anda dan motosikal tersebut?",
    choices: ["3-5 s", "8-10 s", "Lebih 10 s"],
    correctIndex: 0,
    explanation: "Motosikal tersebut sedang berada dalam lingkungan 50–100 meter di hadapan dan bergerak pada kelajuan 60–80 km/j. Ia boleh melanggar anda dalam hanya 3–5 saat. Tempoh ini tidak cukup untuk melintas dengan selamat!",
  }
];

let currentQuestion = 0;

const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");

document.getElementById("video").addEventListener("ended", () => {
  quiz.classList.remove("hidden");
  showQuestion();
});

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = `Soalan ${currentQuestion + 1}: ${q.question}`;
  choicesEl.innerHTML = "";

  q.choices.forEach((choice, index) => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.addEventListener("click", () => selectAnswer(index));
    choicesEl.appendChild(li);
  });

  nextBtn.style.display = "none";
}

function selectAnswer(selectedIndex) {
  const q = questions[currentQuestion];
  const lis = choicesEl.querySelectorAll("li");

  lis.forEach((li, i) => {
    li.classList.remove("correct", "incorrect");
    if (i === q.correctIndex) li.classList.add("correct");
    else if (i === selectedIndex) li.classList.add("incorrect");
  });

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quiz.classList.add("hidden");
  resultEl.classList.remove("hidden");
  resultEl.innerHTML = `
    <h2>Penilaian Tamat</h2>
    <p>🚦 Tahukah anda, masa tindak balas manusia purata ialah 2.5 saat? 
    Sistem amaran pra-pelanggaran boleh membantu pemandu bertindak lebih awal dan mengurangkan risiko perlanggaran.</p>
    <p>Kekal berwaspada di jalan raya adalah kunci keselamatan!</p>
  `;
}
