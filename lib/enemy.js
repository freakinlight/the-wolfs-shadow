class Enemy {
  constructor(context) {
    this.context = context; // Canvas rendering context
    this.minXPos = -175; // Minimum horizontal position
    this.xPos = -175; // Initial horizontal position
    this.yPos = 300; // Vertical position
    this.acceleration = 0.005; // Acceleration rate
    this.speed = 0; // Initial speed
    // Audio elements for enemy growl sounds
    this.growl1 = new Audio('./assets/sound/growl1.wav');
    this.growl2 = new Audio('./assets/sound/growl2.wav');
    this.growl3 = new Audio('./assets/sound/growl3.wav');
    this.initializeImages(); // Method to load images

    this.frameCount = 0; // Frame counter for animations
    this.spriteY = 0; // Y position in the sprite sheet
  }

  // Method to cap the speed to prevent excessive speed
  assessSpeed() {
    if (this.speed > 0.5) {
      this.speed = 0.5;
    } else if (this.speed < -0.5) {
      this.speed = -0.5;
    }
  }

  // Method to adjust the X position to keep within bounds
  assessXPos() {
    if (this.xPos < this.minXPos) {
      this.xPos += 0.5;
    } else if (this.xPos > 400) {
      this.xPos = 400;
    }
  }

  // Load enemy images
  initializeImages() {
    this.image = new Image();
    this.image.src = './assets/images/big_bad_wolf/wolf_running.png';
  }

  // Method to simulate the enemy falling back
  fallBack() {
    this.acceleration = 0;
    this.speed = 0;
    this.minXPos = -200;
  }

  // Play one of three growl sounds randomly
  growl() {
    const random = Math.floor(Math.random() * 3) + 1;
    switch (random) {
      case 1:
        this.growl1.play();
        break;
      case 2:
        this.growl2.play();
        break;
      case 3:
        this.growl3.play();
        break;
    }
  }

  // Render method to draw the enemy on the canvas
  render() {
    this.context.drawImage(
      this.image, 0, this.spriteY, 400, 200, this.xPos, this.yPos, 200, 100
    );
    this.frameCount = (this.frameCount + 1) % 4;
    if (this.frameCount === 0) {
      this.spriteY = (this.spriteY + 200) % 1200;
    }

    this.speed += this.acceleration;
    this.assessSpeed();
    this.xPos += this.speed;
    this.assessXPos();
  }
}

export default Enemy;

