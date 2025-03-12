// src/components/KaboomGame.js
import React, { useEffect, useRef } from 'react';
import kaplay from 'kaplay';

const Game = () => {
  const canvasRef = React.useRef(0)

  useEffect(() => {
    if (canvasRef.current) {
      var k = kaplay();

      // NOTE: build first before adding assets
      // npm run build
      k.loadSprite("grid", "sprites/grid.png");
      k.loadSprite("x", "sprites/x.png");
      k.loadSprite("o", "sprites/o.png");

      // TODO
      // center the canvas
      // add 

      const gameState = [[1,1,0],[0,1,2],[0,2,1]]

      k.onDraw(() => {

        k.drawSprite({
          sprite: "grid",
          pos: k.vec2(0, 0),
          scale: 4
          });

        for(var i = 0; i < 3; i++) {
          for(var j = 0; j < 3; j++) {
            var sprite = "n"
            switch(gameState[j][i]) {
              case 1:
                sprite = "x";
                break;
              case 2:
                sprite = "o";
                break;
            }

            if(sprite != "n") {
              k.drawSprite({
              sprite: sprite,
              pos: k.vec2(128 * i, 128 * j),
              scale: 4
              });
            }
          }
        }
      });

      /*
      const x = k.add([
        k.sprite("x"),
        k.scale(1),
        k.pos(0,0),
      ])*/
    }
  });

  return <canvas ref={canvasRef} className="Game" />
}

export default Game;