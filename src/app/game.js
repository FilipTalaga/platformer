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
    const player = {
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        movingLeft: false,
        movingRight: false,
        startJump: false,
        jumping: false,
        xDistance: xVelocity / tps,
        jumpDistance: jumpForce / tps,
        yDistanceGain: gravity / (tps * tps),
        yDistance: 0,
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
        { x: 0, y: 0, width: 200, height: 30, color: "#3ff" }, // Launcher 1
        { x: 0, y: 0, width: 200, height: 30, color: "rgba(51, 255, 255, 0.1)", isEffect: true }, // Launcher 1 effect
        { x: 0, y: 0, width: 200, height: 30, color: "#3ff" }, // Launcher 2
        { x: 0, y: 0, width: 200, height: 30, color: "rgba(51, 255, 255, 0.1)", isEffect: true }, // Launcher 2 effect
    ];

    const updatePlayerPosition = () => {
        const solids = obstacles.filter(item => !item.isEffect);
        const effects = obstacles.filter(item => item.isEffect);

        /* Move left if left pressed */
        if (player.movingLeft) {
            const futurePlayer = { ...player, x: player.x - player.xDistance };

            let collisions = solids.filter(solid => willCollide(futurePlayer, solid));

            while (collisions.length > 0) {
                futurePlayer.x = collisions[0].x + collisions[0].width;
                collisions = solids.filter(solid => willCollide(futurePlayer, solid));
            }

            player.x = futurePlayer.x;
        }

        /* Move right if right pressed */
        if (player.movingRight) {
            const futurePlayer = { ...player, x: player.x + player.xDistance };

            let collisions = solids.filter(solid => willCollide(futurePlayer, solid));

            while (collisions.length > 0) {
                futurePlayer.x = collisions[0].x - player.width;
                collisions = solids.filter(solid => willCollide(futurePlayer, solid));
            }

            player.x = futurePlayer.x;
        }

        /* Move vertically, jump on up pressed, fall with gravity */
        if (player.startJump && !player.jumping) {
            const collideWithEffect = effects.some(effect => willCollide(player, effect));
            player.yDistance = collideWithEffect ? player.jumpDistance * 2 : player.jumpDistance;
        }
        const futurePlayer = { ...player, y: player.y + player.yDistance };
        player.yDistance += player.yDistanceGain;
        player.jumping = true;

        let collisions = solids.filter(solid => willCollide(futurePlayer, solid));

        while (collisions.length > 0) {
            if (player.yDistance >= 0) {
                futurePlayer.y = collisions[0].y - player.height;
                player.jumping = false;
            } else {
                futurePlayer.y = collisions[0].y + collisions[0].height;
            }

            player.yDistance = 0;
            collisions = solids.filter(solid => willCollide(futurePlayer, solid));
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