/* ================================================================
   FLIPFLOP – style.css
   All screens: Start · Mode Popup · Game · Win Popup
   ================================================================ */

/* ── RESET & VARIABLES ── */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --yellow:   #ffd54f;
  --purple:   #6a1b9a;
  --orange:   #ff9800;
  --green:    #2ecc71;
  --blue:     #3498db;
  --pink:     #e056fd;
  --dark:     #0f2027;
  --card-size: clamp(52px, 12vw, 90px);
}

/* ── BODY ── */
body {
  font-family: 'Luckiest Guy', cursive;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #2c5364, #203a43, #0f2027);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* ── BACKGROUND GLOW ── */
.bg-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(circle at 30% 40%, rgba(255,200,100,.30), transparent 60%),
    radial-gradient(circle at 70% 60%, rgba(0,255,255,.20),   transparent 60%);
  animation: bgMove 8s infinite alternate ease-in-out;
  pointer-events: none;
}
@keyframes bgMove {
  0%   { transform: scale(1); }
  100% { transform: scale(1.1); }
}

/* ── FLOATING STARS ── */
.stars {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}
.star {
  position: absolute;
  font-size: 20px;
  opacity: .45;
  animation: floatStar 6s ease-in-out infinite;
}
.star:nth-child(1) { top: 10%; left:  8%; animation-delay: 0s; }
.star:nth-child(2) { top: 20%; right:12%; animation-delay: 1s; }
.star:nth-child(3) { top: 70%; left:  5%; animation-delay: 2s; }
.star:nth-child(4) { top: 80%; right: 8%; animation-delay: .5s; }
.star:nth-child(5) { top: 40%; left: 90%; animation-delay: 1.5s; }
@keyframes floatStar {
  0%, 100% { transform: translateY(0)     rotate(0deg); }
  50%       { transform: translateY(-18px) rotate(15deg); }
}

/* ════════════════════════════════════════════════════════
   SCREENS  (shared)
   ════════════════════════════════════════════════════════ */
.screen {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity .4s ease, transform .4s ease;
}
.screen.hidden {
  opacity: 0;
  pointer-events: none;
  transform: scale(.96);
}

/* ════════════════════════════════════════════════════════
   SCREEN 1 – START
   ════════════════════════════════════════════════════════ */

/* Side icon buttons */
.side-buttons {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 14px;
  z-index: 20;
}
.side-buttons.left  { left:  28px; }
.side-buttons.right { right: 28px; }

.side-btn {
  width: 58px;
  height: 58px;
  border-radius: 18px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  color: #fff;
  box-shadow: 0 6px 0 rgba(0,0,0,.4);
  transition: transform .2s;
}
.side-btn:hover { transform: scale(1.12); }

.s-settings { background: #5c6bc0; }
.s-sound    { background: #26a69a; }
.s-info     { background: #ef5350; }
.s-theme    { background: #29b6f6; }
.s-more     { background: #ab47bc; }

/* Centre content */
.start-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.title {
  font-size: clamp(54px, 11vw, 88px);
  line-height: 1.05;
  text-align: center;
  color: var(--yellow);
  text-shadow: 4px 4px 0 var(--purple), 8px 8px 0 #000;
  animation: titleBob 2.6s ease-in-out infinite;
}
@keyframes titleBob {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

.subtitle {
  font-family: 'Nunito', sans-serif;
  font-weight: 900;
  font-size: 15px;
  color: rgba(255,255,255,.55);
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-top: 8px;
}

.play-btn {
  margin-top: 52px;
  padding: 22px 96px;
  font-family: 'Luckiest Guy', cursive;
  font-size: clamp(22px, 5vw, 32px);
  letter-spacing: 2px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  background: linear-gradient(45deg, #ffeb3b, #ff9800);
  color: #3d1c00;
  box-shadow: 0 10px 0 #c75000, 0 14px 36px rgba(0,0,0,.45);
  transition: transform .15s, box-shadow .15s;
}
.play-btn:hover  { transform: translateY(-3px); box-shadow: 0 13px 0 #c75000, 0 18px 40px rgba(0,0,0,.45); }
.play-btn:active { transform: translateY(6px);  box-shadow: 0  4px 0 #c75000; }

/* Bottom strip */
.bottom-btns {
  position: fixed;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 22px;
  z-index: 20;
}
.ghost-btn {
  font-family: 'Luckiest Guy', cursive;
  font-size: 13px;
  padding: 10px 22px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  color: #fff;
  letter-spacing: 1px;
}
.reset-btn  { background: #757575; }
.remove-btn { background: #43a047; }

/* ════════════════════════════════════════════════════════
   OVERLAY  (shared by mode popup & win popup)
   ════════════════════════════════════════════════════════ */
.overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0,0,0,.65);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity .3s ease;
}
.overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.popup-box {
  position: relative;
  width: min(88%, 700px);
  padding: 50px 42px 46px;
  border-radius: 30px;
  border: 2px solid rgba(255,255,255,.15);
  text-align: center;
  box-shadow: 0 32px 90px rgba(0,0,0,.7);
  transform: scale(.72);
  transition: transform .38s cubic-bezier(.34,1.56,.64,1);
}
.overlay.active .popup-box {
  transform: scale(1);
}

.close-x {
  position: absolute;
  top: 16px;
  right: 20px;
  font-size: 26px;
  cursor: pointer;
  color: rgba(255,255,255,.75);
  background: none;
  border: none;
  font-family: inherit;
  transition: color .2s, transform .2s;
}
.close-x:hover { color: #fff; transform: rotate(90deg); }

/* ════════════════════════════════════════════════════════
   MODE POPUP
   ════════════════════════════════════════════════════════ */
.mode-popup {
  background: linear-gradient(145deg, #112244ee, #0d3060ee);
}
.mode-popup h2 {
  font-size: clamp(26px, 6vw, 42px);
  color: #fff;
  text-shadow: 2px 2px 0 rgba(0,0,0,.4);
  margin-bottom: 38px;
}

.mode-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
.mode-btn {
  padding: 18px 46px;
  font-family: 'Luckiest Guy', cursive;
  font-size: clamp(17px, 4vw, 22px);
  border: none;
  border-radius: 40px;
  cursor: pointer;
  color: #fff;
  letter-spacing: 1px;
  box-shadow: 0 8px 0 rgba(0,0,0,.35);
  transition: transform .15s, box-shadow .15s;
}
.mode-btn:hover  { transform: translateY(-3px); }
.mode-btn:active { transform: translateY(5px); box-shadow: 0 3px 0 rgba(0,0,0,.35); }
.mode-easy   { background: linear-gradient(135deg, #27ae60, #2ecc71); }
.mode-medium { background: linear-gradient(135deg, #2471a3, #3498db); }
.mode-hard   { background: linear-gradient(135deg, #9b59b6, #e056fd); }

/* ════════════════════════════════════════════════════════
   SCREEN 2 – GAME
   ════════════════════════════════════════════════════════ */
#gameScreen {
  flex-direction: column;
  gap: 8px;
  padding: 8px 14px 8px;
  justify-content: flex-start;
  overflow: hidden;
}

/* Header bar */
.game-header {
  width: 100%;
  max-width: 720px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  flex-shrink: 0;
  padding-top: 6px;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.back-btn {
  background: rgba(255,255,255,.15);
  border: 2px solid rgba(255,255,255,.25);
  border-radius: 20px;
  padding: 8px 18px;
  font-family: 'Luckiest Guy', cursive;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  letter-spacing: 1px;
  transition: background .2s;
}
.back-btn:hover { background: rgba(255,255,255,.28); }

.game-title-sm {
  font-size: clamp(20px, 4vw, 28px);
  color: var(--yellow);
  text-shadow: 2px 2px 0 var(--purple);
}
.title-accent { color: #fff; }

.diff-badge {
  font-size: 12px;
  padding: 5px 14px;
  border-radius: 30px;
  color: #fff;
  letter-spacing: 2px;
}
.diff-badge.easy   { background: #27ae60; }
.diff-badge.medium { background: #2471a3; }
.diff-badge.hard   { background: #9b59b6; }

/* Stats */
.stat-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.stat-pill {
  background: rgba(255,255,255,.12);
  border: 2px solid rgba(255,255,255,.2);
  border-radius: 30px;
  padding: 8px 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: clamp(13px, 3vw, 17px);
  color: #fff;
  backdrop-filter: blur(6px);
}
.stat-pill .icon { font-size: 18px; }
.stat-val {
  color: var(--yellow);
  min-width: 40px;
  text-align: center;
}

/* ── CARD GRID ── */
.game-grid {
  display: grid;
  gap: clamp(4px, 1vw, 8px);
  max-width: 720px;
  width: 100%;
  flex: 1;
  align-content: center;
  max-height: calc(100vh - 90px);
}
.game-grid.g-easy   { grid-template-columns: repeat(4, 1fr); }
.game-grid.g-medium { grid-template-columns: repeat(5, 1fr); }
.game-grid.g-hard   { grid-template-columns: repeat(6, 1fr); }

/* ── CARD ── */
.card {
  aspect-ratio: 1;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  background: transparent;
  padding: 0;
  perspective: 600px;
  width: 100%;
}

/* Constrain card height per mode so all rows fit in viewport */
.g-easy   .card { max-height: calc((100vh - 95px) / 4 - 8px); }
.g-medium .card { max-height: calc((100vh - 95px) / 4 - 8px); }
.g-hard   .card { max-height: calc((100vh - 95px) / 5 - 8px); }

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform .45s cubic-bezier(.4,0,.2,1);
  border-radius: 12px;
}
.card.flipped .card-inner  { transform: rotateY(180deg); }
.card.matched .card-inner  { transform: rotateY(180deg); }

.card-face {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Back face (hidden side) */
.card-back {
  background: linear-gradient(135deg, #1a237e, #283593);
  border: 3px solid rgba(100,130,255,.4);
  box-shadow: 0 6px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.1);
  font-size: clamp(14px, 2.5vw, 22px);
  color: rgba(255,255,255,.45);
}
.card-back::after {
  content: '';
  position: absolute;
  inset: 5px;
  border-radius: 8px;
  border: 2px dashed rgba(255,255,255,.14);
}

/* Front face (emoji side) */
.card-front {
  background: linear-gradient(135deg, #fff9c4, #fffde7);
  border: 3px solid rgba(255,220,50,.6);
  box-shadow: 0 6px 0 rgba(180,140,0,.5), inset 0 1px 0 #fff;
  font-size: clamp(16px, 3vw, 32px);
  transform: rotateY(180deg);
}

/* Matched state */
.card.matched .card-front {
  background: linear-gradient(135deg, #c8e6c9, #a5d6a7);
  border-color: rgba(76,175,80,.7);
  box-shadow: 0 6px 0 rgba(27,94,32,.5);
  animation: matchPop .42s cubic-bezier(.34,1.56,.64,1);
}
@keyframes matchPop {
  0%   { transform: rotateY(180deg) scale(1); }
  50%  { transform: rotateY(180deg) scale(1.2); }
  100% { transform: rotateY(180deg) scale(1); }
}

/* Shake on mismatch */
.card.shake .card-inner {
  animation: shakeCard .38s ease;
}
@keyframes shakeCard {
  0%, 100% { transform: rotateY(180deg) translateX(0); }
  25%       { transform: rotateY(180deg) translateX(-6px); }
  75%       { transform: rotateY(180deg) translateX( 6px); }
}

/* ════════════════════════════════════════════════════════
   WIN POPUP
   ════════════════════════════════════════════════════════ */
.win-popup {
  background: linear-gradient(145deg, #0a2240, #1a3a60);
}

.win-emoji {
  font-size: 62px;
  display: block;
  animation: winBounce 1s ease infinite alternate;
}
@keyframes winBounce {
  0%   { transform: scale(1)    rotate(0deg); }
  100% { transform: scale(1.22) rotate(-5deg); }
}

.win-title {
  font-size: clamp(28px, 7vw, 50px);
  color: var(--yellow);
  text-shadow: 3px 3px 0 rgba(0,0,0,.4);
  margin: 14px 0 6px;
}
.win-sub {
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  color: rgba(255,255,255,.65);
  margin-bottom: 28px;
}

.win-stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}
.win-stat {
  background: rgba(255,255,255,.1);
  border-radius: 18px;
  padding: 16px 30px;
  text-align: center;
  min-width: 120px;
}
.ws-label {
  display: block;
  font-family: 'Nunito', sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,.6);
  letter-spacing: 2px;
  text-transform: uppercase;
}
.ws-val {
  display: block;
  font-size: clamp(26px, 5vw, 38px);
  color: var(--yellow);
  margin-top: 4px;
}

/* New highscore banner */
.new-hs {
  display: none;
  background: linear-gradient(90deg, #ff6f00, #ffd54f);
  color: #3d1c00;
  border-radius: 30px;
  padding: 10px 26px;
  font-size: 16px;
  margin-bottom: 22px;
  animation: hsPop .5s cubic-bezier(.34,1.56,.64,1);
}
.new-hs.show { display: inline-block; }
@keyframes hsPop {
  from { transform: scale(0); }
  to   { transform: scale(1); }
}

/* Win action buttons */
.win-btns {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}
.win-btn {
  font-family: 'Luckiest Guy', cursive;
  font-size: 18px;
  padding: 15px 38px;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  letter-spacing: 1px;
  box-shadow: 0 7px 0 rgba(0,0,0,.3);
  transition: transform .15s, box-shadow .15s;
}
.win-btn:hover  { transform: translateY(-2px); }
.win-btn:active { transform: translateY(5px); box-shadow: 0 2px 0 rgba(0,0,0,.3); }
.win-btn.primary   { background: linear-gradient(135deg, #ffeb3b, #ff9800); color: #3d1c00; }
.win-btn.secondary { background: rgba(255,255,255,.15); color: #fff; border: 2px solid rgba(255,255,255,.3); }

/* ════════════════════════════════════════════════════════
   CONFETTI
   ════════════════════════════════════════════════════════ */
.confetti-wrap {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 90;
  overflow: hidden;
}
.confetti-wrap.hidden { display: none; }

.conf {
  position: absolute;
  top: -20px;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  opacity: .9;
  animation: confFall linear forwards;
}
@keyframes confFall {
  0%   { transform: translateY(0)     rotate(0deg);   opacity: .9; }
  100% { transform: translateY(110vh) rotate(720deg); opacity: 0;  }
}

/* ════════════════════════════════════════════════════════
   ABOUT PAGE
   ════════════════════════════════════════════════════════ */
.about-screen {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
}

.about-back-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 25;
  padding: 12px 24px;
  font-family: 'Luckiest Guy', cursive;
  font-size: 16px;
  background: linear-gradient(135deg, #ef5350, #e53935);
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(239, 83, 80, 0.4);
  transition: transform .2s, box-shadow .2s;
  font-weight: bold;
  letter-spacing: 1px;
}
.about-back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(239, 83, 80, 0.5);
}
.about-back-btn:active {
  transform: translateY(1px);
  box-shadow: 0 4px 15px rgba(239, 83, 80, 0.4);
}

.about-container {
  max-width: 850px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 30px 60px;
}

.about-header {
  text-align: center;
  margin-bottom: 60px;
  animation: slideDown 0.6s ease-out;
}

.logo-box {
  margin-bottom: 20px;
}

.about-title {
  font-size: clamp(52px, 12vw, 80px);
  line-height: 1;
  color: var(--yellow);
  text-shadow: 5px 5px 0 var(--purple), 10px 10px 20px rgba(0,0,0,.6);
  margin: 0;
  letter-spacing: 4px;
  font-weight: 900;
}

.about-tagline {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-top: 12px;
  margin-bottom: 6px;
}

.about-version {
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* About Cards */
.about-card {
  background: linear-gradient(135deg, rgba(17, 34, 68, 0.85), rgba(13, 48, 96, 0.85));
  border: 1px solid rgba(255, 213, 79, 0.15);
  border-radius: 20px;
  padding: 36px 32px;
  width: 100%;
  margin-bottom: 28px;
  backdrop-filter: blur(12px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  animation: slideUp 0.6s ease-out;
}
.about-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  border-color: rgba(255, 213, 79, 0.3);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.card-icon {
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bounce 2s ease-in-out infinite;
}

.card-header h2 {
  font-size: clamp(24px, 5vw, 32px);
  color: var(--yellow);
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  letter-spacing: 1px;
}

.card-content {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.88);
}

/* Step List */
.step-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.step-list li {
  padding: 14px 0 14px 50px;
  position: relative;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 8px;
  border-left: 3px solid rgba(255, 213, 79, 0.4);
  padding-left: 32px;
}

.step-list li strong {
  color: var(--yellow);
  font-weight: 800;
}

.step-list li:before {
  content: "";
  position: absolute;
  left: -8px;
  top: 18px;
  width: 18px;
  height: 18px;
  background: var(--yellow);
  border-radius: 50%;
  opacity: 0.8;
}

/* Timeline */
.timeline {
  position: relative;
  padding: 12px 0;
}

.timeline-item {
  display: flex;
  gap: 30px;
  padding: 24px 0;
  position: relative;
}

.timeline-item-last {
  padding-bottom: 12px;
}

.timeline-marker {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
  width: 60px;
}

.marker-circle {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--yellow), #ffb300);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Nunito', sans-serif;
  font-size: 20px;
  font-weight: 900;
  color: #3d1c00;
  box-shadow: 0 8px 20px rgba(255, 213, 79, 0.3);
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-item:hover .marker-circle {
  transform: scale(1.1);
  box-shadow: 0 12px 28px rgba(255, 213, 79, 0.5);
}

.timeline-content {
  flex-grow: 1;
  padding-top: 6px;
}

.timeline-content h4 {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: var(--yellow);
  margin: 0 0 8px 0;
}

.timeline-content p {
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.82);
  margin: 0;
}

.timeline-content strong {
  color: rgba(255, 213, 79, 0.95);
  font-weight: 800;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 12px;
}

.feature-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 213, 79, 0.1);
  transition: all 0.3s ease;
}
.feature-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 213, 79, 0.25);
  transform: translateY(-2px);
}

.feature-icon {
  font-size: 32px;
  display: flex;
  align-items: flex-start;
  min-width: 40px;
}

.feature-item h4 {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: var(--yellow);
  margin: 0 0 6px 0;
}

.feature-item p {
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.5;
}

/* Modes Grid */
.modes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  margin-top: 12px;
}

.mode-box {
  padding: 28px 20px;
  border-radius: 16px;
  text-align: center;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.03);
}
.mode-box:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.3);
}

.easy-mode { border-color: rgba(46, 204, 113, 0.5); }
.easy-mode:hover { background: rgba(46, 204, 113, 0.1); }

.medium-mode { border-color: rgba(52, 152, 219, 0.5); }
.medium-mode:hover { background: rgba(52, 152, 219, 0.1); }

.hard-mode { border-color: rgba(230, 126, 34, 0.5); }
.hard-mode:hover { background: rgba(230, 126, 34, 0.1); }

.mode-box h4 {
  font-family: 'Nunito', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 8px 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.mode-box p {
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 12px 0;
  font-weight: 600;
}

.mode-info {
  display: inline-block;
  font-family: 'Nunito', sans-serif;
  font-size: 12px;
  color: var(--yellow);
  background: rgba(255, 213, 79, 0.15);
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* Footer */
.about-footer-section {
  text-align: center;
  margin-top: 50px;
  padding-top: 30px;
  border-top: 2px solid rgba(255, 213, 79, 0.25);
  width: 100%;
}

.footer-text {
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 8px 0;
  font-weight: 700;
  letter-spacing: 1px;
}

.footer-text-sub {
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  letter-spacing: 0.5px;
  font-style: italic;
}

/* Animations */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* ════════════════════════════════════════════════════════
   RESPONSIVE
   ════════════════════════════════════════════════════════ */
@media (max-width: 480px) {
  .side-buttons { display: none; }
  .bottom-btns  { display: none; }
  .mode-btn     { padding: 14px 30px; }
  .win-stat     { min-width: 100px; padding: 12px 18px; }
  .about-content-box { padding: 24px 18px; }
  .about-back-btn { padding: 8px 16px; font-size: 14px; }
}