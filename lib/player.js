// Constants for player animations, defining the source image for each motion state
const RUNNING = {
  src: './assets/images/little_red_riding/red_running.png',
};

const JUMPING = {
  src: './assets/images/little_red_riding/red_jumping.png',
};

const FALLING = {
  src: './assets/images/little_red_riding/red_falling.png',
};

class Player {
  constructor(context) {
    // Initialize the drawing context
    this.context = context;

    // Player's position and motion properties
    this.xPos = 550; // Initial horizontal position
    this.yPos = 300; // Initial vertical position
    this.speed = 0; // Horizontal speed (not currently used)
    this.yVel = 0; // Vertical velocity for jumping and falling
    this.gravity = 0.9; // Gravity effect
    this.motion = 'running'; // Current motion state ('running', 'jumping', or 'falling')
    this.jumps = 0; // Number of consecutive jumps allowed

    // Initialize images for different motion states
    this.initializeImages();

    // Setup sound effect for player movement
    this.sound = new Audio('./assets/sound/leaves_rustling.wav');
    this.sound.loop = true; // Continuous playback
    this.sound.volume = 0.5; // Initial volume level

    // Sprite animation properties
    this.frameCount = 0; // Tracks animation frames
    this.spriteY = 0; // Current vertical sprite position for animation
  }

  // Load images for player animations
  initializeImages() {
    this.runningImg = new Image();
    this.runningImg.src = RUNNING.src;

    this.jumpingImg = new Image();
    this.jumpingImg.src = JUMPING.src;

    this.fallingImg = new Image();
    this.fallingImg.src = FALLING.src;
  }

  // Check if the player is touching a given object
  isTouching(object) {
    const rangeX = object.xPos + object.dx; // Horizontal range of the object
    const rangeY = object.yPos + object.dy; // Vertical range of the object

    // Return false if no overlap in either axis; otherwise, return true
    return !(
      this.xPos > rangeX ||
      this.xPos + 50 < object.xPos ||
      this.yPos > rangeY ||
      this.yPos + 50 < object.yPos
    );
  }

  // Trigger a jump for the player
  jump() {
    this.motion = 'jumping'; // Set motion state to 'jumping'
    this.jumps += 1; // Increment jump counter
    this.yVel = 12; // Initial upward velocity for jump
    this.sound.volume = 0.3; // Lower sound volume during jump
  }

  // Render the player based on the current motion state
  render() {
    if (this.motion === 'running') {
      // Render running animation
      this.context.drawImage(
        this.runningImg, 0, this.spriteY, 300, 300, this.xPos, this.yPos, 75, 75
      );

      // Advance animation frame
      this.frameCount = (this.frameCount + 1) % 4;
      if (this.frameCount === 0) {
        this.spriteY = (this.spriteY + 300) % 2400;
      }
    } else if (this.motion === 'jumping') {
      // Update vertical position and velocity during jump
      this.yPos -= this.yVel;
      this.yVel -= this.gravity;

      // Switch to falling motion if upward velocity is exhausted
      if (this.yVel < 0) {
        this.motion = 'falling';
      }

      // Render jumping animation
      this.context.drawImage(
        this.jumpingImg, 0, this.spriteY, 300, 300, this.xPos, this.yPos, 75, 75
      );

      // Advance animation frame
      this.frameCount = (this.frameCount + 1) % 4;
      if (this.frameCount === 0) {
        this.spriteY = (this.spriteY + 300) % 1200;
      }
    } else if (this.motion === 'falling') {
      // Check if player lands on the ground
      if (this.yPos + this.yVel > 300) {
        this.motion = 'running'; // Reset to running motion
        this.yPos = 300; // Set position to ground level
        this.yVel = 0; // Reset vertical velocity
        this.jumps = 0; // Reset jump counter
        this.sound.volume = 0.5; // Restore sound volume
      } else {
        // Update vertical position and velocity during fall
        this.yPos += this.yVel;
        this.yVel += this.gravity;
      }

      // Render falling animation
      this.context.drawImage(
        this.fallingImg, 0, this.spriteY, 300, 300, this.xPos, this.yPos, 75, 75
      );

      // Advance animation frame
      this.frameCount = (this.frameCount + 1) % 4;
      if (this.frameCount === 0) {
        this.spriteY = (this.spriteY + 300) % 1200;
      }
    }
  }
}

export default Player;

