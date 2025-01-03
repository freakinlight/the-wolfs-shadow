import Player from "./player";
import Enemy from "./enemy";
import Background from "./background";
import Apple from "./apple";
import Message from "./message";

class Game {
  constructor(canvas, far, mid, near, fore, house) {
    // Initialize canvas contexts for different layers
    this.canvas = canvas;
    this.farCanvas = far;
    this.midCanvas = mid;
    this.nearCanvas = near;
    this.foreCanvas = fore;
    this.houseCanvas = house;

    this.context = canvas.getContext('2d');
    this.farContext = far.getContext('2d');
    this.midContext = mid.getContext('2d');
    this.nearContext = near.getContext('2d');
    this.foreContext = fore.getContext('2d');
    this.houseContext = house.getContext('2d');

    // Game state variables
    this.level = 1;
    this.apples = 0;
    this.pause = true;
    this.sound = true;
    this.power = 800;
    this.winTransition = false;
    this.isWon = false;

    // Initialization of game elements
    this.initializeGame();
    this.initializeElements();
    this.initializeParallax();
    this.jump = this.jump.bind(this);
    this.touchJump = this.touchJump.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.won = this.won.bind(this);
  }

  // Key and click event listeners for jumping
  initializeGame() {
    document.addEventListener('keydown', (e) => this.jump(e));
    document.addEventListener('click', (e) => this.touchJump(e));
  }

  // Initialize game characters and items
  initializeElements() {
    this.littleRed = new Player(this.context);
    this.enemy = new Enemy(this.context);
    this.items = [
      new Apple(this.context, 'lowApple', 875, 1000),
      new Apple(this.context, 'lowApple', 1175, 1200),
      new Apple(this.context, 'medApple', 1025, 1200),
      new Apple(this.context, 'medApple', 1525, 1400),
      new Apple(this.context, 'highApple', 1375, 1400),
      new Apple(this.context, 'highApple', 2075, 1600)
    ];
  }

  // Initialize backgrounds with parallax effect
  initializeParallax() {
    this.farGround = new Background(this.farContext, 'far');
    this.midGround = new Background(this.midContext, 'mid');
    this.nearGround = new Background(this.nearContext, 'near');
    this.houseGround = new Background(this.houseContext, 'house');
    this.foreGround = new Background(this.foreContext, 'fore');
    this.foreGround.text = new Message(this.context, 1);
  }

  // Increment game level and adjust enemy behavior
  addLevel() {
    this.level += 1;
    this.enemy.minXPos += 50;
    this.foreGround.text = new Message(this.context, this.level);
  }

  // Check for collisions between player and apples
  checkCollision() {
    this.items.forEach(item => {
      if (this.littleRed.isTouching(item)) {
        item.xPos += item.xOffset;
        this.enemy.speed -= item.value;
        this.apples += 1;
        if (this.sound) {
          item.sound.play();
        }
      }
    });
  }

  // Check if the game is lost
  isLost() {
    return this.enemy.xPos === 400 && this.littleRed.yPos === 300;
  }

  // Trigger winning condition
  won() {
    this.enemy.fallBack();
    this.items.forEach(item => {
      item.value = 0;
      item.speed = 3;
    });
    this.winTransition = true;
  }

  // Player jump action
  jump(e) {
    if (e.code === 'Space' && this.littleRed.jumps < 3) {
      this.littleRed.jump();
    }
  }

  // Touch-based jump action
  touchJump(e) {
    if (e.target.id === 'foreCanvas' && this.littleRed.jumps < 3) {
      this.littleRed.jump();
    }
  }

  // Reset game state to initial conditions
  playAgain() {
    this.pause = true;
    this.winTransition = false;
    this.isWon = false;
    this.level = 1;
    this.apples = 0;
    this.power = 800;
    this.initializeElements();
    this.foreGround.text = new Message(this.context, this.level);
    this.houseGround = new Background(this.houseContext, 'house');
    this.context.clearRect(0, 0, 800, 400);
    this.houseContext.clearRect(0, 0, 800, 400);
    this.foreGround.draw();
  }

  // Render game elements and manage transitions
  renderBackgrounds() {
    if (this.winTransition) {
      this.farGround.render(0.5);
      this.midGround.render(0.5);
      this.nearGround.render(0.5);
      this.houseGround.render(0.5);
    } else {
      this.farGround.render(this.enemy.speed);
      this.midGround.render(this.enemy.speed);
      this.nearGround.render(this.enemy.speed);
    }
  }

  // Render apples and apply speed adjustments
  renderApples() {
    this.items.forEach(item => {
      item.render(this.enemy.speed);
    });
  }

  // Main render function for game loop
  render() {
    this.renderBackgrounds();
    this.context.clearRect(0, 0, 800, 400);
    this.littleRed.render();
    this.enemy.render();
    this.renderApples();
    this.checkCollision();

    // Foreground and winning logic
    if (this.winTransition) {
      this.foreGround.render(0.5, this.enemy.xPos);
      this.enemy.xPos -= 1;
      if (this.enemy.xPos < -200) {
        this.isWon = true;
      }
    } else {
      this.foreGround.render(this.enemy.speed, this.enemy.xPos);
    }
  }
}

export default Game;

