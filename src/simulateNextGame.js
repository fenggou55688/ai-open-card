// simulateNextGame.js

function totalPoints(cards) {
  const sum = cards.reduce((acc, card) => acc + Math.min(card, 10), 0);
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
  return null; // 和局忽略
}

export function simulateNextGame(rounds, times) {
  const result = { 莊: 0, 閒: 0 };

  for (let i = 0; i < times; i++) {
    // 建立 8 副牌
    let deck = [];
    for (let j = 0; j < 8 * 52; j++) {
      let point = (j % 13) + 1;
      deck.push(point);
    }

    // 洗牌
    for (let k = deck.length - 1; k > 0; k--) {
      const r = Math.floor(Math.random() * (k + 1));
      [deck[k], deck[r]] = [deck[r], deck[k]];
    }

    // 扣除歷史出現的牌
    rounds.forEach((round) => {
      [...round.banker, ...round.player].forEach((card) => {
        const index = deck.indexOf(card);
        if (index !== -1) deck.splice(index, 1);
      });
    });

    const outcome = simulateOneGame(deck);
    if (outcome) result[outcome]++;
    // 如果 outcome 是 null（和局），就跳過不統計
  }

  return result;
}
