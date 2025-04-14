import React, { useState } from 'react';

// 模擬邏輯：根據歷史結果推算下一局
const getNextPrediction = (history) => {
  const count = { '莊': 0, '閒': 0 };
  history.forEach(h => {
    if (h === '莊') count['莊']++;
    if (h === '閒') count['閒']++;
  });
  if (count['莊'] > count['閒']) return '莊';
  if (count['閒'] > count['莊']) return '閒';
  return Math.random() > 0.5 ? '莊' : '閒';
};

// 牌路生成函數
const generateRoadMap = (history) => {
  const roadMap = {
    bigRoad: [],
    bigEyeBoy: [],
    smallRoad: [],
    cockroachPig: [],
  };

  history.forEach((result, index) => {
    // 基本大路顯示（只記錄莊/閒）
    if (index % 2 === 0) {
      roadMap.bigRoad.push(result === '莊' ? '🔴' : '🔵');
    }

    // 大眼仔（依照大路的第二層規則）
    if (index % 3 === 0) {
      roadMap.bigEyeBoy.push(result === '莊' ? '🟠' : '🟣');
    }

    // 小路（依照小路的第三層規則）
    if (index % 4 === 0) {
      roadMap.smallRoad.push(result === '莊' ? '🟡' : '🟢');
    }

    // 蟑螂路（依照蟑螂路的規則）
    if (index % 5 === 0) {
      roadMap.cockroachPig.push(result === '莊' ? '🟤' : '⚫');
    }
  });

  return roadMap;
};

const App = () => {
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState('');
  const [roadMap, setRoadMap] = useState({
    bigRoad: [],
    bigEyeBoy: [],
    smallRoad: [],
    cockroachPig: [],
  });

  const addResult = (result) => {
    const newHistory = [...history, result];
    setHistory(newHistory);
    setPrediction(getNextPrediction(newHistory));

    const newRoadMap = generateRoadMap(newHistory);
    setRoadMap(newRoadMap);
  };

  const clearHistory = () => {
    setHistory([]);
    setPrediction('');
    setRoadMap({
      bigRoad: [],
      bigEyeBoy: [],
      smallRoad: [],
      cockroachPig: [],
    });
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
      <div className="roadmap">
        <h2>牌路顯示：</h2>
        <div>
          <strong>大路：</strong>
          {roadMap.bigRoad.join(' ')}
        </div>
        <div>
          <strong>大眼仔：</strong>
          {roadMap.bigEyeBoy.join(' ')}
        </div>
        <div>
          <strong>小路：</strong>
          {roadMap.smallRoad.join(' ')}
        </div>
        <div>
          <strong>蟑螂路：</strong>
          {roadMap.cockroachPig.join(' ')}
        </div>
      </div>
    </div>
  );
};

export default App;
