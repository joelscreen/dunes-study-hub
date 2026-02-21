const addFlashcardBtn = document.getElementById("add_flashcard");
const questionContainer = document.getElementById("question_container");
const closeBtn = document.getElementById("close-btn");
const saveBtn = document.getElementById("save-btn");
const questionInput = document.getElementById("question");
const answerInput = document.getElementById("answer");
const cardListContainer = document.querySelector(".card_list_container");

let flashcards = []

function showForm() {
    questionContainer.style.display = "flex";
}

function hideForm() {
    questionContainer.style.display = "none";
    questionInput.value = "";
    answerInput.value = "";
}

function saveFlashcard() {
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (!question || !answer) {
        alert("Both question and answer are required.");
        return;
    }

    const flashcard = { question, answer };
    flashcards.push(flashcard);

    createCard(flashcard);
    hideForm();
}

function createCard(flashcard) {

    const card = document.createElement("div");
    card.classList.add("card");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.textContent = flashcard.question;

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.textContent = flashcard.answer;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
    });

    cardListContainer.appendChild(card);
}

function loadFlashcards() {
    flashcards.forEach(card => createCard(card));
}

addFlashcardBtn.addEventListener("click", showForm);
closeBtn.addEventListener("click", hideForm);
saveBtn.addEventListener("click", saveFlashcard);

window.addEventListener("DOMContentLoaded", loadFlashcards);