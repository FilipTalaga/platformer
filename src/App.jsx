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
    const startUp = () => { game.player.movingUp = true; };
    const stopUp = () => { game.player.movingUp = false; };
    const startDown = () => { game.player.movingDown = true; };
    const stopDown = () => { game.player.movingDown = false; };
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }

    // ------------------------------------------------------------------------------------------- //
    //     Render and update functions that will be executed periodically by engine                //
    // ------------------------------------------------------------------------------------------- //

    const render = () => {
        drawer.renderBackground();
        drawer.renderObstacle(game.obstacle.x, game.obstacle.y, game.obstacle.width, game.obstacle.height);
        drawer.renderPlayer(game.player.x, game.player.y, game.player.width, game.player.height);
    }

    const isCollision = (player, obstacle) => {
        const vertical = player.y + player.height > obstacle.y && player.y < obstacle.y + obstacle.height;
        const horizontal = player.x + player.width > obstacle.x && player.x < obstacle.x + obstacle.width;

        return vertical && horizontal;
    }

    const update = () => {
        if (game.player.movingLeft) {
            const futurePlayer = { ...game.player };
            futurePlayer.x -= interval / 2;

            if (isCollision(futurePlayer, game.obstacle)) {
                game.player.x = game.obstacle.x + game.obstacle.width;
            } else {
                game.player.x = futurePlayer.x;
            }
        }

        if (game.player.movingRight) {
            const futurePlayer = { ...game.player };
            futurePlayer.x += interval / 2;

            if (isCollision(futurePlayer, game.obstacle)) {
                game.player.x = game.obstacle.x - game.player.width;
            } else {
                game.player.x = futurePlayer.x;
            }
        }

        if (game.player.movingUp) {
            const futurePlayer = { ...game.player };
            futurePlayer.y -= interval / 2;

            if (isCollision(futurePlayer, game.obstacle)) {
                game.player.y = game.obstacle.y + game.obstacle.height;
            } else {
                game.player.y = futurePlayer.y;
            }
        }

        if (game.player.movingDown) {
            const futurePlayer = { ...game.player };
            futurePlayer.y += interval / 2;

            if (isCollision(futurePlayer, game.obstacle)) {
                game.player.y = game.obstacle.y - game.player.height;
            } else {
                game.player.y = futurePlayer.y;
            }
        }
    }

    // ------------------------------------------------------------------------------------------- //
    //     Elements for handling game logic, user input, canvas drawing and render/update loop     //
    // ------------------------------------------------------------------------------------------- //

    const game = makeGame();
    const drawer = makeDrawer(canvas);
    const engine = makeEngine(render, update, interval);
    makeController(resize, startLeft, stopLeft, startRight, stopRight, startUp, stopUp, startDown, stopDown);

    // ------------------------------------------------------------------------------------------- //
    //     Arrange entities with given coordinates                                                 //
    // ------------------------------------------------------------------------------------------- //

    game.obstacle.x = Math.floor(canvas.width / 2 - game.obstacle.width / 2);
    game.obstacle.y = Math.floor(canvas.height * 0.7);

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
