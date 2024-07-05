// For detecting the collision
function rectangleCollision({ rectangle1, rectangle2 }) {
    return rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
}

// For declaring the winner
function declareWinner({ player, enemy, timerId }) {
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
        declareWinner({ player, enemy, timerId });
    }
}