'use strict';

// cursor del sistema — sin cursor personalizado

// ── NAVBAR SCROLL ───────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── PARALLAX LOGO DE FONDO ──────────────────
const bgLogo = document.getElementById('bg-logo');
if (bgLogo) {
  let targetY = 0, currentY = 0;
  window.addEventListener('scroll', () => {
    targetY = window.scrollY * 0.10;
  }, { passive: true });
  (function animateParallax() {
    currentY += (targetY - currentY) * 0.06;
    bgLogo.style.transform = `translate(-50%, calc(-50% + ${currentY}px))`;
    requestAnimationFrame(animateParallax);
  })();
}

// ── ONDAS DE FONDO ──────────────────────────
const canvas = document.getElementById('wave-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let t = 0;
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  function wave(yBase, amp, freq, speed, color, lw) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    for (let x = 0; x <= canvas.width; x += 2) {
      const y = yBase
        + Math.sin((x * freq) + (t * speed)) * amp
        + Math.sin((x * freq * .5) + (t * speed * 1.3)) * amp * .35;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  (function animateWaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const h = canvas.height;
    wave(h * .28, 18, .008, .30, '#2E6DA4', 1.1);
    wave(h * .44, 13, .010, .24, '#1D9E75', .9);
    wave(h * .60, 24, .006, .38, '#2E6DA4', .7);
    wave(h * .76, 10, .013, .26, '#5DCAA5', .5);
    t += .009;
    requestAnimationFrame(animateWaves);
  })();
}

// ── MINI MAPA ARPSIS ────────────────────────
const miniMap = document.getElementById('mini-map');
if (miniMap) {
  const mc = miniMap.getContext('2d');
  const p  = miniMap.parentElement;
  miniMap.width  = p.offsetWidth;
  miniMap.height = p.offsetHeight;
  const w = miniMap.width, h = miniMap.height;
  mc.beginPath();
  mc.moveTo(w*.08,h*.45);
  mc.bezierCurveTo(w*.10,h*.22,w*.26,h*.09,w*.46,h*.11);
  mc.bezierCurveTo(w*.66,h*.07,w*.86,h*.14,w*.92,h*.30);
  mc.bezierCurveTo(w*.96,h*.46,w*.88,h*.66,w*.78,h*.73);
  mc.bezierCurveTo(w*.64,h*.84,w*.50,h*.90,w*.34,h*.86);
  mc.bezierCurveTo(w*.19,h*.82,w*.05,h*.70,w*.08,h*.45);
  mc.strokeStyle='rgba(46,109,164,.35)'; mc.lineWidth=.8; mc.stroke();
  mc.fillStyle='rgba(15,35,64,.55)'; mc.fill();
  [[[ w*.30,h*.18],[w*.34,h*.32],[w*.40,h*.50],[w*.42,h*.72]],
   [[w*.54,h*.14],[w*.51,h*.30],[w*.47,h*.50],[w*.44,h*.73]],
   [[w*.70,h*.23],[w*.64,h*.40],[w*.59,h*.56],[w*.54,h*.76]]
  ].forEach(pts => {
    mc.beginPath(); mc.moveTo(pts[0][0],pts[0][1]);
    pts.slice(1).forEach(p=>mc.lineTo(p[0],p[1]));
    mc.strokeStyle='rgba(29,158,117,.45)'; mc.lineWidth=.7; mc.stroke();
  });
  function sr(s){let x=Math.sin(s)*10000;return x-Math.floor(x);}
  for(let i=0;i<140;i++){
    const px=w*(.12+sr(i*7+1)*.76), py=h*(.14+sr(i*7+2)*.70);
    const dx=(px-w*.5)/(w*.42), dy=(py-h*.5)/(h*.40);
    if(dx*dx+dy*dy>1) continue;
    mc.beginPath(); mc.arc(px,py,1.4,0,Math.PI*2);
    mc.fillStyle=sr(i*7+3)>.65?'rgba(93,202,165,.85)':'rgba(46,109,164,.65)';
    mc.fill();
  }
}

// ── SCROLL REVEAL ───────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = (entry.target.dataset.delay || 0) * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
