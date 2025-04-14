import React, { useState, useEffect } from 'react';
import { generateHistoryData } from './historyData';

const App = () => {
  const [inputHistory, setInputHistory] = useState([]);
  const [prediction, setPrediction] = useState({ 莊: 0, 閒: 0, 和: 0 });
  const [matchedCount, setMatchedCount] = useState(0);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // 初次進入時產生模擬歷史資料
    const data = generateHistoryData();
    setHistoryData(data);
  }, []);

  const handleInput = (value) => {
    const newHistory = [...inputHistory, value];
    setInputHistory(newHistory);
    calculatePrediction(newHistory);
  };

  const handleClear = () => {
    setInputHistory([]);
    setPrediction({ 莊: 0, 閒: 0, 和: 0 });
    setMatchedCount(0);
  };

  const calculatePrediction = (pattern) => {
    if (pattern.length === 0) return;

    let matchResults = { 莊: 0, 閒: 0, 和: 0 };
    let matchCount = 0;

    for (let i = 0; i < historyData.length - pattern.length; i++) {
      const slice = historyData.slice(i, i + pattern.length);
      if (slice.join() === pattern.join()) {
        const next = historyData[i + pattern.length];
        if (next) {
          matchResults[next]++;
          matchCount++;
        }
      }
    }

    setPrediction(matchResults);
    setMatchedCount(matchCount);
  };

  const getPercentage = (count) => {
    const total = prediction.莊 + prediction.閒 + prediction.和;
    return total === 0 ? '0.0' : ((count / total) * 100).toFixed(1);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🎴 AI 百家樂走勢預測</h1>

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
        <strong>比對歷史資料次數：</strong> {matchedCount}
        <h3>🔮 下一局預測機率：</h3>
        <div>莊：{getPercentage(prediction.莊)}%</div>
        <div>閒：{getPercentage(prediction.閒)}%</div>
        <div>和：{getPercentage(prediction.和)}%</div>
      </div>
    </div>
  );
};

export default App;
