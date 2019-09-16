/* eslint-disable no-restricted-globals */

const worker = () => {
    let updateHandler = null;

    const postUpdate = () => {
        postMessage('running');
    }

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
};

export default worker;