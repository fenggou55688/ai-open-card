import React, { useState } from 'react';

const suits = ['♠️', '♥️', '♦️', '♣️'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const getCardValue = (value) => {
  if (['J', 'Q', 'K', '10'].includes(value)) return 0;
  if (value === 'A') return 1;
  return parseInt(value);
};

const generateDeck = () => {
  let deck = [];
  for (let i = 0; i < 8; i++) {
    for (let suit of suits) {
      for (let value of values) {
        deck.push({ suit, value });
      }
    }
  }
  return shuffle(deck);
};

const shuffle = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const calculatePoints = (cards) => {
  const total = cards.reduce((sum, card) => sum + getCardValue(card.value), 0);
  return total % 10;
};

const dealGame = (shoe) => {
  let newShoe = [...shoe];
  const playerCards = [newShoe.pop(), newShoe.pop()];
  const bankerCards = [newShoe.pop(), newShoe.pop()];

  const playerPoints = calculatePoints(playerCards);
  const bankerPoints = calculatePoints(bankerCards);

  if (playerPoints <= 5) {
    playerCards.push(newShoe.pop());
  }

  if (bankerPoints <= 5) {
    bankerCards.push(newShoe.pop());
  }

  const finalPlayer = calculatePoints(playerCards);
  const finalBanker = calculatePoints(bankerCards);

  let winner = '和';
  if (finalPlayer > finalBanker) winner = '閒';
  else if (finalBanker > finalPlayer) winner = '莊';

  return {
    shoe: newShoe,
    result: winner,
    playerCards,
    bankerCards,
    finalPlayer,
    finalBanker,
  };
};

const simulateNextGame = (shoe) => {
  let results = { '莊': 0, '閒': 0, '和': 0 };
  for (let i = 0; i < 100; i++) {
    let copy = [...shoe];
    let game = dealGame(copy);
    results[game.result]++;
  }
  return results;
};

const App = () => {
  const [shoe, setShoe] = useState(generateDeck());
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState({ '莊': 0, '閒': 0, '和': 0 });

  const playGame = () => {
    const result = dealGame(shoe);
    setShoe(result.shoe);
    setHistory([...history, result.result]);
    const next = simulateNextGame(result.shoe);
    setPrediction(next);
  };

  const clearGame = () => {
    setShoe(generateDeck());
    setHistory([]);
    setPrediction({ '莊': 0, '閒': 0, '和': 0 });
  };

  const total = prediction['莊'] + prediction['閒'] + prediction['和'];

  return (
    <div className="app">
      <h1>AI 開牌預測（真實模擬）</h1>
      <button onClick={playGame}>模擬一局</button>
      <button onClick={clearGame}>重置牌局</button>

      <h2>歷史結果：</h2>
      <div>{history.join(' → ')}</div>

      <h2>下一局預測：</h2>
      <div>莊：{((prediction['莊'] / total) * 100).toFixed(1)}%</div>
      <div>閒：{((prediction['閒'] / total) * 100).toFixed(1)}%</div>
      <div>和：{((prediction['和'] / total) * 100).toFixed(1)}%</div>
    </div>
  );
};

export default App;
