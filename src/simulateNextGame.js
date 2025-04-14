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
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 0, 0]; // A=1, 2~10, JQK=0
  const fullDeck = [];

  for (let i = 0; i < 8 * 4 * 13; i++) {
    fullDeck.push(values[i % 13]);
  }

  return shuffle(fullDeck);
}

function totalPoints(cards) {
  const sum = cards.reduce((acc, card) => acc + card, 0);
  return sum % 10;
}

function simulateOneGame(deck) {
  const player = [deck.pop(), deck.pop()];
  const banker = [deck.pop(), deck.pop()];

  let playerPoints = totalPoints(player);
  let bankerPoints = totalPoints(banker);

  let playerThird = null;
  if (playerPoints <= 5) {
    playerThird = deck.pop();
    player.push(playerThird);
    playerPoints = totalPoints(player);
  }

  let bankerThird = null;
  const pt = playerThird;

  const bankerDraws = () => {
    if (pt === null) return bankerPoints <= 5;
    if (bankerPoints <= 2) return true;
    if (bankerPoints === 3) return pt !== 8;
    if (bankerPoints === 4) return pt >= 2 && pt <= 7;
    if (bankerPoints === 5) return pt >= 4 && pt <= 7;
    if (bankerPoints === 6) return pt === 6 || pt === 7;
    return false;
  };

  if (bankerDraws()) {
    bankerThird = deck.pop();
    banker.push(bankerThird);
    bankerPoints = totalPoints(banker);
  }

  if (playerPoints > bankerPoints) return '閒';
  if (bankerPoints > playerPoints) return '莊';
  return '和';
}

export function simulateNextGame(history, simulations = 10000) {
  const resultCount = { 莊: 0, 閒: 0, 和: 0 };

  for (let i = 0; i < simulations; i++) {
    let deck = generateDeck();

    // 將歷史資料的牌從牌堆移除
    for (const round of history) {
      for (const card of round.banker) {
        const index = deck.indexOf(card);
        if (index !== -1) deck.splice(index, 1);
      }
      for (const card of round.player) {
        const index = deck.indexOf(card);
        if (index !== -1) deck.splice(index, 1);
      }
    }

    const outcome = simulateOneGame(deck);
    resultCount[outcome]++;
  }

  return resultCount;
}
