import WebWorker from '../workers/webWorker';

function engineWorker() {
    let updateHandler = null;

    const postUpdate = () => postMessage('running');

    // eslint-disable-next-line no-restricted-globals
    self.onmessage = e => {
        if (!e) return;

        const message = {
            command: e.data.split('-')[0],
            interval: e.data.split('-')[1],
        };

        if (message.command === 'start') {
            updateHandler = setInterval(postUpdate, message.interval);
        }

        if (message.command === 'stop') {
            clearInterval(updateHandler);
        }
    }
}

function makeEngine(render, update, interval) {
    let renderRef = null;
    const webWorker = new WebWorker(engineWorker);
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