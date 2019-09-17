function makeDrawer(canvasRef) {
    const context = canvasRef.getContext('2d');

    const renderBackground = () => {
        context.fillStyle = "#eee";
        context.fillRect(0, 0, canvasRef.width, canvasRef.height);
    }

    const renderPlayer = (x, y, width, height) => {
        context.fillStyle = "#aaa";
        context.fillRect(x, y, width, height);
    }

    const renderObstacle = (x, y, width, height) => {
        context.fillStyle = "#222";
        context.fillRect(x, y, width, height);
    }

    return {
        renderBackground,
        renderPlayer,
        renderObstacle
    }
}

export default makeDrawer;