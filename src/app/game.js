function makeGame() {
    const player = {
        x: 0,
        y: 0,
        movingLeft: false,
        movingRight: false,
        movingUp: false,
        movingDown: false,
    };

    return {
        player
    }
}

export default makeGame;