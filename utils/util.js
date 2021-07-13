const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`;
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

const randomRange = (low, high) => {
  return Math.round(Math.random() * (high - low + 1) + low);
};

const shuffle = arr => {
  let len = arr.length, randomIndex;
  while (len) {
    randomIndex = Math.floor(Math.random() * len);
    len--;
    [arr[len], arr[randomIndex]] = [arr[randomIndex], arr[len]];
  }
  return arr;
};

module.exports = {
  formatTime,
  randomRange,
  shuffle
};
