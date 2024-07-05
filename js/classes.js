class Sprite {
    constructor({ position, imageSrc }) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        // For background image
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }

    update() {
        this.draw();
    }
};

class Fighter {
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
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
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