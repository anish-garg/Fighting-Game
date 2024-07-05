const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Sets the width and height of the canvas
canvas.width = 1024;
canvas.height = 576;

// Sets the position and colour of the canvas
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc:'./assets/background.png'
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    colour: 'blue',
    offset: {
        x: 0,
        y: 0
    }
})

player.draw();

const enemy = new Fighter({
    position: {
        x: 400,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    colour: 'red',
    offset: {
        x: -50,
        y: 0
    },
})

enemy.draw();

// Keys object for taking in account if the key is pressed or not
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

let lastKey;

decrementTimer();

function animate() {
    // Runs this animate function again and again
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    player.update();
    enemy.update();


    player.velocity.x = 0;
    enemy.velocity.x = 0;
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -3;
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 3;
    }
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -3;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 3;
    }

    // If player is attacking
    if (rectangleCollision({
        rectangle1: player, rectangle2: enemy
    }) && player.isAttacking) {
        // console.log('Player Attacked');
        player.isAttacking = false;
        enemy.health -= 20;
        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    }

    // If enemy is attacking
    if (rectangleCollision({
        rectangle1: enemy, rectangle2: player
    }) && enemy.isAttacking) {
        // console.log('Enemy Attacked');
        enemy.isAttacking = false;
        player.health -= 20;
        document.querySelector('#playerHealth').style.width = player.health + '%';
    }

    // If any of the health bar reaches 0
    if (enemy.health <= 0 || player.health <= 0) {
        declareWinner({ player, enemy, timerId });
    }
}

animate();

// For moving the player and enemy
window.addEventListener('keydown', (event) => {
    // For Player movements
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w':
            player.velocity.y = -20;
            break;
        case ' ':
            player.Attack();
            break;
    }

    // For enemy movements
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20;
            break;
        case 'ArrowDown':
            enemy.Attack();
            break;
    }
})

window.addEventListener('keyup', (event) => {
    // Player Keys
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }

    // Enemy Keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
})