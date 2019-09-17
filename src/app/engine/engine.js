import makeWebWorker from '../../workers/webWorker';
import commands from './commands';
import engineWorker from './worker';

function makeEngine(render, update, interval) {
    let renderRef = null;
    const webWorker = makeWebWorker(engineWorker, commands);

    /* Debug data for the FPS (frame per sec) and TPS (tick per sec) counters */
    const debug = {
        handler: null,
        fps: 0,
        tps: 0,
    };

    /* --- DEBUG --- DEBUG --- DEBUG --- */
    const logDebug = () => {
        console.clear();
        console.log(`FPS: ${debug.fps}\nTPS: ${debug.tps} (expected ${Math.floor(1000 / interval)})`);
        debug.fps = debug.tps = 0;
    }

    const updateTick = e => {
        if (e.data === commands.UPDATE) {
            update();
            debug.tps += 1; /* --- DEBUG --- DEBUG --- DEBUG --- */
        }
    }

    const renderTick = () => {
        render();
        debug.fps += 1; /* --- DEBUG --- DEBUG --- DEBUG --- */
        renderRef = requestAnimationFrame(renderTick);
    }

    webWorker.onmessage = updateTick;

    return {
        start: () => {
            webWorker.postMessage(`${commands.START}${commands.SEPARATOR}${interval}`);
            requestAnimationFrame(renderTick);
            debug.handler = setInterval(logDebug, 1000); /* --- DEBUG --- DEBUG --- DEBUG --- */
        },
        stop: () => {
            cancelAnimationFrame(renderRef);
            webWorker.postMessage(commands.STOP);
            clearInterval(debug.handler); /* --- DEBUG --- DEBUG --- DEBUG --- */
        },
    };
}

export default makeEngine;