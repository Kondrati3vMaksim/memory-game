const body = document.body;

//create elements
const header = document.createElement('header');
const title = document.createElement('h1');
const button = document.createElement('button');
const main = document.createElement('main');
main.classList.add('main');
const div = document.createElement('div');
const span = document.createElement('span');
const appContainer = div.cloneNode(false);
body.append(appContainer);

//elements for heder
appContainer.append(header);
appContainer.classList.add('app-container');
const headerTitle = title.cloneNode(false);
headerTitle.classList.add('header-title');
headerTitle.textContent = 'Space Memory';
const divButtonContainer = div.cloneNode(false);
divButtonContainer.classList.add('header-button-container');
header.append(headerTitle);
header.append(divButtonContainer);
const newGameButton = button.cloneNode(false);
newGameButton.classList.add('new-game-button');
newGameButton.textContent = 'New Game';
const leaderBoardButton = button.cloneNode(false);
leaderBoardButton.classList.add('leaderboard-button');
leaderBoardButton.textContent = 'Leaderboard';
divButtonContainer.append(newGameButton);
divButtonContainer.append(leaderBoardButton);

//elemnts main
appContainer.append(main);
const mainContainer = div.cloneNode(false);
mainContainer.classList.add('main-stats-container');
main.append(mainContainer);
const movesSpan = span.cloneNode(false);
movesSpan.textContent = 'Moves: 0';
mainContainer.append(movesSpan);
const pairsSpan = span.cloneNode(false);
pairsSpan.textContent = 'Pairs: 0 / 8';
mainContainer.append(pairsSpan);
const gameBoard = div.cloneNode(false);
gameBoard.classList.add('game-board');
main.append(gameBoard);

// data
let data = [];
let firstCard = null;
let secondCard = null;
let mismatchTimer = null;

// match card
let isBoardLocked = false;

//finished game
let isGameFinished = false;

// move
let moves = 0;
let matchedPairs = 0;

// localStorage
function saveResult() {
  const getResults = localStorage.getItem('results');
  const results = getResults ? JSON.parse(getResults) : [];
  const currentResalts = {
    moves: moves,
    date: new Date(),
  };
  results.push(currentResalts);
  const stringifyResult = JSON.stringify(results);
  localStorage.setItem('results', stringifyResult);
}

function getLeaderboard() {
  const getResults = localStorage.getItem('results');
  const saveResults = getResults ? JSON.parse(getResults) : [];

  saveResults.sort((a, b) => {
    if (a.moves === b.moves) {
      return new Date(a.date) - new Date(b.date);
    }
    return a.moves - b.moves;
  });
  return saveResults.slice(0, 10);
}

// function for leader board
function formatDate(date) {
  const getDate = new Date(date);

  const day = String(getDate.getDate()).padStart(2, '0');
  const month = String(getDate.getMonth() + 1).padStart(2, '0');
  const year = getDate.getFullYear();
  return `${day}.${month}.${year}`;
}

// elements for modal
const modalOverlayContainer = document.createElement('div');
modalOverlayContainer.classList.add('modal-container');
const modal = document.createElement('div');
modal.classList.add('modal');
const modalContent = document.createElement('div');
const victoryModalTitle = document.createElement('h2');
const modalMoveSpan = document.createElement('span');
victoryModalTitle.textContent = 'You Win!';
modalContent.classList.add('modal-content');
const modalCloseButton = document.createElement('button');

modalCloseButton.type = 'button';
modalCloseButton.textContent = 'Close';
const modalNewGameButton = document.createElement('button');

modalNewGameButton.textContent = 'New Game';
modalOverlayContainer.append(modal);

modal.append(modalContent);
body.append(modalOverlayContainer);

//function for modal
function openModal() {
  modalOverlayContainer.classList.add('show-modal');
  body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlayContainer.classList.remove('show-modal');
  body.style.overflow = '';
}

//function restart Game

function startNewGame() {
  clearTimeout(mismatchTimer);
  firstCard = null;
  secondCard = null;
  mismatchTimer = null;

  isBoardLocked = false;
  isGameFinished = false;
  moves = 0;
  matchedPairs = 0;
  movesSpan.textContent = `Moves: ${moves}`;
  pairsSpan.textContent = `Pairs: ${matchedPairs} / 8`;
  modalMoveSpan.textContent = `Moves: ${moves}`;
  closeModal();
  gameBoard.replaceChildren();
  getCards();
}

//listener for new game
newGameButton.addEventListener('click', startNewGame);
modalNewGameButton.addEventListener('click', startNewGame);

// listener for leaderBoard
leaderBoardButton.addEventListener('click', () => {
  const results = getLeaderboard();
  modalContent.replaceChildren();
  const title = document.createElement('h2');
  title.textContent = 'LeaderBoard';
  modalContent.append(title);
  if (results.length === 0) {
    const span = document.createElement('span');
    span.textContent = 'No results yet';
    modalContent.append(span);
  } else {
    results.forEach((item, index) => {
      const span = document.createElement('span');
      span.textContent = `${index + 1}. ${item.moves} moves — ` + formatDate(item.date);
      modalContent.append(span);
    });
  }
  modalContent.append(modalCloseButton);
  openModal();
});

//listener for modal
modalOverlayContainer.addEventListener('click', (e) => {
  if (e.target !== e.currentTarget) {
    return;
  }
  closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

modalCloseButton.addEventListener('click', () => {
  closeModal();
});

async function getCards() {
  const response = await fetch('./data.json');

  const arr = await response.json();
  data = arr;
  const cards = [...data, ...data];
  shuffleCards(cards);

  cards.forEach((item) => {
    const singleCard = document.createElement('div');
    singleCard.classList.add('card-container');
    singleCard.classList.add('close-card');
    singleCard.dataset.id = item.id;

    singleCard.addEventListener('click', (e) => {
      if (isBoardLocked) {
        return;
      }

      if (isGameFinished) {
        return;
      }
      if (e.currentTarget.classList.contains('match-card')) {
        return;
      }
      if (firstCard === e.currentTarget) {
        return;
      }
      if (firstCard !== null && secondCard !== null) {
        return;
      }
      if (firstCard === null) {
        firstCard = e.currentTarget;

        firstCard.classList.remove('close-card');
        firstCard.classList.add('open-card');
        return;
      }
      secondCard = e.currentTarget;
      moves++;
      movesSpan.textContent = `Moves: ${moves}`;
      secondCard.classList.remove('close-card');
      secondCard.classList.add('open-card');

      if (firstCard.dataset.id === secondCard.dataset.id) {
        matchedPairs++;
        if (matchedPairs === 8) {
          modalContent.replaceChildren();
          modalMoveSpan.textContent = `Moves: ${moves}`;
          modalContent.append(victoryModalTitle);
          modalContent.append(modalMoveSpan);
          modalContent.append(modalNewGameButton);
          modalContent.append(modalCloseButton);
          isGameFinished = true;
          openModal();
          saveResult();
        }
        pairsSpan.textContent = `Pairs: ${matchedPairs} / 8`;
        firstCard.classList.add('match-card');
        secondCard.classList.add('match-card');
        firstCard = null;
        secondCard = null;
      } else {
        isBoardLocked = true;
        mismatchTimer = setTimeout(() => {
          firstCard.classList.remove('open-card');
          firstCard.classList.add('close-card');
          secondCard.classList.remove('open-card');
          secondCard.classList.add('close-card');
          firstCard = null;
          secondCard = null;
          isBoardLocked = false;
          mismatchTimer = null;
        }, 1000);
      }
    });

    const name = document.createElement('span');
    name.textContent = item.title;
    const id = document.createElement('span');
    id.textContent = item.id;
    singleCard.append(name);
    singleCard.append(id);
    gameBoard.append(singleCard);
  });
}

function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[random]] = [cards[random], cards[i]];
  }
}

getCards();
