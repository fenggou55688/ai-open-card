import React, { useState } from 'react';
import { simulateNextGame } from './simulateNextGame'; // 引入模擬邏輯

const App = () => {
  const [rounds, setRounds] = useState([]);
  const [prediction, setPrediction] = useState({ 莊: 0, 閒: 0 });
  const [selectedBankerCards, setSelectedBankerCards] = useState([]);
  const [selectedPlayerCards, setSelectedPlayerCards] = useState([]);

  const handleCardSelection = (cardType, cardValue) => {
    if (cardType === 'banker') {
      setSelectedBankerCards((prev) => [...prev, cardValue]);
    } else if (cardType === 'player') {
      setSelectedPlayerCards((prev) => [...prev, cardValue]);
    }
  };

  const handleAddRound = () => {
    if (selectedBankerCards.length < 2 || selectedPlayerCards.length < 2) {
      alert('每局必須有兩張牌！');
      return;
    }

    const newRounds = [...rounds, { banker: selectedBankerCards, player: selectedPlayerCards }];
    setRounds(newRounds);
    setSelectedBankerCards([]);
    setSelectedPlayerCards([]);

    const result = simulateNextGame(newRounds, 10000); // 模擬 10000 次
    setPrediction(result);
  };

  const handleClear = () => {
    setRounds([]);
    setPrediction({ 莊: 0, 閒: 0 });
  };

  const getPercentage = (count) => {
    const total = prediction.莊 + prediction.閒;
    return total === 0 ? '0.0' : ((count / total) * 100).toFixed(1);
  };

  const renderCardButtons = (cardType) => {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <div>
        {cards.map((card) => (
          <button
            key={card}
            onClick={() => handleCardSelection(cardType, card)}
            style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}
          >
            {card}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🔍 AI 精準百家樂預測</h1>
      <p>根據你輸入的每局實際發牌結果模擬 10000 次預測下一局（僅統計莊 / 閒）</p>

      <div style={{ marginBottom: '1rem' }}>
        <h3>選擇莊牌</h3>
        {renderCardButtons('banker')}

        <h3>選擇閒牌</h3>
        {renderCardButtons('player')}

        <button onClick={handleAddRound} style={{ marginTop: '1rem' }}>
          加入此局結果
        </button>
        <button onClick={handleClear} style={{ marginLeft: '1rem' }}>
          清除所有紀錄
        </button>
      </div>

      <div>
        <strong>目前輸入牌局：</strong>
        <ul>
          {rounds.map((r, i) => (
            <li key={i}>
              第 {i + 1} 局：莊[{r.banker.join(',')}] 閒[{r.player.join(',')}]
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h3>📊 下一局預測機率：</h3>
        <div>莊：{getPercentage(prediction.莊)}%</div>
        <div>閒：{getPercentage(prediction.閒)}%</div>
      </div>
    </div>
  );
};

export default App;
