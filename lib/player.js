// Constantes représentant les différentes actions possibles du joueur et leurs images associées
const RUNNING = {
  src: './assets/images/little_red_riding/red_running.png', // Image pour l'animation de course
};

const JUMPING = {
  src: './assets/images/little_red_riding/red_jumping.png', // Image pour l'animation de saut
};

const FALLING = {
  src: './assets/images/little_red_riding/red_falling.png', // Image pour l'animation de chute
};

// Classe Player qui représente le personnage contrôlé par le joueur
class Player {
  constructor(context) {
    this.context = context; // Contexte de dessin (Canvas)
    this.xPos = 550; // Position horizontale initiale
    this.yPos = 300; // Position verticale initiale
    this.speed = 0; // Vitesse horizontale (non utilisée ici)
    this.yVel = 0; // Vitesse verticale
    this.gravity = 0.9; // Gravité simulée pour les mouvements verticaux
    this.motion = 'running'; // État actuel du joueur (running, jumping, falling)
    this.jumps = 0; // Nombre de sauts effectués
    this.initializeImages(); // Chargement des images nécessaires
    this.sound = new Audio('./assets/sound/leaves_rustling.wav'); // Son d'ambiance
    this.sound.loop = true; // Répétition du son en boucle
    this.sound.volume = 0.5; // Volume initial du son

    this.frameCount = 0; // Compteur pour gérer les animations par sprite
    this.spriteY = 0; // Position verticale actuelle dans l'image sprite
  }

  // Méthode pour initialiser et charger les images des différents états du joueur
  initializeImages() {
    this.runningImg = new Image();
    this.runningImg.src = RUNNING.src;

    this.jumpingImg = new Image();
    this.jumpingImg.src = JUMPING.src;

    this.fallingImg = new Image();
    this.fallingImg.src = FALLING.src;
  }

  // Vérifie si le joueur touche un objet donné
  isTouching(object) {
    const rangeX = object.xPos + object.dx; // Portée horizontale de l'objet
    const rangeY = object.yPos + object.dy; // Portée verticale de l'objet

    // Vérification des collisions en comparant les positions
    if (this.xPos > rangeX || this.xPos + 50 < object.xPos) {
      return false; // Pas de collision horizontale
    } else if (this.yPos > rangeY || this.yPos + 50 < object.yPos) {
      return false; // Pas de collision verticale
    } else {
      return true; // Collision détectée
    }
  }

  // Méthode pour faire sauter le joueur
  jump() {
    this.motion = 'jumping'; // Passe en mode saut
    this.jumps += 1; // Incrémente le compteur de sauts
    this.yVel = 12; // Donne une impulsion verticale au joueur
    this.sound.volume = 0.3; // Diminue légèrement le volume du son pendant le saut
  }

  // Méthode pour afficher le joueur dans son état actuel
  render() {
    if (this.motion === 'running') {
      // Affichage de l'animation de course
      this.context.drawImage(
        this.runningImg, 0, this.spriteY, 300, 300, this.xPos, this.yPos, 75, 75
      );

      // Mise à jour de l'animation par frames
      this.frameCount = (this.frameCount + 1) % 4;
      if (this.frameCount === 0) {
        this.spriteY = (this.spriteY + 300) % 2400;
      }

    } else if (this.motion === 'jumping') {
      // Mouvement vers le haut pendant le saut
      this.yPos -= this.yVel;
      this.yVel -= this.gravity; // Application de la gravité

      if (this.yVel < 0) {
        this.motion = 'falling'; // Passe en mode chute une fois le saut terminé
      }

      // Affichage de l'animation de saut
      this.context.drawImage(
        this.jumpingImg, 0, this.spriteY, 300, 300, this.xPos, this.yPos, 75, 75
      );

      // Mise à jour de l'animation par frames
      this.frameCount = (this.frameCount + 1) % 4;
      if (this.frameCount === 0) {
        this.spriteY = (this.spriteY + 300) % 1200;
      }

    } else if (this.motion === 'falling') {
      // Gestion du mouvement de chute
      if (this.yPos + this.yVel > 300) {
        // Arrêt de la chute lorsque le sol est atteint
        this.motion = 'running';
        this.yPos = 300;
        this.yVel = 0;
        this.jumps = 0;
        this.sound.volume = 0.5; // Rétablissement du volume sonore
      } else {
        this.yPos += this.yVel; // Accélération vers le bas
        this.yVel += this.gravity;
      }

      // Affichage de l'animation de chute
      this.context.drawImage(
        this.fallingImg, 0, this.spriteY, 300, 300, this.xPos, this.yPos, 75, 75
      );

      // Mise à jour de l'animation par frames
      this.frameCount = (this.frameCount + 1) % 4;
      if (this.frameCount === 0) {
        this.spriteY = (this.spriteY + 300) % 1200;
      }
    }
  }
}

export default Player; // Exportation de la classe pour utilisation dans d'autres fichiers
