import worker from '../webWorker';
import WebWorker from '../workerSetup';

function makeEngine(render, update, interval) {
    let renderRef = null;
    const webWorker = new WebWorker(worker);
    webWorker.onmessage = update;

    const tick = () => {
        render();
        renderRef = requestAnimationFrame(tick);
    }

    return {
        start: () => {
            webWorker.postMessage(`start-${interval}`);
            requestAnimationFrame(tick);
        },
        stop: () => {
            cancelAnimationFrame(renderRef);
            webWorker.postMessage('stop');
        },
    };
}

export default makeEngine;