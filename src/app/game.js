function makeGame() {
    const player = {
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        movingLeft: false,
        movingRight: false,
        movingUp: false,
        movingDown: false,
    };

    const obstacle = {
        x: 0,
        y: 0,
        width: 500,
        height: 30,
    };

    return {
        player,
        obstacle
    }
}

export default makeGame;