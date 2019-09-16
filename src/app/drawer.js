function makeDrawer(canvasRef) {
    const context = canvasRef.getContext('2d');

    const clear = () => {
        context.clearRect(0, 0, canvasRef.width, canvasRef.height);
    }

    const renderBackground = () => {
        context.fillStyle = "#111";
        context.fillRect(0, 0, canvasRef.width, canvasRef.height);
    }

    const renderPlayer = (x, y, width, height) => {
        context.fillStyle = "#aaa";
        context.fillRect(x, y, width, height);
    }

    const renderObstacle = (x, y, width, height) => {
        context.fillStyle = "#333";
        context.fillRect(x, y, width, height);
    }

    return {
        clear,
        renderBackground,
        renderPlayer,
        renderObstacle
    }
}

export default makeDrawer;