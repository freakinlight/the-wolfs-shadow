
# The Wolf's Shadow

## Project Overview
"The Wolf's Shadow" is a captivating browser-based game that leverages the timeless tale of Little Red Riding Hood. Players guide Little Red through increasingly perilous woods, dodging the ever-approaching Big Bad Wolf. Developed using HTML Canvas and JavaScript, the game combines engaging gameplay mechanics with beautifully rendered visuals and dynamic interactions.

## Technologies
- **JavaScript**: Powers the core gameplay logic, event handling, and dynamic content updates.
- **HTML Canvas**: Used for drawing and animating game elements on the web page dynamically.
- **CSS**: Manages the presentation layer, including game layout and element styling.
- **Affinity Designer**: Creates high-quality, scalable vector graphics for game characters and environments.

## Installation
To set up the game on your local machine, follow these instructions:

```bash
git clone https://github.com/freakinlight/The-wolfs-shadow.git
cd The-wolfs-shadow
# Simply open the index.html file in any modern web browser to start the game
```

## Features
### Gameplay
- **Dynamic Parallax Scrolling**: Creates a multi-layered visual effect that enhances the depth and immersion of the game environment.
- **Adaptive Difficulty Levels**: As the game progresses, the distance between Little Red and the Wolf decreases, adding to the game's challenge.

### Interactivity
- **Collision Detection**: Implements a sophisticated mechanism to detect overlaps between game entities such as characters and objects.
- **Pickup and Power-ups**: Collect apples to temporarily boost Little Red's speed, delaying the wolf's advance.

### Audiovisual Elements
- **Custom Artwork and Animations**: Each sprite and background is carefully crafted to reflect the fairytale theme.
- **Soundtrack and Effects**: Features an original musical score and sound effects that players can toggle on/off.

### Game Mechanics
```javascript
// Example of collision detection logic
isTouching(object) {
  return !(this.xPos > object.xPos + object.dx || 
           this.xPos + 50 < object.xPos ||
           this.yPos > object.yPos + object.dy || 
           this.yPos + 50 < object.yPos);
}
```

```javascript
// Level progression mechanic
addLevel() {
  this.level++;
  this.bigBadWolf.minXPos += 50; // Increases the challenge by moving the wolf closer
  this.foreGround.text = new ScreenText(this.context, this.level);
}
```

## Future Enhancements
- **Mobile Optimization**: Ensure the game is fully responsive and playable on various touchscreen devices.
- **Dynamic Endings**: Different ending animations based on player success or failure.
- **Gameplay Variability**: Introduce varied apple effects, each with unique gameplay impacts.

## Contributing
We encourage contributions from developers of all skill levels. To contribute:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a new Pull Request.


## Acknowledgments

We extend our deepest gratitude to everyone who contributed to the success of "The Wolf's Shadow." Special mentions include:

- **The original storytellers and guardians of the "Little Red Riding Hood" fairy tale**, which served as a profound inspiration for the thematic elements and narrative of our game.
- **The vibrant open source community**, whose diverse range of tools and libraries played a pivotal role in the technical development of our project.
- **École Centrale Casablanca (ECC)**, for fostering an innovative and supportive environment that encourages the exploration and realization of such creative projects.

A heartfelt thanks also goes to the numerous forums, tutorial creators, and documentation authors within the tech community. Your dedication to sharing knowledge and facilitating learning experiences is truly invaluable and appreciated.

## Contributors
Special thanks to the developers and artists who have contributed to making "The Wolf's Shadow" a reality:

- **Nour** - freakinlight - nour.mazouz@centrale-casablanca.ma
- **Aya** - ayamazili15@gmail.com \ aya.mazili@centrale-casablanca.ma
- **Youssef** - 6iyoussef@gmail.com
- **Alberic** - iriealberic@email.com
- **Yassine** - yassinouassour20@gmail.com
- **Adnane** - sabraouiadnane8@gmail.com

Please contact the contributors via their emails for specific inquiries or contributions.


