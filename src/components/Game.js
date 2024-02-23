// src/components/KaboomGame.js
import React, { useEffect } from 'react';
import kaboom from 'kaboom';

const Game = () => {
  
	const canvasRef = React.useRef(null)

  useEffect(() => {

    // Kaboom.js game code goes here

    const k = kaboom({
      background: [3, 3, 3],
			// if you don't want to import to the global namespace
			global: false,
			// if you don't want kaboom to create a canvas and insert under document.body
			canvas: canvasRef.current,
    })

    let speed = 480

    const sprite = k.add([
      k.pos(k.width()/2, k.height()/2),
      { vel: k.Vec2.fromAngle(27) },
      { color: k.WHITE}
    ]);

    sprite.onUpdate(() => {
      sprite.move(sprite.vel.scale(speed))
      if (sprite.pos.x - 125 < 0 || sprite.pos.x + 125 > k.width()) {
        sprite.vel.x = -sprite.vel.x
        sprite.color = k.rand(k.rgb(255, 255, 255))
        // k.debug.log("bounced x")
        sprite.move(sprite.vel.scale(speed))
      }
      if (sprite.pos.y - 50 < 0 || sprite.pos.y + 50 > k.height()) {
        sprite.vel.y = -sprite.vel.y
        sprite.color = k.rand(k.rgb(255, 255, 255))
        sprite.move(sprite.vel.scale(speed))
        // k.debug.log("bounced y")
      }
    })

    sprite.onDraw(() => {
      k.drawEllipse({
        radiusX: 125,
        radiusY: 50,
        pos: k.vec2(0, 0),
        color: k.rgb(50,50,50),
        outline: { color: k.BLACK, width: 4 },
      })
      k.drawText({
        text: "DVD",
        size: 84,
        font: "sans-serif",
        width: 250,
        pos: k.vec2(-84, -37),
        color: sprite.color,
      })
    })

  }, []);

	return <canvas ref={canvasRef} className="Game"></canvas>;
};

export default Game;