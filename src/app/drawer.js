const drawRect = (context, x, y, width, height) =>
    context.fillRect(Math.floor(x), Math.floor(y), Math.floor(width), Math.floor(height));

function makeDrawer(canvasRef) {
    const context = canvasRef.getContext('2d');

    const renderBackground = () => {
        context.fillStyle = '#eee';
        drawRect(context, 0, 0, canvasRef.width, canvasRef.height);
    };

    const renderPlayer = (x, y, width, height) => {
        context.fillStyle = '#aaa';
        drawRect(context, x, y, width, height);
    };

    const renderObstacle = (x, y, width, height, color = '#222') => {
        context.fillStyle = color;
        drawRect(context, x, y, width, height);
    };

    const renderGradient = (x, y, width, height, color) => {
        // Create gradient
        const gradient = context.createLinearGradient(0, y, 0, y + height);

        // Add colors
        gradient.addColorStop(0, '#fff0');
        gradient.addColorStop(1, color);

        // Fill with gradient
        context.fillStyle = gradient;
        drawRect(context, x, y, width, height);
    };

    return {
        renderBackground,
        renderPlayer,
        renderObstacle,
        renderGradient,
    };
}

export default makeDrawer;
