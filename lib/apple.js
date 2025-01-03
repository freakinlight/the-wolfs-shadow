// Definitions for different types of apples with varying attributes
const HIGH_APPLE = {
  src: './assets/images/elements/apple3.png', // Image source for high apple
  value: 0.8, // Value associated with high apple
  yPos: 60, // Vertical position for high apple
  dx: 35, // Width of the apple image when drawn
  dy: 35, // Height of the apple image when drawn
};

const MED_APPLE = {
  src: './assets/images/elements/apple2.png', // Image source for medium apple
  value: 0.6, // Value associated with medium apple
  yPos: 140, // Vertical position for medium apple
  dx: 35, // Width of the apple image when drawn
  dy: 35, // Height of the apple image when drawn
};

const LOW_APPLE = {
  src: './assets/images/elements/apple1.png', // Image source for low apple
  value: 0.4, // Value associated with low apple
  yPos: 220, // Vertical position for low apple
  dx: 35, // Width of the apple image when drawn
  dy: 35, // Height of the apple image when drawn
};

// Apple class to handle creating and managing apples in the game
class Apple {
  constructor(context, description, xPos, xOffset) {
    // Selecting the apple type based on the description provided
    switch (description) {
      case 'lowApple':
        this.options = LOW_APPLE;
        break;
      case 'medApple':
        this.options = MED_APPLE;
        break;
      case 'highApple':
        this.options = HIGH_APPLE;
        break;
    }

    this.context = context; // Canvas rendering context
    this.value = this.options.value; // Value of the apple
    this.speed = 4; // Base speed of the apple
    this.xPos = xPos; // Horizontal starting position of the apple
    this.yPos = this.options.yPos; // Vertical position set by the apple type
    this.dx = this.options.dx; // Width of the apple
    this.dy = this.options.dy; // Height of the apple
    this.xOffset = xOffset; // Horizontal offset to reset apple position
    this.sound = new Audio('./assets/sound/apple1.wav'); // Sound effect for apple

    this.image = new Image(); // Image object for the apple
    this.image.src = this.options.src; // Setting the image source
    this.render = this.render.bind(this); // Binding the render method to ensure correct context

    this.frameCount = 0; // Frame counter for sprite animation
    this.spriteY = 0; // Y offset in the sprite sheet
  }

  // Render method to draw the apple on canvas
  render(speed) {
    // Drawing the apple image slice based on current sprite position
    this.context.drawImage(
      this.image, 0, this.spriteY, 100, 100, this.xPos, this.yPos, this.dx, this.dy
    );

    // Update frame count for sprite animation
    this.frameCount = (this.frameCount + 1) % 8;
    if (this.frameCount === 0) {
      this.spriteY = (this.spriteY + 100) % 400;
    }

    // Reset position if apple moves off-screen
    if (this.xPos <= -50) this.xPos += this.xOffset;
    // Decrement x position to move apple across the screen
    this.xPos -= (this.speed - (2 * speed));
  }
}

// Exporting the Apple class for use in other modules
export default Apple;

