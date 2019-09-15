import React, { useRef, useEffect } from 'react';
import makeDrawer from './app/drawer';
import makeGame from './app/game';
import makeController from './app/controller';
import makeEngine from './app/engine';

function playGame(canvas) {
    const up = () => { game.player.y -= 20; }
    const down = () => { game.player.y += 20; }
    const left = () => { game.player.x -= 20; }
    const right = () => { game.player.x += 20; }

    const render = () => {
        drawer.renderBackground();
        drawer.renderPlayer(game.player.x, game.player.y);
        console.log('render');
    }

    const update = () => {
        console.log('update');
    }

    const game = makeGame();
    const drawer = makeDrawer(canvas);
    const engine = makeEngine(render, update);

    engine.start();
    makeController(up, down, left, right);

    return engine.stop;
}

function App() {
    const canvasRef = useRef();

    useEffect(() => playGame(canvasRef.current));

    return <canvas ref={canvasRef} width="500" height="500" />;
}

export default App;
