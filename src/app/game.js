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
        startJump: false,
        jumping: false,
        velocity: 0,
    };

    const obstacles = [
        { x: 0, y: 0, width: 500, height: 30, },
        { x: 0, y: 0, width: 30, height: 500, },
        { x: 0, y: 0, width: 100, height: 30, },
        { x: 0, y: 0, width: 100, height: 30, },
        { x: 0, y: 0, width: 100, height: 30, },
    ];

    const updatePlayerPosition = distance => {
        /* Move left if left pressed */
        if (player.movingLeft) {
            const futurePlayer = { ...player, x: player.x - distance };

            let collisions = obstacles.filter(obstacle => willCollide(futurePlayer, obstacle));

            while (collisions.length > 0) {
                futurePlayer.x = collisions[0].x + collisions[0].width;
                collisions = obstacles.filter(obstacle => willCollide(futurePlayer, obstacle));
            }

            player.x = futurePlayer.x;
        }

        /* Move right if right pressed */
        if (player.movingRight) {
            const futurePlayer = { ...player, x: player.x + distance };

            let collisions = obstacles.filter(obstacle => willCollide(futurePlayer, obstacle));

            while (collisions.length > 0) {
                futurePlayer.x = collisions[0].x - player.width;
                collisions = obstacles.filter(obstacle => willCollide(futurePlayer, obstacle));
            }

            player.x = futurePlayer.x;
        }

        /* Move vertically, jump on up pressed, fall with gravity */
        if (player.startJump && !player.jumping) {
            player.velocity = -(distance * 10);
        }
        const isPositive = player.velocity >= 0;
        const roundedFallDistance = Math.floor(player.velocity / 5);
        const futurePlayer = { ...player, y: player.y + (roundedFallDistance !== 0 ? roundedFallDistance : 1) };
        player.velocity += 1;
        player.jumping = true;

        let collisions = obstacles.filter(obstacle => willCollide(futurePlayer, obstacle));

        while (collisions.length > 0) {
            if (isPositive) {
                futurePlayer.y = collisions[0].y - player.height;
                player.jumping = false;
            } else {
                futurePlayer.y = collisions[0].y + collisions[0].height;
            }

            player.velocity = 0;
            collisions = obstacles.filter(obstacle => willCollide(futurePlayer, obstacle));
        }

        player.y = futurePlayer.y;
    }

    return {
        player,
        obstacles,
        updatePlayerPosition,
    }
}

export default makeGame;