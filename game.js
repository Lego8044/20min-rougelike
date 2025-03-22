// Phaser 3 Game Setup
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var zombies = [];
var cursors;
var bullets;
var bulletTime = 0;

var game = new Phaser.Game(config);

function preload() {
    console.log("Loading assets...");

    // Load local assets from the repository (ensure these files are uploaded to GitHub)
    this.load.image('player', 'player.png');  // Replace with your player image filename
    this.load.image('zombie', 'zombie.png');  // Replace with your zombie image filename
    this.load.image('bullet', 'bullet.png');  // Replace with your bullet image filename
}

function create() {
    console.log("Phaser Version: " + Phaser.VERSION);
    console.log("Game Loaded");

    // Set the background color to white
    this.cameras.main.setBackgroundColor('#ffffff');

    // Player setup
    player = this.physics.add.image(400, 300, 'player').setOrigin(0.5, 0.5);
    player.setCollideWorldBounds(true);

    // Bullet group setup
    bullets = this.add.group({ // Corrected context to use this.add instead of this.physics.add
        defaultKey: 'bullet',
        maxSize: 10
    });

    // Controls
    cursors = this.input.keyboard.createCursorKeys();

    // Create zombies (we will use simple random positioning for now)
    for (var i = 0; i < 5; i++) {
        var zombie = this.physics.add.image(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), 'zombie');
        zombies.push(zombie);
    }

    console.log("Player and Zombies Created");
}

function update() {
    // Player movement
    if (cursors.left.isDown) {
        player.x -= 4;
    } else if (cursors.right.isDown) {
        player.x += 4;
    }
    if (cursors.up.isDown) {
        player.y -= 4;
    } else if (cursors.down.isDown) {
        player.y += 4;
    }

    // Shooting (space bar)
    if (this.input.keyboard.checkDown(cursors.space, 200)) {
        fireBullet();
    }

    // Update zombies (move towards player)
    zombies.forEach(function(zombie) {
        this.physics.moveToObject(zombie, player, 50);
    }, this);
}

// Bullet firing function
function fireBullet() {
    if (game.time.now > bulletTime) {
        var bullet = bullets.get(player.x, player.y);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.setVelocity(0, -300);
            bulletTime = game.time.now + 200;
        }
    }
}
