import React, { useRef, useEffect, useState } from 'react';
import makeDrawer from './app/drawer';
import makeGame from './app/game';
import makeController from './app/controller';
import makeEngine from './app/engine/engine';
import DebugLabel from './DebugLabel';

const interval = 8;

function playGame(canvas, gameLog) {
    // ------------------------------------------------------------------------------------------- //
    //     User input functions for controller                                                     //
    // ------------------------------------------------------------------------------------------- //

    const startLeft = () => { game.player.movingLeft = true; };
    const stopLeft = () => { game.player.movingLeft = false; };
    const startRight = () => { game.player.movingRight = true; };
    const stopRight = () => { game.player.movingRight = false; };
    const startJump = () => { game.player.startJump = true; };
    const stopJump = () => { game.player.startJump = false; };
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }

    // ------------------------------------------------------------------------------------------- //
    //     Render and update functions that will be executed periodically by engine                //
    // ------------------------------------------------------------------------------------------- //

    const render = () => {
        drawer.renderBackground();
        drawer.renderPlayer(game.player.x, game.player.y, game.player.width, game.player.height);
        game.obstacles.forEach(solid => {
            drawer.renderObstacle(solid.x, solid.y, solid.width, solid.height, solid.color);
        });
        game.effects.forEach(effect => {
            drawer.renderGradient(effect.x, effect.y, effect.width, effect.height, effect.color);
        });
    }

    const update = () => {
        const distance = interval / 2;
        game.updatePlayerPosition(distance);
    }

    // ------------------------------------------------------------------------------------------- //
    //     Elements for handling game logic, user input, canvas drawing and render/update loop     //
    // ------------------------------------------------------------------------------------------- //

    const game = makeGame(1000 / interval);
    const drawer = makeDrawer(canvas);
    const engine = makeEngine(render, update, interval, gameLog);
    makeController(resize, startLeft, stopLeft, startRight, stopRight, startJump, stopJump);

    // ------------------------------------------------------------------------------------------- //
    //     Arrange entities with given coordinates                                                 //
    // ------------------------------------------------------------------------------------------- //

    // Floor
    game.obstacles[0].x = Math.floor(canvas.width / 2 - game.obstacles[0].width / 2);
    game.obstacles[0].y = Math.floor(canvas.height * 0.7);

    // Wall
    game.obstacles[1].x = game.obstacles[0].x + game.obstacles[0].width - game.obstacles[1].width;
    game.obstacles[1].y = game.obstacles[0].y - game.obstacles[1].height;

    // Step 1
    game.obstacles[2].x = game.obstacles[0].x + 100;
    game.obstacles[2].y = game.obstacles[1].y + 100;

    // Step 2
    game.obstacles[3].x = game.obstacles[0].x + 200;
    game.obstacles[3].y = game.obstacles[1].y + 250;

    // Step 3
    game.obstacles[4].x = game.obstacles[0].x + 300;
    game.obstacles[4].y = game.obstacles[1].y + 400;

    // Step 4
    game.obstacles[5].x = game.obstacles[0].x - 200;
    game.obstacles[5].y = game.obstacles[1].y + 630;

    // Bottom
    game.obstacles[6].x = 0;
    game.obstacles[6].y = canvas.height - game.obstacles[5].height;
    game.obstacles[6].width = canvas.width;

    // Left
    game.obstacles[7].x = 0;
    game.obstacles[7].y = 0;
    game.obstacles[7].height = canvas.height;

    // Right
    game.obstacles[8].x = canvas.width - game.obstacles[7].width;
    game.obstacles[8].y = 0;
    game.obstacles[8].height = canvas.height;

    // Launcher 1 effect
    game.effects[0].x = 150;
    game.effects[0].y = canvas.height - game.obstacles[6].height - game.effects[0].height;

    // Launcher 2 effect
    game.effects[1].x = canvas.width - game.effects[1].width - 150;
    game.effects[1].y = canvas.height - game.obstacles[6].height - game.effects[1].height;

    // Player
    game.player.x = Math.floor(canvas.width / 2 - game.player.width / 2);
    game.player.y = Math.floor(canvas.height * 0.3);

    // ------------------------------------------------------------------------------------------- //
    //     Start the game and return stop function for cleanup                                     //
    // ------------------------------------------------------------------------------------------- //

    engine.start();
    return engine.stop;
}

function App() {
    const canvasRef = useRef();
    const [debugLabel, setDebugLabel] = useState();

    useEffect(() => playGame(canvasRef.current, setDebugLabel), []);

    return (
        <>
            <DebugLabel data={debugLabel} />
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
        </>
    );
}

export default App;
