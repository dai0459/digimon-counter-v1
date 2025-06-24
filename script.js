const min = -10;
const max = 10;
let memory = 0;

const gauge = document.getElementById('memory-gauge');
const valueSpan = document.getElementById('memory-value');
const playerChangeMsg = document.getElementById('player-change-message');
let playerChangeTimeout = null;
let playerChangeAnimTimeout = null;

// 勝敗メッセージ用
let winMsgTimeout = null;
function showWinMessage(winner) {
  playerChangeMsg.textContent = `${winner}の勝ち！`;
  playerChangeMsg.style.display = 'block';
  playerChangeMsg.classList.add('player-change-animate');
  if (winMsgTimeout) clearTimeout(winMsgTimeout);
  winMsgTimeout = setTimeout(() => {
    playerChangeMsg.textContent = '';
    playerChangeMsg.style.display = 'none';
    playerChangeMsg.classList.remove('player-change-animate');
  }, 4000);
}

// 2人分のセキュリティカウント
let securityMy = 5;
let securityOp = 5;
const securityMin = 0;
const securityMax = 10;
const securityValueMy = document.getElementById('security-value-my');
const securityDecreaseMy = document.getElementById('security-decrease-my');
const securityIncreaseMy = document.getElementById('security-increase-my');
const securityValueOp = document.getElementById('security-value-op');
const securityDecreaseOp = document.getElementById('security-decrease-op');
const securityIncreaseOp = document.getElementById('security-increase-op');

function animateSecurityValue(elem) {
  elem.classList.add('security-animate');
  setTimeout(() => {
    elem.classList.remove('security-animate');
  }, 500);
}

securityDecreaseMy.onclick = () => {
  if (securityMy > securityMin) securityMy--;
  updateSecurity();
  animateSecurityValue(securityValueMy);
  if (securityMy === 0) {
    showWinMessage('プレーヤー2');
  }
};
securityIncreaseMy.onclick = () => {
  if (securityMy < securityMax) securityMy++;
  updateSecurity();
  animateSecurityValue(securityValueMy);
};
securityDecreaseOp.onclick = () => {
  if (securityOp > securityMin) securityOp--;
  updateSecurity();
  animateSecurityValue(securityValueOp);
  if (securityOp === 0) {
    showWinMessage('プレーヤー1');
  }
};
securityIncreaseOp.onclick = () => {
  if (securityOp < securityMax) securityOp++;
  updateSecurity();
  animateSecurityValue(securityValueOp);
};
function updateSecurity() {
  securityValueMy.textContent = securityMy;
  securityValueOp.textContent = securityOp;
}

function renderGauge() {
  gauge.innerHTML = '';
  for (let i = min; i <= max; i++) {
    const num = document.createElement('span');
    num.className = 'gauge-number';
    num.textContent = Math.abs(i);
    gauge.appendChild(num);
  }

  const marker = document.createElement('div');
  marker.className = 'marker';
  marker.textContent = '▲';
  gauge.appendChild(marker);

  // DOMの描画が完了してからマーカーの位置を計算・設定
  requestAnimationFrame(() => {
    const gaugeWidth = gauge.clientWidth;
    const markerWidth = marker.offsetWidth;

    // ゼロ除算を避ける
    if (gaugeWidth > 0 && markerWidth > 0) {
      const itemCount = max - min + 1; // 21
      const slotWidth = gaugeWidth / itemCount;
      const index = memory - min;

      // マーカーの中央が、対応する数字スロットの中央に来るようにleftを計算
      const markerLeft = (index * slotWidth) + (slotWidth / 2) - (markerWidth / 2);
      marker.style.left = `${markerLeft}px`;
    }
  });
}

function animateMemoryValue() {
  valueSpan.classList.add('memory-action');
  setTimeout(() => {
    valueSpan.classList.remove('memory-action');
  }, 700);
}

function showPlayerChange(show) {
  if (show) {
    playerChangeMsg.textContent = 'プレイヤーチェンジ';
    playerChangeMsg.style.display = 'block';
    playerChangeMsg.classList.add('player-change-animate');
    if (playerChangeAnimTimeout) clearTimeout(playerChangeAnimTimeout);
    playerChangeAnimTimeout = setTimeout(() => {
      playerChangeMsg.classList.remove('player-change-animate');
    }, 1000);
    if (playerChangeTimeout) clearTimeout(playerChangeTimeout);
    playerChangeTimeout = setTimeout(() => {
      playerChangeMsg.textContent = '';
      playerChangeMsg.style.display = 'none';
      playerChangeMsg.classList.remove('player-change-animate');
    }, 3000);
  } else {
    if (playerChangeTimeout) clearTimeout(playerChangeTimeout);
    if (playerChangeAnimTimeout) clearTimeout(playerChangeAnimTimeout);
    playerChangeMsg.textContent = '';
    playerChangeMsg.style.display = 'none';
    playerChangeMsg.classList.remove('player-change-animate');
  }
}

function update(prevMemory) {
  valueSpan.textContent = Math.abs(memory); // マイナス記号を除去
  renderGauge();
  // 0から変化した場合のみアニメーションとメッセージ
  if ((prevMemory === 0 && memory !== 0)) {
    animateMemoryValue();
    showPlayerChange(true);
  } else if (memory === 0) {
    showPlayerChange(false);
  }
}

document.getElementById('increase').onclick = () => {
  const prev = memory;
  if (memory < max) memory++;
  update(prev);
};
document.getElementById('decrease').onclick = () => {
  const prev = memory;
  if (memory > min) memory--;
  update(prev);
};

window.onload = () => {
  update(0);
  updateSecurity();
}; 