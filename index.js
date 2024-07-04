const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Sets the width and height of the canvas
canvas.width = 1024;
canvas.height = 576;

// Sets the position and colour of the canvas
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

class sprite {
    constructor({ position, velocity, colour, offset }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey;
        // Creating a attack for the player and enemy,setting its position, width and height
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.colour = colour;
        this.isAttacking;
        this.health = 100;
    }

    draw() {
        c.fillStyle = this.colour;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        if (this.isAttacking) {
            c.fillStyle = 'green';
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }

    // Updates the player and enemy
    update() {
        // For drawing them again and again throughout the animation
        this.draw();
        // To change the position of enemy's attack box
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        // For changing the position on y axis and x axis
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // To make them stop before the canvas ends,so that player and enemy does not cross the canvas
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
            //Gravity helps in doing this 
        } else {
            this.velocity.y += gravity;
        }
    }

    Attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
}

const player = new sprite({
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

const enemy = new sprite({
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

// For detecting the collision
function rectangleCollision({ rectangle1, rectangle2 }) {
    return rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
}

// For declaring the winner
function declareWinner({ player, enemy,timerId }) {
    clearTimeout(timerId);
    if (player.health == enemy.health) {
        document.querySelector('#finalVerdict').innerHTML = 'Tie';
    } else if (player.health > enemy.health) {
        document.querySelector('#finalVerdict').innerHTML = 'Player 1 wins';
    } else {
        document.querySelector('#finalVerdict').innerHTML = 'Player 2 wins';
    }
}

// For timer of the game
let timer = 60;
let timerId;
function decrementTimer() {
    if (timer > 0) {
        timer--;
        document.querySelector('#timer').innerHTML = timer;
        timerId = setTimeout(decrementTimer, 1000);
    }

    if (timer == 0) {
        declareWinner({ player, enemy,timerId });
    }
}
decrementTimer();

function animate() {
    // Runs this animate function again and again
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
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
        declareWinner({ player, enemy,timerId });
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