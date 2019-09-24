function makeController(resize, updateLeft, updateRight, updateJump) {
    document.onkeydown = e => {
        e = e || window.event;

        if (e.keyCode === 38) { updateJump(true); }
        else if (e.keyCode === 37) { updateLeft(true); }
        else if (e.keyCode === 39) { updateRight(true); }
    };

    document.onkeyup = e => {
        e = e || window.event;

        if (e.keyCode === 38) { updateJump(false); }
        else if (e.keyCode === 37) { updateLeft(false); }
        else if (e.keyCode === 39) { updateRight(false); }
    };

    window.onresize = resize;
}

export default makeController;
