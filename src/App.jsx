
import React, { useState } from 'react';

const getNextPrediction = (history) => {
  // 模擬邏輯：簡單統計莊/閒的頻率
  const count = { '莊': 0, '閒': 0 };
  history.forEach(h => {
    if (h === '莊') count['莊']++;
    if (h === '閒') count['閒']++;
  });
  if (count['莊'] > count['閒']) return '莊';
  if (count['閒'] > count['莊']) return '閒';
  return Math.random() > 0.5 ? '莊' : '閒';
};

const App = () => {
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState('');

  const addResult = (result) => {
    const newHistory = [...history, result];
    setHistory(newHistory);
    setPrediction(getNextPrediction(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    setPrediction('');
  };

  return (
    <div className="app">
      <h1>AI 開牌預測</h1>
      <div className="buttons">
        <button onClick={() => addResult('莊')}>莊</button>
        <button onClick={() => addResult('閒')}>閒</button>
        <button onClick={() => addResult('和')}>和</button>
        <button onClick={clearHistory}>清除</button>
      </div>
      <div className="history">
        <h2>歷史結果：</h2>
        <div>{history.join(' → ')}</div>
      </div>
      <div className="prediction">
        <h2>預測下一局：</h2>
        <strong>{prediction}</strong>
      </div>
    </div>
  );
};

export default App;
