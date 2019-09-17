const drawRect = (context, x, y, width, height) =>
    context.fillRect(Math.floor(x), Math.floor(y), Math.floor(width), Math.floor(height));

function makeDrawer(canvasRef) {
    const context = canvasRef.getContext('2d');

    const renderBackground = () => {
        context.fillStyle = "#eee";
        drawRect(context, 0, 0, canvasRef.width, canvasRef.height);
    }

    const renderPlayer = (x, y, width, height) => {
        context.fillStyle = "#aaa";
        drawRect(context, x, y, width, height);
    }

    const renderObstacle = (x, y, width, height) => {
        context.fillStyle = "#222";
        drawRect(context, x, y, width, height);
    }

    return {
        renderBackground,
        renderPlayer,
        renderObstacle
    }
}

export default makeDrawer;
