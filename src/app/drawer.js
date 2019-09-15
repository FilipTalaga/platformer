function makeDrawer(canvasRef) {
    const context = canvasRef.getContext('2d');

    const renderBackground = () => {
        context.fillStyle = "#333";
        context.fillRect(0, 0, canvasRef.width, canvasRef.height);
    }

    const renderPlayer = (x, y) => {
        context.fillStyle = "#555";
        context.fillRect(x, y, 50, 50);
    }

    return {
        renderPlayer,
        renderBackground
    }
}

export default makeDrawer;