class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        // For background image
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;
        this.offset = offset;
    }

    draw() {
        c.drawImage(
            this.image,
            // For setting the shop animation----------------------
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            // ----------------------------------------------------
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            this.image.width / this.framesMax * this.scale,
            this.image.height * this.scale
        );
    }

    animateFrames() {
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
    }

    update() {
        this.draw();
        this.animateFrames();
    }
};

class Fighter extends Sprite {
    constructor({ position, velocity, colour, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 },sprites }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

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
        this.sprites = sprites;

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
    }

    // Updates the player and enemy
    update() {
        // For drawing them again and again throughout the animation
        this.draw();
        // For player animation
        this.animateFrames();
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