// 模擬 5000 局歷史結果
const outcomes = ['莊', '閒', '和'];

export const generateHistoryData = (length = 5000000) => {
  const history = [];
  for (let i = 0; i < length; i++) {
    const rand = Math.random();
    if (rand < 0.45) history.push('莊');
    else if (rand < 0.9) history.push('閒');
    else history.push('和');
  }
  return history;
};
