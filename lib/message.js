class Message {
  constructor(context, level) {
    this.context = context; // The canvas context where the message will be drawn
    this.frameCount = 0;    // Counter to manage the animation frames
    this.spriteY = -100;    // Initial position for sprite Y-axis
    this.image = new Image(); // Image object for the level text

    // Set the source image based on the current game level
    switch (level) {
      case 1:
        this.image.src = './assets/images/text/level_one.png';
        break;
      case 2:
        this.image.src = './assets/images/text/level_two.png';
        break;
      case 3:
        this.image.src = './assets/images/text/level_three.png';
        break;
      case 4:
        this.image.src = './assets/images/text/level_four.png';
        break;
      case 5:
        this.image.src = './assets/images/text/level_five.png';
        break;
      case 6:
        this.image.src = './assets/images/text/level_six.png';
        break;
      case 7:
        this.image.src = './assets/images/text/level_seven.png';
        break;
      case 8:
        this.image.src = './assets/images/text/level_eight.png';
        break;
      case 9:
        this.image.src = './assets/images/text/level_nine.png';
        break;
      case 10:
        this.image.src = './assets/images/text/level_ten.png';
        break;
    }
  }

  render() {
    // Draw the image at the specified position, adjusting based on the frameCount
    this.context.drawImage(
      this.image, 0, this.spriteY, 1000, 100, 150, 100, 500, 50
    );
    // Update the frameCount and adjust spriteY position to create animation effect
    this.frameCount = (this.frameCount + 1) % 10;
    if (this.frameCount === 0) {
      this.spriteY = (this.spriteY + 100);
    }
  }
}

export default Message;

