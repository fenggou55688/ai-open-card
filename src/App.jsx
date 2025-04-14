import React, { useState } from 'react';
import { simulateNextGame } from './simulateNextGame';

const App = () => {
  const [rounds, setRounds] = useState([]);
  const [bankerInput, setBankerInput] = useState('');
  const [playerInput, setPlayerInput] = useState('');
  const [prediction, setPrediction] = useState({ 莊: 0, 閒: 0, 和: 0 });

  const parseInput = (str) => {
    return str
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n) && n >= 0 && n <= 10);
  };

  const handleAddRound = () => {
    const bankerCards = parseInput(bankerInput);
    const playerCards = parseInput(playerInput);

    if (bankerCards.length < 2 || bankerCards.length > 3 || playerCards.length < 2 || playerCards.length > 3) {
      alert('請輸入 2~3 張牌，範例：9,8');
      return;
    }

    const newRounds = [...rounds, { banker: bankerCards, player: playerCards }];
    setRounds(newRounds);
    setBankerInput('');
    setPlayerInput('');

    const result = simulateNextGame(newRounds, 10000);
    setPrediction(result);
  };

  const handleClear = () => {
    setRounds([]);
    setPrediction({ 莊: 0, 閒: 0, 和: 0 });
  };

  const getPercentage = (count) => {
    const total = prediction.莊 + prediction.閒 + prediction.和;
    return total === 0 ? '0.0' : ((count / total) * 100).toFixed(1);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🔍 AI 精準百家樂預測</h1>
      <p>根據你輸入的每局實際發牌結果模擬 10000 次預測下一局</p>

      <div style={{ marginBottom: '1rem' }}>
        <div>
          <label>莊牌（用 , 分隔）：</label>
          <input value={bankerInput} onChange={(e) => setBankerInput(e.target.value)} placeholder="例如：9,8" />
        </div>
        <div>
          <label>閒牌（用 , 分隔）：</label>
          <input value={playerInput} onChange={(e) => setPlayerInput(e.target.value)} placeholder="例如：4,1,10" />
        </div>
        <button onClick={handleAddRound} style={{ marginTop: '0.5rem' }}>加入此局結果</button>
        <button onClick={handleClear} style={{ marginLeft: '1rem' }}>清除所有紀錄</button>
      </div>

      <div>
        <strong>目前輸入牌局：</strong>
        <ul>
          {rounds.map((r, i) => (
            <li key={i}>第 {i + 1} 局：莊[{r.banker.join(',')}] 閒[{r.player.join(',')}]</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h3>📊 下一局預測機率：</h3>
        <div>莊：{getPercentage(prediction.莊)}%</div>
        <div>閒：{getPercentage(prediction.閒)}%</div>
        <div>和：{getPercentage(prediction.和)}%</div>
      </div>
    </div>
  );
};

export default App;
