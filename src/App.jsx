import React, { useState } from 'react';
import { simulateNextGame } from './simulateNextGame'; // 确保模拟函数正确引入

const App = () => {
  const [rounds, setRounds] = useState([]);
  const [prediction, setPrediction] = useState({ 莊: 0, 閒: 0, 和: 0 });
  const [selectedBankerCards, setSelectedBankerCards] = useState([]);
  const [selectedPlayerCards, setSelectedPlayerCards] = useState([]);

  // 选择牌的函数，存储到对应的数组
  const handleCardSelection = (cardType, cardValue) => {
    if (cardType === 'banker') {
      setSelectedBankerCards((prev) => [...prev, cardValue]);
    } else if (cardType === 'player') {
      setSelectedPlayerCards((prev) => [...prev, cardValue]);
    }
  };

  // 添加新的一局
  const handleAddRound = () => {
    if (selectedBankerCards.length < 2 || selectedPlayerCards.length < 2) {
      alert('每局必须有两张牌！');
      return;
    }

    const newRounds = [...rounds, { banker: selectedBankerCards, player: selectedPlayerCards }];
    setRounds(newRounds);
    setSelectedBankerCards([]);
    setSelectedPlayerCards([]);

    // 模拟并获取下一局的预测结果
    const result = simulateNextGame(newRounds, 10000); // 模拟10000局
    setPrediction(result);
  };

  // 清除所有记录
  const handleClear = () => {
    setRounds([]);
    setPrediction({ 莊: 0, 閒: 0, 和: 0 });
  };

  // 获取百分比
  const getPercentage = (count) => {
    const total = prediction.莊 + prediction.閒 + prediction.和;
    return total === 0 ? '0.0' : ((count / total) * 100).toFixed(1);
  };

  // 渲染选择按钮
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
      <h1>🔍 AI 精准百家樂预测</h1>
      <p>根据你输入的每局实际发牌结果模拟 10000 次预测下一局</p>

      <div style={{ marginBottom: '1rem' }}>
        <h3>选择莊牌</h3>
        {renderCardButtons('banker')}

        <h3>选择閒牌</h3>
        {renderCardButtons('player')}

        <button onClick={handleAddRound} style={{ marginTop: '1rem' }}>
          加入此局结果
        </button>
        <button onClick={handleClear} style={{ marginLeft: '1rem' }}>
          清除所有记录
        </button>
      </div>

      <div>
        <strong>目前输入牌局：</strong>
        <ul>
          {rounds.map((r, i) => (
            <li key={i}>
              第 {i + 1} 局：莊[{r.banker.join(',')}] 閒[{r.player.join(',')}]
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h3>📊 下一局预测概率：</h3>
        <div>莊：{getPercentage(prediction.莊)}%</div>
        <div>閒：{getPercentage(prediction.閒)}%</div>
        <div>和：{getPercentage(prediction.和)}%</div>
      </div>
    </div>
  );
};

export default App;
