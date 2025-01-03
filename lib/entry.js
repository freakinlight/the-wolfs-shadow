import _ from 'lodash';
import Timer from 'easytimer.js';
import Game from './game';

// Initialize game canvases and interface elements
document.addEventListener('DOMContentLoaded', () => {
  const far = document.getElementById('farCanvas');
  const mid = document.getElementById('midCanvas');
  const near = document.getElementById('nearCanvas');
  const fore = document.getElementById('foreCanvas');
  const canvas = document.getElementById('myCanvas');
  const house = document.getElementById('houseCanvas');

  const game = new Game(canvas, far, mid, near, fore, house);
  const timer = new Timer();

  // Button elements for game controls
  const pauseBtn = document.getElementById('pause');
  const playBtn = document.getElementById('play');
  const muteBtn = document.getElementById('mute');
  const unmuteBtn = document.getElementById('unmute');
  const retryBtn = document.getElementById('retry');
  const startBtn = document.getElementById('start');
  const playAgainBtn = document.getElementById('play-again');

  // Interface elements for displaying game status
  const clock = document.getElementById('timer');
  const gameWon = document.getElementById('game-won');
  const gameStart = document.getElementById('game-start');
  const gameLost = document.getElementById('game-lost');
  const appleCount = document.getElementById('apple-count');
  let animationId;

  // Background music setup
  const music = new Audio('./assets/sound/Escaping the Collapsing Universe - Komiku.mp3');
  music.loop = true;

  // Timer setup to manage game events based on time
  timer.addEventListener('secondTenthsUpdated', () => {
    clock.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths']);
    appleCount.innerHTML = `${game.apples} Apples Collected`;

    const minutes = timer.getTimeValues().minutes;
    const seconds = timer.getTimeValues().seconds;
    const tenths = timer.getTimeValues().secondTenths;

    // Trigger events based on game time
    if (seconds % 10 === 0 && tenths === 0 && game.sound) {
      game.enemy.growl();
    }
    if (seconds % 12 === 0 && tenths === 0) {
      game.addLevel();
    }
    if (minutes === 2 && seconds === 0) {
      game.won();
      timer.stop();
    }
  });

  // Animation frame step
  function step() {
    game.render();
    animationId = requestAnimationFrame(step);

    // Check game state and update UI accordingly
    if (game.isLost()) {
      cancelAnimationFrame(animationId);
      game.littleRed.sound.pause();
      if (game.sound) game.enemy.growl();
      timer.stop();
      gameLost.classList.remove('hidden');
    } else if (game.isWon) {
      cancelAnimationFrame(animationId);
      game.littleRed.sound.pause();
      timer.stop();
      gameWon.classList.remove('hidden');
    }
  }

  // Function to start or resume the game
  function play() {
    if (game.pause) {
      game.pause = false;
      requestAnimationFrame(step);
      timer.start({ precision: 'secondTenths' });
      if (game.sound) {
        music.play();
        game.littleRed.sound.play();
      }
    }
  }

  // Event listeners for game control buttons
  pauseBtn.onclick = () => {
    if (!game.pause) {
      game.pause = true;
      cancelAnimationFrame(animationId);
      timer.pause();
      game.littleRed.sound.pause();
    }
  };

  playBtn.onclick = () => {
    play();
  };

  playAgainBtn.onclick = () => {
    gameWon.classList.add('hidden');
    clock.innerHTML = '00:00:0';
    game.playAgain();
    play();
  };

  startBtn.onclick = () => {
    gameStart.classList.add('hidden');
    clock.innerHTML = '00:00:0';
    game.playAgain();
    play();
  };

  retryBtn.onclick = () => {
    gameLost.classList.add('hidden');
    clock.innerHTML = '00:00:0';
    game.playAgain();
    play();
  };

  muteBtn.onclick = () => {
    game.sound = false;
    music.pause();
    game.littleRed.sound.pause();
  };

  unmuteBtn.onclick = () => {
    game.sound = true;
    music.play();
    game.littleRed.sound.play();
  };
});

