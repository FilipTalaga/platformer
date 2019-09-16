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
        width: 200,
        height: 20,
    };

    return {
        player,
        obstacle
    }
}

export default makeGame;