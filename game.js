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
  square = this.add.image(centerX, centerY, "square");
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
          ease: "Cubic.easeInOut",
          duration: 1500,
          yoyo: true,
          angle: 765,

          //Callbacks
          onStart: () => {
            square.data.set("isRunning", true);
            updateStatusText();
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
}

function updateStatusText() {
  this.statusText = "isRunning: " + square.data.get("isRunning").toString();
}

function update() {}
