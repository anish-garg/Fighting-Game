const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Sets the width and height of the canvas
canvas.width = 1024;
canvas.height = 514;

// Sets the position and colour of the canvas
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

class sprite {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastKey;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 50, 150);
    }

    // Updates the player and enemy
    update() {
        // For drawing them again and again throughout the animation
        this.draw();
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
}

const player = new sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
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
    }
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