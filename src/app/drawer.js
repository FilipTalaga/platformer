function makeDrawer(canvasRef) {
    const context = canvasRef.getContext('2d');

    const renderBackground = () => {
        context.fillStyle = "#333";
        context.fillRect(0, 0, canvasRef.width, canvasRef.height);
    }

    const renderPlayer = (x, y, width, height) => {
        context.fillStyle = "#999";
        context.fillRect(x, y, width, height);
    }

    const renderObstacle = (x, y, width, height) => {
        context.fillStyle = "#555";
        context.fillRect(x, y, width, height);
    }

    return {
        renderPlayer,
        renderBackground,
        renderObstacle
    }
}

export default makeDrawer;