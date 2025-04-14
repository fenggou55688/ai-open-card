import React, { useState } from 'react';
import { simulateNextGame } from './simulateNextGame';

const App = () => {
  const [inputHistory, setInputHistory] = useState([]);
  const [prediction, setPrediction] = useState({ 莊: 0, 閒: 0, 和: 0 });

  const handleInput = (value) => {
    const newHistory = [...inputHistory, value];
    setInputHistory(newHistory);
    const result = simulateNextGame(newHistory, 10000);
    setPrediction(result);
  };

  const handleClear = () => {
    setInputHistory([]);
    setPrediction({ 莊: 0, 閒: 0, 和: 0 });
  };

  const getPercentage = (count) => {
    const total = prediction.莊 + prediction.閒 + prediction.和;
    return total === 0 ? '0.0' : ((count / total) * 100).toFixed(1);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🎴 AI 開牌預測</h1>
      <p>根據真實百家樂規則模擬 10000 次預測下一局</p>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => handleInput('莊')}>莊</button>
        <button onClick={() => handleInput('閒')}>閒</button>
        <button onClick={() => handleInput('和')}>和</button>
        <button onClick={handleClear} style={{ marginLeft: '1rem' }}>清除紀錄</button>
      </div>

      <div>
        <strong>目前走勢：</strong> {inputHistory.join(' → ') || '尚未輸入'}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h3>🔮 下一局預測機率：</h3>
        <div>莊：{getPercentage(prediction.莊)}%</div>
        <div>閒：{getPercentage(prediction.閒)}%</div>
        <div>和：{getPercentage(prediction.和)}%</div>
      </div>
    </div>
  );
};

export default App;
