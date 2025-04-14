// simulateNextGame.js

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function generateDeck() {
  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck = [];

  for (let i = 0; i < 8; i++) {
    for (let suit of suits) {
      for (let value of values) {
        deck.push(value);
      }
    }
  }

  return shuffle(deck);
}

function getPoint(card) {
  if (['J', 'Q', 'K', '10'].includes(card)) return 0;
  if (card === 'A') return 1;
  return parseInt(card);
}

function totalPoints(cards) {
  const sum = cards.reduce((acc, card) => acc + getPoint(card), 0);
  return sum % 10;
}

function simulateOneGame(deck) {
  let player = [deck.pop(), deck.pop()];
  let banker = [deck.pop(), deck.pop()];

  let playerPoints = totalPoints(player);
  let bankerPoints = totalPoints(banker);

  let playerThird = null;
  if (playerPoints <= 5) {
    playerThird = deck.pop();
    player.push(playerThird);
    playerPoints = totalPoints(player);
  }

  let bankerThird = null;
  const bankerDecision = () => {
    if (playerThird === null) {
      return bankerPoints <= 5;
    }

    const pt = getPoint(playerThird);

    if (bankerPoints <= 2) return true;
    if (bankerPoints === 3) return pt !== 8;
    if (bankerPoints === 4) return pt >= 2 && pt <= 7;
    if (bankerPoints === 5) return pt >= 4 && pt <= 7;
    if (bankerPoints === 6) return pt === 6 || pt === 7;
    return false;
  };

  if (bankerDecision()) {
    bankerThird = deck.pop();
    banker.push(bankerThird);
    bankerPoints = totalPoints(banker);
  }

  if (playerPoints > bankerPoints) return '閒';
  if (bankerPoints > playerPoints) return '莊';
  return '和';
}

export function simulateNextGame(history, simulations = 100000) {
  const resultCount = { 莊: 0, 閒: 0, 和: 0 };

  for (let i = 0; i < simulations; i++) {
    let deck = generateDeck();

    // 模擬已發生的歷史走勢，將牌堆扣除前幾局結果
    for (let j = 0; j < history.length; j++) {
      simulateOneGame(deck); // 不紀錄結果，只是消耗牌
    }

    const outcome = simulateOneGame(deck);
    resultCount[outcome]++;
  }

  return resultCount;
}
