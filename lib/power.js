// Classe Message pour afficher un message correspondant à un niveau donné
class Message {
  constructor(context, level) {
    this.context = context; // Contexte de dessin (Canvas)
    this.frameCount = 0; // Compteur pour gérer les animations ou la logique des frames
    this.spriteY = -100; // Position verticale initiale dans l'image sprite
    this.image = new Image(); // Image pour le message

    // Chargement de l'image correspondant au niveau spécifié
    switch (level) {
      case 1:
        this.image.src = './assets/images/text/level_one.png'; // Image pour le niveau 1
        break;
      case 2:
        this.image.src = './assets/images/text/level_two.png'; // Image pour le niveau 2
        break;
      case 3:
        this.image.src = './assets/images/text/level_three.png'; // Image pour le niveau 3
        break;
      case 4:
        this.image.src = './assets/images/text/level_four.png'; // Image pour le niveau 4
        break;
      case 5:
        this.image.src = './assets/images/text/level_five.png'; // Image pour le niveau 5
        break;
      case 6:
        this.image.src = './assets/images/text/level_six.png'; // Image pour le niveau 6
        break;
      case 7:
        this.image.src = './assets/images/text/level_seven.png'; // Image pour le niveau 7
        break;
      case 8:
        this.image.src = './assets/images/text/level_eight.png'; // Image pour le niveau 8
        break;
      case 9:
        this.image.src = './assets/images/text/level_nine.png'; // Image pour le niveau 9
        break;
      case 10:
        this.image.src = './assets/images/text/level_ten.png'; // Image pour le niveau 10
        break;
      default:
        console.warn(`Niveau ${level} non pris en charge`); // Message d'avertissement pour un niveau non supporté
    }
  }

  // Méthode pour afficher le message sur le canvas
  render() {
    this.context.drawImage(
      this.image, // Image à dessiner
      0, this.spriteY, // Coordonnées de départ dans l'image sprite
      1000, 100, // Largeur et hauteur dans l'image source
      150, 100, // Coordonnées où dessiner sur le canvas
      500, 50 // Largeur et hauteur sur le canvas
    );

    // Mise à jour du compteur de frames pour gérer l'animation ou les changements
    this.frameCount = (this.frameCount + 1) % 10;

    // Mise à jour de la position verticale (spriteY) après un certain nombre de frames
    if (this.frameCount === 0) {
      this.spriteY = (this.spriteY + 100);
    }
  }
}

export default Message; // Exportation de la classe pour utilisation dans d'autres fichiers
