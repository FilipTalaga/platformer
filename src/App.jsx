import React, { useRef, useEffect } from 'react';
import makeDrawer from './app/drawer';
import makeGame from './app/game';
import makeController from './app/controller';
import makeEngine from './app/engine';

function playGame(canvas) {
    const startLeft = () => { game.player.movingLeft = true; };
    const stopLeft = () => { game.player.movingLeft = false; };
    const startRight = () => { game.player.movingRight = true; };
    const stopRight = () => { game.player.movingRight = false; };
    const startUp = () => { game.player.movingUp = true; };
    const stopUp = () => { game.player.movingUp = false; };
    const startDown = () => { game.player.movingDown = true; };
    const stopDown = () => { game.player.movingDown = false; };

    const render = () => {
        drawer.renderBackground();
        drawer.renderPlayer(game.player.x, game.player.y);
    }

    const update = () => {
        if (game.player.movingLeft) { game.player.x -= 4; }
        if (game.player.movingRight) { game.player.x += 4; }
        if (game.player.movingUp) { game.player.y -= 4; }
        if (game.player.movingDown) { game.player.y += 4; }
    }

    const game = makeGame();
    const drawer = makeDrawer(canvas);
    const engine = makeEngine(render, update, 8);

    engine.start();
    makeController(startLeft, stopLeft, startRight, stopRight, startUp, stopUp, startDown, stopDown);

    return engine.stop;
}

function App() {
    const canvasRef = useRef();

    useEffect(() => playGame(canvasRef.current));

    return <canvas ref={canvasRef} width="500" height="500" />;
}

export default App;
