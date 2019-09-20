/* World parameters in SI units */
const xVelocity = 500;   // horizontal velocity [px/s]
const jumpForce = -1200; // vertical negative velocity [px/s]
const gravity = 3800;    // vertical acceleration [px/s^2]

function willCollide(player, obstacle) {
    const vertically = player.y + player.height > obstacle.y && player.y < obstacle.y + obstacle.height;
    const horizontally = player.x + player.width > obstacle.x && player.x < obstacle.x + obstacle.width;
    return vertically && horizontally;
}

function makeGame(tps) {
    /* World parameters per tick */
    const xDistance = xVelocity / tps;   // horizontal velocity [px/s]
    const jumpDistance = jumpForce / tps; // vertical negative velocity [px/s]
    const yDistanceGain = gravity / (tps * tps);    // vertical acceleration [px/s^2]

    const player = {
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        yDistance: 0,
    };

    const state = {
        movingLeft: false,
        movingRight: false,
        startJump: false,
        jumping: false,
    };

    const obstacles = [
        { x: 0, y: 0, width: 500, height: 30, }, // Floor
        { x: 0, y: 0, width: 30, height: 500, }, // Wall
        { x: 0, y: 0, width: 100, height: 30, }, // Step 1
        { x: 0, y: 0, width: 100, height: 30, }, // Step 2
        { x: 0, y: 0, width: 100, height: 30, }, // Step 3
        { x: 0, y: 0, width: 100, height: 30, }, // Step 4
        { x: 0, y: 0, width: 0, height: 30, }, // Bottom
        { x: 0, y: 0, width: 30, height: 0, }, // Left
        { x: 0, y: 0, width: 30, height: 0, }, // Right
    ];

    const effects = [
        { x: 0, y: 0, width: 200, height: 50, color: '#3ff' }, // Launcher 1 effect
        { x: 0, y: 0, width: 200, height: 50, color: '#3ff' }, // Launcher 2 effect
    ];

    const updatePlayerPosition = () => {
        /* Move left if left pressed */
        if (player.movingLeft) {
            const futurePlayer = { ...player, x: player.x - xDistance };

            let collisions = obstacles.filter(obstacle => willCollide(futurePlayer, obstacle));

            while (collisions.length > 0) {
                futurePlayer.x = collisions[0].x + collisions[0].width;
                collisions = obstacles.filter(obstacle => willCollide(futurePlayer, obstacle));
            }

            player.x = futurePlayer.x;
        }

        /* Move right if right pressed */
        if (player.movingRight) {
            const futurePlayer = { ...player, x: player.x + xDistance };

            let collisions = obstacles.filter(obstacle => willCollide(futurePlayer, obstacle));

            while (collisions.length > 0) {
                futurePlayer.x = collisions[0].x - player.width;
                collisions = obstacles.filter(obstacle => willCollide(futurePlayer, obstacle));
            }

            player.x = futurePlayer.x;
        }

        /* Move vertically, jump on up pressed, fall with gravity */
        if (player.startJump && !player.jumping) {
            const collideWithEffect = effects.some(effect => willCollide(player, effect));
            player.yDistance = collideWithEffect ? jumpDistance * 2 : jumpDistance;
        }
        const futurePlayer = { ...player, y: player.y + player.yDistance };
        player.yDistance += yDistanceGain;
        player.jumping = true;

        let collisions = obstacles.filter(obstacle => willCollide(futurePlayer, obstacle));

        while (collisions.length > 0) {
            if (player.yDistance >= 0) {
                futurePlayer.y = collisions[0].y - player.height;
                player.jumping = false;
            } else {
                futurePlayer.y = collisions[0].y + collisions[0].height;
            }

            player.yDistance = 0;
            collisions = obstacles.filter(obstacle => willCollide(futurePlayer, obstacle));
        }

        player.y = futurePlayer.y;
    };

    return {
        player,
        state,
        obstacles,
        effects,
        updatePlayerPosition,
    };
}

export default makeGame;