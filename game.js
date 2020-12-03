// Config of Engine
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

// Game Variable
var game = new Phaser.Game(config);

function preload() {
  this.load.image("square", "sprites/square.png");
}

function create() {
  var cam = this.cameras.main;

  cam.setBounds(0, 0, 1024, 1024);
  const centerX = cam.worldView.x + cam.width / 2;
  const centerY = cam.worldView.y + cam.height / 2;

  this.text = this.add.text(0, 0, "0", { font: "40px Impact" });
  this.statusText = this.add.text(0, 50, "0", { font: "40px Impact" });

  //Square gameobject
  square = this.add.image(centerX - 200, centerY, "square");
  square.setInteractive();
  square.setDataEnabled();
  square.data.set("isRunning", false);

  square.on(
    Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
    function () {
      if (!square.data.get("isRunning")) {
        var tween = this.tweens.add({
          targets: square,
          x: centerX + 200,
          ease: "Bounce.easeOut",
          duration: 1500,
          yoyo: true,
          angle: 90,

          //Callbacks
          onStart: () => {
            square.data.set("isRunning", true);
            updateStatusText();

            particles.emitParticleAt(square.x, square.y);
          },
          onComplete: () => {
            square.data.set("isRunning", false);
            updateStatusText();
          },
          onUpdate: () => {
            this.text.setText("rot: " + square.angle);
          },
        });
      }
    },
    this
  );

  let particles = this.add.particles("square");

  particles.createEmitter({
    angle: { min: 0, max: 360 },
    speed: { min: 300, max: 500 },
    rotate: { min: 90, max: 180 },
    quantity: 20,
    scale: 0.3,
    lifespan: 500,
    alpha: { start: 1, end: 0, ease: "Cubic.easeOut" },
    on: false,
  });

  particles.createEmitter({
    scale: { start: 1, end: 1.5, ease: "Cubic.easeIn" },
    alpha: { start: 0.7, end: 0, ease: "Cubic.easeIn" },
    lifespan: 500,
    on: false,
  });
}

function updateStatusText() {
  this.statusText = "isRunning: " + square.data.get("isRunning").toString();
}

function update() {}
