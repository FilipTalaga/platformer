function willCollide(player, obstacle) {
    const vertically = player.y + player.height > obstacle.y && player.y < obstacle.y + obstacle.height;
    const horizontally = player.x + player.width > obstacle.x && player.x < obstacle.x + obstacle.width;
    return vertically && horizontally;
}

function makeGame() {
    const player = {
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        movingLeft: false,
        movingRight: false,
        jumping: false,
        inJump: false,
        fallSpeed: 0,
    };

    const obstacle = {
        x: 0,
        y: 0,
        width: 500,
        height: 30,
    };

    const updatePlayerPosition = distance => {
        /* Move up if jump pressed or if already in jump */
        if (player.jumping || player.inJump) {
            if (!player.inJump) {
                player.inJump = true;
            }
            const futurePlayer = { ...player, y: player.y - distance * 2 };
            player.y = willCollide(futurePlayer, obstacle) ? obstacle.y + obstacle.height : futurePlayer.y;
        }

        /* Move left if left pressed */
        if (player.movingLeft) {
            const futurePlayer = { ...player, x: player.x - distance };
            player.x = willCollide(futurePlayer, obstacle) ? obstacle.x + obstacle.width : futurePlayer.x;
        }

        /* Move right if right pressed */
        if (player.movingRight) {
            const futurePlayer = { ...player, x: player.x + distance };
            player.x = willCollide(futurePlayer, obstacle) ? obstacle.x - player.width : futurePlayer.x;
        }

        /* Move down with gravity */
        const futurePlayer = { ...player, y: player.y + Math.floor(player.fallSpeed / 5) };
        if (willCollide(futurePlayer, obstacle)) {
            player.fallSpeed = 0;
            player.inJump = false;
        }
        player.y = willCollide(futurePlayer, obstacle) ? obstacle.y - player.height : futurePlayer.y;
        player.fallSpeed += 1;
    }

    return {
        player,
        obstacle,
        updatePlayerPosition,
    }
}

export default makeGame;