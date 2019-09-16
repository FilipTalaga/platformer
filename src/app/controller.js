function makeController(startLeft, stopLeft, startRight, stopRight, startUp, stopUp, startDown, stopDown) {
    document.onkeydown = e => {
        e = e || window.event;

        if (e.keyCode === 38) { startUp(); }
        else if (e.keyCode === 40) { startDown(); }
        else if (e.keyCode === 37) { startLeft(); }
        else if (e.keyCode === 39) { startRight(); }
    }

    document.onkeyup = e => {
        e = e || window.event;

        if (e.keyCode === 38) { stopUp(); }
        else if (e.keyCode === 40) { stopDown(); }
        else if (e.keyCode === 37) { stopLeft(); }
        else if (e.keyCode === 39) { stopRight(); }
    }
}

export default makeController;