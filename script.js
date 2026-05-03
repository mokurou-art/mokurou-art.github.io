const isNight = (() => {
  const h = new Date().getHours();
  return h >= 0 && h < 5;
})();

// 深夜（0〜5時）キャッチコピーを変える
(function nightVariant() {
  if (isNight) {
    const el = document.getElementById('opening-copy');
    if (el) el.innerHTML = '忘れ子は今日も笑っている。<br>あの冬のことを、知らないまま。';
  }
})();

// 雪 or 桜のアニメーション
function createSnow(sakura) {
  const container = document.getElementById('snowContainer');
  container.innerHTML = '';
  const chars = sakura ? ['❀', '✿', '·', '✾', '❁'] : ['❄', '❅', '·', '•', '˚'];
  const color = sakura ? 'rgba(255, 190, 205, 0.75)' : '#ffffff';
  const anims = ['fall-a', 'fall-b', 'fall-c'];
  const sizes = [0.18, 0.22, 0.28, 0.38, 0.5, 0.7, 1.0, 1.4];

  for (let i = 0; i < 60; i++) {
    const f = document.createElement('span');
    f.className = 'snowflake';
    f.textContent = chars[Math.floor(Math.random() * chars.length)];
    f.style.left = Math.random() * 100 + 'vw';
    f.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)] + 'em';
    f.style.opacity = (Math.random() * 0.45 + 0.15).toFixed(2);
    f.style.color = color;
    f.style.animationName = anims[Math.floor(Math.random() * anims.length)];
    f.style.animationDuration = (Math.random() * 10 + 8) + 's';
    f.style.animationDelay = '-' + (Math.random() * 12).toFixed(1) + 's';
    f.style.animationTimingFunction = 'linear';
    f.style.animationIterationCount = 'infinite';
    if (Math.random() < 0.3) {
      f.style.filter = 'blur(' + (Math.random() * 1.2 + 0.3).toFixed(1) + 'px)';
    }
    // タッチ/クリックで消える
    f.style.pointerEvents = 'auto';
    f.style.cursor = 'default';
    f.addEventListener('click', () => {
      f.style.transition = 'opacity 0.5s ease';
      f.style.opacity = '0';
      setTimeout(() => f.remove(), 500);
    });
    container.appendChild(f);
  }
}

createSnow(isNight);

// 「黙朗」長押しで隠しメッセージ＋桜に変換
(function hiddenPress() {
  const title = document.getElementById('main-title');
  const msg   = document.getElementById('hidden-msg');
  if (!title || !msg) return;
  msg.innerHTML = '忘れ子は、今日も明るい場所にいる。<br>覚えていないから。';
  let timer = null;
  let sakuraMode = isNight;
  const show = () => {
    timer = setTimeout(() => {
      msg.classList.add('visible');
      if (!sakuraMode) {
        sakuraMode = true;
        createSnow(true);
      }
    }, 600);
  };
  const hide = () => {
    clearTimeout(timer);
    setTimeout(() => {
      msg.classList.remove('visible');
      if (sakuraMode && !isNight) {
        sakuraMode = false;
        createSnow(false);
      }
    }, 2000);
  };
  title.addEventListener('mousedown',  show);
  title.addEventListener('touchstart', show, { passive: true });
  title.addEventListener('mouseup',    hide);
  title.addEventListener('mouseleave', hide);
  title.addEventListener('touchend',   hide);
})();
