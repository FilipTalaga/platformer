function makeController(handleUp, handleDown, handleLeft, handleRight) {
    document.onkeydown = e => {
        e = e || window.event;

        if (e.keyCode === 38) {
            handleUp();
        }
        else if (e.keyCode === 40) {
            handleDown();
        }
        else if (e.keyCode === 37) {
            handleLeft();
        }
        else if (e.keyCode === 39) {
            handleRight();
        }
    }
}

export default makeController;