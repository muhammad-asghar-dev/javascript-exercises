"use strict";
const playBtn = document.querySelector(".header button");
const table = document.querySelector(".table");
const guessNumberElem = document.querySelector(".guessNumber");
const countdownElem = document.querySelector(".countdown");
const scoreElems = document.querySelector(".score");
let playAgainCheck = true;
let guessNumber;
let correctAnswers = [];
let InputedCorrectAnswers = 0;

function renderTable() {
    table.innerHTML = "";
    const sentNumbers = [];
    for (let i = 1; i <= 25; i++) {
        let a = generateRamdomNumber(1, 100);

        while (sentNumbers.includes(a)) {
            a = generateRamdomNumber(1, 100);
        }
        sentNumbers.push(a);

        if (a % guessNumber === 0) correctAnswers.push(a);

        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => checkAnswer(a));
        cell.textContent = a;
        table.appendChild(cell);
    }
}

function checkAnswer(ans) {
    for (let i = 0; i < table.children.length; i++) {
        if (table.children[i].innerText == ans) {
            if (ans % guessNumber === 0) {
                table.children[i].classList.add("correct");
                InputedCorrectAnswers++;
            } else {
                table.children[i].classList.add("wrong");
            }
        }
    }
}

function finishGame() {
    table.classList.remove("active");
    playBtn.textContent = "Play Again";

    const correctAnswersCount = correctAnswers.length;
    let scorePer = Math.floor(
        (InputedCorrectAnswers / correctAnswersCount) * 100
    );
    if (scorePer === "Infinity") scorePer = 100;

    countdownElem.classList.add("d-none");
    scoreElems.classList.remove("d-none");

    let correctScoreStr = "";
    correctAnswers.map((score, index) => {
        correctScoreStr +=
            score + (index === correctAnswers.length - 1 ? "" : ", ");
    });

    scoreElems.children[0].innerText = `Your Answers are ${scorePer}% correct.`;
    scoreElems.children[1].innerText = `Correct Answers: ${correctScoreStr}`;

    playBtn.disabled = false;
}

function startCountdown() {
    countdownElem.classList.remove("d-none");
    let countdown = 30;
    const countdownContinue = setInterval(() => {
        countdown--;
        countdownElem.textContent = countdown;
        if (countdown === 0) {
            finishGame();
            clearInterval(countdownContinue);
        }
    }, 1000);
}

function playGame() {
    playBtn.disabled = true;
    guessNumber = generateRamdomNumber(3, 9);
    renderTable();
    guessNumberElem.classList.remove("d-none");
    guessNumberElem.textContent = `of ${guessNumber}`;
    table.classList.add("active");
    startCountdown();
}

function generateRamdomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

playBtn.addEventListener("click", () => {
    if (playAgainCheck) {
        playAgainCheck = false;
        playGame();
    } else {
        window.location.reload();
    }
});
