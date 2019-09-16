import React, { useRef, useEffect } from 'react';
import makeDrawer from './app/drawer';
import makeGame from './app/game';
import makeController from './app/controller';
import makeEngine from './app/engine/engine';

const interval = 8;

function playGame(canvas) {
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
        drawer.clear();
        drawer.renderBackground();
        drawer.renderPlayer(game.player.x, game.player.y, game.player.width, game.player.height);
        game.obstacles.forEach(obstacle => {
            drawer.renderObstacle(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }

    const update = () => {
        const distance = interval / 2;
        game.updatePlayerPosition(distance);
    }

    // ------------------------------------------------------------------------------------------- //
    //     Elements for handling game logic, user input, canvas drawing and render/update loop     //
    // ------------------------------------------------------------------------------------------- //

    const game = makeGame();
    const drawer = makeDrawer(canvas);
    const engine = makeEngine(render, update, interval);
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

    useEffect(() => playGame(canvasRef.current));

    return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
}

export default App;
