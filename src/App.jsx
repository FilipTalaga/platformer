import React, { useRef, useEffect } from 'react';
import makeDrawer from './app/drawer';
import makeGame from './app/game';
import makeController from './app/controller';

function playGame(canvas) {
    const game = makeGame();
    const drawer = makeDrawer(canvas);

    const up = () => {
        game.player.y -= 20;
        render();
    }

    const down = () => {
        game.player.y += 20;
        render();
    }

    const left = () => {
        game.player.x -= 20;
        render();
    }

    const right = () => {
        game.player.x += 20;
        render();
    }

    const render = () => {
        drawer.renderBackground();
        drawer.renderPlayer(game.player.x, game.player.y);
    }

    makeController(up, down, left, right);
    render();
}

function App() {
    const canvasRef = useRef();

    useEffect(() => {
        playGame(canvasRef.current);
    });

    return <canvas ref={canvasRef} width="500" height="500" />;
}

export default App;
