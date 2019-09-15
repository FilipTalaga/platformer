function makeEngine(render, update, interval = 1000 / 30) {
    let renderRef = null;
    let lastTimestamp = 0;

    const tick = timestamp => {
        if (timestamp - lastTimestamp >= interval) {
            update();
            lastTimestamp = timestamp;
        }

        render();
        renderRef = requestAnimationFrame(tick);
    }

    return {
        start: () => requestAnimationFrame(tick),
        stop: () => cancelAnimationFrame(renderRef),
    };
}

export default makeEngine;