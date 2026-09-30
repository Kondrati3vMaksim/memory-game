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

async function getCards() {
  const response = await fetch('./data.json');

  const arr = await response.json();
  data = arr;
  const cards = [...data, ...data];
  shuffleCards(cards);
  cards.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('card-container');
    const name = document.createElement('span');
    name.textContent = item.title;
    const id = document.createElement('span');
    id.textContent = item.id;
    div.append(name);
    div.append(id);
    gameBoard.append(div);
  });
}

function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[random]] = [cards[random], cards[i]];
  }
}

getCards();
