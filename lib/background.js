import Power from "./power";
import Message from "./message";

// Definitions for different types of parallax background elements
const FAR_BACKGROUND = {
  src: './assets/images/parallax/background_far.png',
  speed: 2,
  adjust: 0.5,
  dx: 1500,
};

const MID_BACKGROUND = {
  src: './assets/images/parallax/background_mid.png',
  speed: 3,
  adjust: 1,
  dx: 1500,
};

const NEAR_BACKGROUND = {
  src: './assets/images/parallax/background_near.png',
  speed: 4,
  adjust: 2,
  dx: 1500,
};

const FOREGROUND = {
  src: './assets/images/parallax/foreground.png',
  speed: 5,
  adjust: 3,
  dx: 1500,
};

const HOUSE = {
  src: './assets/images/parallax/grandmas_house.png',
  speed: 3,
  adjust: 0,
  dx: 2500,
};

// Background class to manage different layers of the game's background
class Background {
  constructor(context, description) {
    // Select background based on description
    switch (description) {
      case 'far':
        this.options = FAR_BACKGROUND;
        break;
      case 'mid':
        this.options = MID_BACKGROUND;
        break;
      case 'near':
        this.options = NEAR_BACKGROUND;
        break;
      case 'fore':
        this.options = FOREGROUND;
        break;
      case 'house':
        this.options = HOUSE;
        break;
    }

    this.description = description;
    this.speed = this.options.speed; // Speed of background scrolling
    this.adjust = this.options.adjust; // Speed adjustment factor
    this.xPos = 0; // Initial horizontal position
    this.dx = this.options.dx; // Width of the background image
    this.dx1 = null; // Dynamic position for continuous scrolling
    this.dx2 = null; // Dynamic position for continuous scrolling
    this.dy = 0; // Vertical position (usually zero unless adjusted)
    this.context = context;

    this.draw = this.draw.bind(this);
    this.render = this.render.bind(this);
    this.text = null;

    this.image = new Image();
    this.image.onload = () => {
      this.context.drawImage(
        this.image, 0, 0, this.dx, 400, this.dx1, this.dy, this.dx, 400
      );
    };
    this.image.src = this.options.src;

    if (this.description === 'fore') {
      this.powerBar = new Power(this.context); // Power bar for foreground
    }
  }

  // Draw method to render background image on canvas
  draw() {
    this.context.drawImage(
      this.image, 0, 0, this.dx, 400, this.dx1, this.dy, this.dx, 400
    );
    this.context.drawImage(
      this.image, 0, 0, this.dx, 400, this.dx2, this.dy, this.dx, 400
    );
  }

  // Render method to update background position and render it
  render(speed = 0, power = null) {
    this.context.clearRect(0, 0, 800, 400); // Clear canvas
    this.dx1 = this.xPos; // Update position for continuous scrolling
    this.dx2 = this.xPos + this.dx; // Update position for seamless looping
    this.draw(); // Draw background

    if (this.description === 'fore') {
      this.powerBar.render(power); // Render power bar if foreground
    }
    if (this.text) {
      this.text.render(); // Render text if available
    }

    // Reset position for looping background except for 'house'
    if (this.xPos <= -1500 && this.description !== 'house') this.xPos += 1500;
    this.xPos -= (this.speed - (this.adjust * speed)); // Update horizontal position based on speed
  }
}

export default Background;

