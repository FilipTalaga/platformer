import makeWebWorker from '../../workers/webWorker';
import commands from './commands';
import engineWorker from './worker';

function makeEngine(render, update, interval) {
    let renderRef = null;
    const webWorker = makeWebWorker(engineWorker, commands);

    const updateTick = e => {
        if (e.data === commands.UPDATE) {
            update();
        }
    }

    const renderTick = () => {
        render();
        renderRef = requestAnimationFrame(renderTick);
    }

    webWorker.onmessage = updateTick;

    return {
        start: () => {
            webWorker.postMessage(`${commands.START}${commands.SEPARATOR}${interval}`);
            requestAnimationFrame(renderTick);
        },
        stop: () => {
            cancelAnimationFrame(renderRef);
            webWorker.postMessage(commands.STOP);
        },
    };
}

export default makeEngine;