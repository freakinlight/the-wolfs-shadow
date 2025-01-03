class Power {
  constructor(context) {
    // Set up the drawing context for the power bar
    this.context = context;
    // Load the power bar image
    this.image = new Image();
    this.image.src = './assets/images/elements/power.png';
  }

  /**
   * Renders the power bar based on the current power level.
   * @param {number} power - The current power level to display.
   */
  render(power) {
    // Calculate the percentage of power remaining
    const percent = (power + 175) / 575;

    // Determine which portion of the power bar image to display based on the percentage
    if (percent === 1) {
      // Full power
      this.context.drawImage(this.image, 0, 800, 400, 50, 25, 25, 200, 25);
    } else if (percent > (15 / 16)) {
      // 15/16 power
      this.context.drawImage(this.image, 0, 750, 400, 50, 25, 25, 200, 25);
    } else if (percent > (14 / 16)) {
      // 14/16 power
      this.context.drawImage(this.image, 0, 700, 400, 50, 25, 25, 200, 25);
    } else if (percent > (13 / 16)) {
      // 13/16 power
      this.context.drawImage(this.image, 0, 650, 400, 50, 25, 25, 200, 25);
    } else if (percent > (12 / 16)) {
      // 12/16 power
      this.context.drawImage(this.image, 0, 600, 400, 50, 25, 25, 200, 25);
    } else if (percent > (11 / 16)) {
      // 11/16 power
      this.context.drawImage(this.image, 0, 550, 400, 50, 25, 25, 200, 25);
    } else if (percent > (10 / 16)) {
      // 10/16 power
      this.context.drawImage(this.image, 0, 500, 400, 50, 25, 25, 200, 25);
    } else if (percent > (9 / 16)) {
      // 9/16 power
      this.context.drawImage(this.image, 0, 450, 400, 50, 25, 25, 200, 25);
    } else if (percent > (8 / 16)) {
      // 8/16 power
      this.context.drawImage(this.image, 0, 400, 400, 50, 25, 25, 200, 25);
    } else if (percent > (7 / 16)) {
      // 7/16 power
      this.context.drawImage(this.image, 0, 350, 400, 50, 25, 25, 200, 25);
    } else if (percent > (6 / 16)) {
      // 6/16 power
      this.context.drawImage(this.image, 0, 300, 400, 50, 25, 25, 200, 25);
    } else if (percent > (5 / 16)) {
      // 5/16 power
      this.context.drawImage(this.image, 0, 250, 400, 50, 25, 25, 200, 25);
    } else if (percent > (4 / 16)) {
      // 4/16 power
      this.context.drawImage(this.image, 0, 200, 400, 50, 25, 25, 200, 25);
    } else if (percent > (3 / 16)) {
      // 3/16 power
      this.context.drawImage(this.image, 0, 150, 400, 50, 25, 25, 200, 25);
    } else if (percent > (2 / 16)) {
      // 2/16 power
      this.context.drawImage(this.image, 0, 100, 400, 50, 25, 25, 200, 25);
    } else if (percent > (1 / 16)) {
      // 1/16 power
      this.context.drawImage(this.image, 0, 50, 400, 50, 25, 25, 200, 25);
    } else {
      // No power
      this.context.drawImage(this.image, 0, 0, 400, 50, 25, 25, 200, 25);
    }
  }
}

export default Power;

