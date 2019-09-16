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
        movingUp: false,
    };

    const obstacle = {
        x: 0,
        y: 0,
        width: 500,
        height: 30,
    };

    const updatePlayerPosition = distance => {
        if (player.movingUp) {
            const futurePlayer = { ...player, y: player.y - distance };
            player.y = willCollide(futurePlayer, obstacle) ? obstacle.y + obstacle.height : futurePlayer.y;
        }

        if (player.movingLeft) {
            const futurePlayer = { ...player, x: player.x - distance };
            player.x = willCollide(futurePlayer, obstacle) ? obstacle.x + obstacle.width : futurePlayer.x;
        }

        if (player.movingRight) {
            const futurePlayer = { ...player, x: player.x + distance };
            player.x = willCollide(futurePlayer, obstacle) ? obstacle.x - player.width : futurePlayer.x;
        }

        const futurePlayer = { ...player, y: player.y + distance / 2 };
        player.y = willCollide(futurePlayer, obstacle) ? obstacle.y - player.height : futurePlayer.y;
    }

    return {
        player,
        obstacle,
        updatePlayerPosition,
    }
}

export default makeGame;