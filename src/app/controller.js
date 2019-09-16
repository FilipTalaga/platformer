function makeController(resize, startLeft, stopLeft, startRight, stopRight, startUp, stopUp) {
    document.onkeydown = e => {
        e = e || window.event;

        if (e.keyCode === 38) { startUp(); }
        else if (e.keyCode === 37) { startLeft(); }
        else if (e.keyCode === 39) { startRight(); }
    }

    document.onkeyup = e => {
        e = e || window.event;

        if (e.keyCode === 38) { stopUp(); }
        else if (e.keyCode === 37) { stopLeft(); }
        else if (e.keyCode === 39) { stopRight(); }
    }

    window.onresize = resize;
}

export default makeController;