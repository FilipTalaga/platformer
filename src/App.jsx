import React, { useRef, useEffect } from 'react';
import makeDrawer from './app/drawer';

function App() {
    const canvasRef = useRef();

    useEffect(() => {
        const drawer = makeDrawer(canvasRef.current);

        drawer.renderBackground();
        drawer.renderPlayer(100, 100);
    });

    return <canvas ref={canvasRef} width="500" height="500" />;
}

export default App;
