const coinBtn = document.getElementById('coin-toss-btn');
const resultDiv = document.getElementById('coin-result');
const backBtn = document.getElementById('back-to-counter');

coinBtn.onclick = function() {
  const isFirst = Math.random() < 0.5;
  if (isFirst) {
    resultDiv.textContent = 'プレーヤー1が先行！';
    resultDiv.className = 'coin-result coin-animate';
  } else {
    resultDiv.textContent = 'プレーヤー2が先行！';
    resultDiv.className = 'coin-result coin-animate';
  }
  setTimeout(() => {
    resultDiv.className = 'coin-result';
  }, 1200);
};

backBtn.onclick = function() {
  window.location.href = 'index.html';
}; 