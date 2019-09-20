/* eslint-disable no-undef */

function engineWorker() {
    let updateHandler = null;

    const postUpdate = () => postMessage(commands.UPDATE);

    onmessage = e => {
        if (!e) return;

        const message = e.data.split(commands.SEPARATOR);
        const command = message[0];
        const interval = message[1];

        if (command === commands.START) {
            updateHandler = setInterval(postUpdate, interval);
        }

        if (command === commands.STOP) {
            clearInterval(updateHandler);
        }
    };
}

export default engineWorker;
