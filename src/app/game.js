/* World parameters in SI units */
const world = {
    xVelocityMax: 500,   // horizontal velocity [px/s]
    jumpForce: -1200, // vertical negative velocity [px/s]
    gravity: 3800,    // vertical acceleration [px/s^2]
};

function collides(player, obstacle) {
    const vertically = player.y + player.height > obstacle.y && player.y < obstacle.y + obstacle.height;
    const horizontally = player.x + player.width > obstacle.x && player.x < obstacle.x + obstacle.width;
    return vertically && horizontally;
}

const checkCollisionAndUpdate = (obstacles, futurePlayer, update) => {
    let collisions = obstacles.filter(obstacle => collides(futurePlayer, obstacle));
    while (collisions.length > 0) {
        update(collisions[0]);
        collisions = obstacles.filter(obstacle => collides(futurePlayer, obstacle));
    }
};

function makeGame(tps) {
    /* World parameters per tick */
    const xVelocityMax = world.xVelocityMax / tps;
    const jumpForce = world.jumpForce / tps;
    const gravity = world.gravity / (tps * tps);

    const player = {
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        xVelocity: 0,
        yVelocity: 0,
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
        let futurePlayer = { ...player };

        /* Horizontal velocity update */
        player.xVelocity = (state.movingLeft && -xVelocityMax) + (state.movingRight && xVelocityMax);

        /* Horizontal position update */
        futurePlayer.x += player.xVelocity;
        checkCollisionAndUpdate(obstacles, futurePlayer, entity => {
            futurePlayer.x = player.xVelocity >= 0 ? entity.x - futurePlayer.width : entity.x + entity.width;
        });

        /* Vertical velocity update */
        player.yVelocity += gravity;
        if (state.startJump && !state.jumping) {
            player.yVelocity = effects.some(effect => collides(futurePlayer, effect)) ? jumpForce * 2 : jumpForce;
        }
        state.jumping = true;

        /* Vertical position update */
        futurePlayer.y += player.yVelocity;
        checkCollisionAndUpdate(obstacles, futurePlayer, entity => {
            if (player.yVelocity >= 0) { state.jumping = false; }
            futurePlayer.y = player.yVelocity >= 0 ? entity.y - futurePlayer.height : entity.y + entity.height;
            player.yVelocity = 0;
        });

        player.x = futurePlayer.x;
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
