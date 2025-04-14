// simulateNextGame.js

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
