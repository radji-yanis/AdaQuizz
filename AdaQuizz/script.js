// ════════════════════════════════════════════
//   ADAQUIZ — script.js
//   Certaines fonctions sont déjà écrites.
//   Les fonctions marquées TODO sont à compléter.
// ════════════════════════════════════════════


// ── Sélection des éléments DOM ──────────────
// Ces lignes récupèrent les éléments HTML par leur id.
// Tu n'as pas besoin de les modifier.

//... Crée autant de constantes que d'éléments HTML à récupérer
const btnStart = document.getElementsByClassName("start");
const btnStartSeriesAndFilms = document.getElementById("start-series-films");
const btnStartMangaAndAnime = document.getElementById("start-manga-anime");
const btnStartVideoGames = document.getElementById("start-video-games");
const btnStartGeekCulture = document.getElementById("start-geek-culture");
const quizzResponses = document.getElementById("quizz-responses");
const containerQuestion = document.getElementById("container-question");
const quizzTheme = document.getElementById("quizz-theme");
const quizzProgress = document.getElementById("quizz-progress");
const questionText = document.getElementById("quizz-question-text");
const btnNext = document.getElementById("next");
const btnRestart = document.getElementById("restart");
const scoreFinal = document.querySelector(".score-text");
const scoreAnswer = document.querySelector(".score-answer");
const tiger = document.querySelector(".tiger");
const question = document.querySelector(".questions");
const ecranResultats = document.getElementById("ecran-resultats");
const accueil = document.getElementById("ecran-accueil");
// ── État du quiz ─────────────────────────────
// Ces variables stockent les données en cours de partie.
// Tu n'as pas besoin de les modifier.

let questions = []; // tableau des questions chargées depuis le JSON
let questionForTheme = []; // tableau des questions pour le thème choisi
let indexCourant = 0; // numéro de la question en cours (commence à 0)
let score = 0; // nombre de bonnes réponses
let nbQuestionsForTheme = 0; // nombre de questions pour le thème choisi

// ── Chargement du JSON ───────────────────────
// Cette fonction est déjà écrite.
// Elle charge le fichier questions.json et remplit l'écran d'accueil.

const loadQuestions = () => {
  console.log("loading questions..");
  fetch("questions.json")
    .then((response) => response.json())
    .then((data) => {
      questions = data;
    });
};

loadQuestions();

const loadQuestionsForTheme = (theme) => {
  console.log("loading questions for theme: " + theme);
  if (theme === "all") {
    questionsForTheme = questions;
  } else {
    questionsForTheme = questions.filter((q) => q.theme === theme);
  }
  // 1. Mélanger le tableau
  questionsForTheme = questionsForTheme.sort(() => Math.random() - 0.5);

  // 2. Garder seulement les 10 premières
  questionsForTheme = questionsForTheme.slice(0, 10);
  
  nbQuestionsForTheme = questionsForTheme.length;
  console.log("questions for theme: " + nbQuestionsForTheme);
};

// ── Navigation entre les écrans ──────────────
// Cette fonction est déjà écrite.
// Elle cache tous les écrans puis affiche celui qu'on lui donne.

const afficher = (ecran) => {
  accueil.classList.add("cache");
  ecranQuestion.classList.add("cache");
  ecranResultats.classList.add("cache");
  ecran.classList.remove("cache");
};

// ════════════════════════════════════════════
//   TODO — Fonctions à compléter
// ════════════════════════════════════════════

// ── TODO : afficherQuestion ──────────────────
// Cette fonction doit afficher la question en cours.
// Elle est appelée au début de chaque nouvelle question.
//
// Ce qu'elle doit faire :
//   1. Récupérer la question courante : questions[indexCourant]
//   2. Mettre à jour la barre de progression
//   3. Mettre à jour le compteur ("Question X / Y")
//   4. Afficher le texte de la question dans #texte-question
//   5. Cacher le bouton "Question suivante"
//   6. Vider #liste-reponses, puis créer un bouton pour chaque réponse
//      Chaque bouton doit appeler verifierReponse() au clic

const afficherQuestion = (index) => {
  const currentQuestion = questionsForTheme[index];
  //quizzProgress.textContent = (index+1) + " / " + nbQuestionsForTheme
  quizzProgress.textContent = `${index + 1} / ${nbQuestionsForTheme}`;
  questionText.textContent = currentQuestion.question;
  quizzResponses.innerHTML = "";
  currentQuestion.reponses.forEach((reponse, i) => {
    const btn = document.createElement("button");
    btn.textContent = reponse;
    btn.classList.add("answer");
    btn.addEventListener("click", () => verifierReponse(i));
    quizzResponses.appendChild(btn);
  });
};

// ── TODO : verifierReponse ───────────────────
// Cette fonction est appelée quand une apprenante clique sur une réponse.
// Elle reçoit en paramètre l'index de la réponse choisie (0, 1, 2 ou 3).
//
// Ce qu'elle doit faire :
//   1. Récupérer la question courante
//   2. Désactiver tous les boutons de réponse
//   3. Colorier en vert la bonne réponse (ajouter la classe "correcte")
//   4. Si la réponse choisie est mauvaise, la colorier en rouge ("incorrecte")
//   5. Si la réponse est bonne, incrémenter le score
//   6. Afficher le bouton "Question suivante"

const verifierReponse = (indexChoisi) => {
  const currentQuestion = questionsForTheme[indexCourant];
  const indexBonneReponse = currentQuestion.bonne_reponse;
  const boutons = quizzResponses.querySelectorAll(".answer");

  boutons.forEach((btn) => {
    btn.disabled = true;
  });

  boutons[indexBonneReponse].classList.add("correcte");

  if (indexChoisi === indexBonneReponse) {
    score++;
  } else {
    boutons[indexChoisi].classList.add("incorrecte");
  }

  btnNext.classList.remove("hidden");
};

// ── TODO : afficherResultats ─────────────────
// Cette fonction est appelée quand toutes les questions ont été répondues.
//
// Ce qu'elle doit faire :
//   1. Afficher le score dans #score-final (ex. "4 / 7")
//   2. Afficher un message dans #message-fin selon le score
//   3. Appeler afficher(ecranResultats) pour passer à l'écran résultats

const afficherResultats = (score, total, callback) => {
  accueil.classList.add ("hidden")
  containerQuestion.classList.add("hidden")
  ecranResultats.classList.remove("cache");
  scoreFinal.textContent = `Votre Score Final : ${score} / ${total}`;

  const pourcentage = (score / total) * 100;
  if (pourcentage >= 80) {
    callback("🐯 Tié un tigre de Tasmani 🐯");
  } else if (pourcentage >= 50) {
    callback("Tié presque un tigre 🐱");
  } else {
    callback("Tié vraiment un 🦧");
  }
};
// ── TODO : écouteurs d'événements ───────────
// Branche les boutons sur les bonnes fonctions.
//
// À faire :
//   - btn-commencer → afficher l'écran question + appeler afficherQuestion()
//   - btn-suivant   → passer à la question suivante ou aux résultats
//   - btn-rejouer   → remettre indexCourant et score à 0, revenir à l'accueil
// const btnRestart = document.getElementById("restart");
// const scoreFinal = document.getElementsByClassName("score-text");
// const scoreAnswer = document.getElementsByClassName("score-answer");
// const tiger = document.getElementsByClassName("tiger");

const scoretotal = (message) => {
  tiger.textContent = message;
};
// <p class="score-text"></p>
// <hr>
// <p class="score-answer"></p>
// <p class="tiger"></p>

btnNext.addEventListener("click", () => {
  indexCourant++;
  if (indexCourant < nbQuestionsForTheme) {
    afficherQuestion(indexCourant);
    btnNext.classList.add("hidden");
  } else {
    afficherResultats(score, nbQuestionsForTheme, scoretotal);
  }
});

btnStartSeriesAndFilms.addEventListener("click", () => {
  indexCourant = 0; score = 0
  accueil.classList.add("hidden")
  containerQuestion.classList.remove("hidden");
  loadQuestionsForTheme("Series & Films");
  quizzTheme.textContent = "Series & Films";
  afficherQuestion(indexCourant);
});

btnStartMangaAndAnime.addEventListener("click", () => {
  indexCourant = 0 ; score = 0
  accueil.classList.add("hidden")
  containerQuestion.classList.remove("hidden");
  loadQuestionsForTheme("Manga & Anime");
  quizzTheme.textContent = "Manga & Anime";
  afficherQuestion(indexCourant);
});

btnStartVideoGames.addEventListener("click", () => {
  indexCourant = 0; score = 0
  ecranResultats.classList.add("cache");
  containerQuestion.classList.remove("hidden");
  loadQuestionsForTheme("Jeux Vidéo");
  quizzTheme.textContent = "Jeux Vidéo";
  afficherQuestion(indexCourant);
});

btnStartGeekCulture.addEventListener("click", () => {
  indexCourant = 0; score = 0
  ecranResultats.classList.add("cache");
  containerQuestion.classList.remove("hidden");
  loadQuestionsForTheme("all");
  quizzTheme.textContent = "Culture Geek general";
  afficherQuestion(indexCourant);
});

btnRestart.addEventListener("click", () =>{
  score = 0
  indexCourant = 0
  ecranResultats.classList.add("cache")
  containerQuestion.classList.add("cache")
  accueil.classList.remove ("hidden")
} )