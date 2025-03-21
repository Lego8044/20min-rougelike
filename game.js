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

    // Load local assets from the repository
    this.load.image('player', 'player.png');
    this.load.image('zombie', 'zombie.png');
    this.load.image('bullet', 'bullet.png');
}
}

function create() {
    console.log("Game Loaded");

    // Player setup
    player = this.physics.add.image(400, 300, 'player').setOrigin(0.5, 0.5);
    player.setCollideWorldBounds(true);

    // Bullet group
    bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize: 10
    });

    // Controls
    cursors = this.input.keyboard.createCursorKeys();

    // Create a few zombies
    for (var i = 0; i < 5; i++) {
        var zombie = this.physics.add.image(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), 'zombie');
        zombies.push(zombie);
    }
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
