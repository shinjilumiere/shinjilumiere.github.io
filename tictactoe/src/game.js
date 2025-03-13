// import kaplay
kaplay({
  width: 800,
  height: 600,
  font: "sans-serif",
  background: [ 128, 128, 128 ]
})

// NOTE: build first before adding assets
// npm run build
loadSprite("grid", "/assets/grid.png");
loadSprite("x", "/assets/x.png");
loadSprite("o", "/assets/o.png");
loadSprite("diag1", "/assets/diag1.png");
loadSprite("diag2", "/assets/diag2.png");
loadSprite("vert", "/assets/vert.png");
loadSprite("hori", "/assets/hori.png");
loadFont("tiny5", "/assets/Tiny5-Regular.ttf", {
  outline: 4,
  filter: "nearest",
  
});

// TODO
// center the canvas
// add 
add([
  text("Tic Tac Toe", {
    size: 56,
    font: "tiny5",
  }),
  pos(center().sub(vec2(0, 240))),
  anchor("center"),
]);

var bottomText = add([
  text("Player     Turn", {
    size: 40,
    font: "tiny5",
  }),
  pos(center().add(vec2(0, 240))),
  anchor("center"),
]);

var gameState = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
var gameWin = false
var currentPlayer = 0
var winLines = [];
const scale = 3;
const offset = [400 - (48 * scale) - 96 , 300 - (48 * scale) - 96];

onDraw(() => {

  drawSprite({
    sprite: "grid",
    pos: vec2(offset[0] + 96, offset[1] + 96),
    scale: scale
    });

  for(var i = 0; i < 5; i++) {
    for(var j = 0; j < 5; j++) {
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
        drawSprite({
        sprite: sprite,
        pos: vec2(offset[0] + 32 * scale * j, offset[1] + 32 * scale * i),
        scale: scale
        });
      }
    }
  }

  winLines.forEach(x => {
    drawSprite({
      sprite: x.sprite,
      pos: vec2(x.pos[0], x.pos[1]),
      scale: x.scale
    });
  });

  // draw current player sprite
  if(!gameWin)
  {
    drawSprite({
      sprite: currentPlayer == 0 ? "x" : "o",
      pos: center().add(vec2(-10, 208)),
      scale: 2
    });
  }
});

onMousePress(() => { 

  if(gameWin) return;
  const pos = mousePos();

  const clickedArea = pos.sub(vec2(offset))
  const clickedCoords = [
    Math.min(Math.max(0, Math.floor(clickedArea.x / 96)), 4),
    Math.min(Math.max(0, Math.floor(clickedArea.y / 96)), 4)
  ];

  // alert(clickedCoords[0] + " "  + clickedCoords[1])

  if(currentPlayer == 0)
  {
    if (gameState[clickedCoords[0]][clickedCoords[1]] != 0 ) return;
    gameState[clickedCoords[0]][clickedCoords[1]] = 1;
  }
  else if(currentPlayer == 1)
  {
    if (gameState[clickedCoords[0]][clickedCoords[1]] != 0 ) return;
    gameState[clickedCoords[0]][clickedCoords[1]] = 2;
  }

  // check matches
  // horizontal
  var matchCount = 0;
  for(var i = 0; i < 5; i++)
  {
    var prevGameState = 0;
    matchCount = 0;
    for(var j = 0; j < 5; j++)
    {
      if(gameState[j][i] == prevGameState && gameState[j][i] != 0 ) 
      {
        matchCount++;
      }
      else matchCount = 0;
      prevGameState = gameState[j][i];
      if(matchCount >= 2)
      {
        // matched, add horizontal line
        winLines.push({
          sprite: "hori",
          pos: [offset[0] + 32 * scale * (j - 2), offset[1] + 32 * scale * i],
          scale: scale
        });
        gameWin = true;
      }
    }
  }

  // vertical
  var matchCount = 0;
  for(var j = 0; j < 5; j++)
  {
    var prevGameState = 0;
    matchCount = 0;
    for(var i = 0; i < 5; i++)
    {
      if(gameState[j][i] == prevGameState && gameState[j][i] != 0 ) 
      {
        matchCount++;
      }
      else matchCount = 0;
      prevGameState = gameState[j][i];
      if(matchCount >= 2)
      {
        // matched, add vertical line
        winLines.push({
          sprite: "vert",
          pos: [offset[0] + 32 * scale * j, offset[1] + 32 * scale * (i - 2)],
          scale: scale
        });
        gameWin = true;
      }
    }
  }

  // diagonal 1 (/)
  var validPlaces = 
  [
    [[2,0],[1,1],[0,2]],
    [[3,0],[2,1],[1,2],[0,3]],
    [[4,0],[3,1],[2,2],[1,3],[0,4]],
    [[4,1],[3,2],[2,3],[1,4]],
    [[4,2],[3,3],[2,4]]
  ]
  var matchCount = 0;
  validPlaces.forEach (a =>
  {
    var prevGameState = 0;
    matchCount = 0;
    a.forEach(b =>
    {
      if(gameState[b[1]][b[0]] == prevGameState && gameState[b[1]][b[0]] != 0 ) 
      {
        matchCount++;
      }
      else matchCount = 0;
      prevGameState = gameState[b[1]][b[0]];
      if(matchCount >= 2)
      {
        // matched, add horizontal line
        winLines.push({
          sprite: "diag1",
          pos: [offset[0] + 32 * scale * (b[1] - 2), offset[1] + 32 * scale * b[0]],
          scale: scale
        });
        gameWin = true;
      }
    });
  });

  // diagonal 2 (\)
  var validPlaces = 
  [
    [[2,0],[3,1],[4,2]],
    [[1,0],[2,1],[3,2],[4,3]],
    [[0,0],[1,1],[2,2],[3,3],[4,4]],
    [[0,1],[1,2],[2,3],[3,4]],
    [[0,2],[1,3],[2,4]]
  ]
  var matchCount = 0;
  validPlaces.forEach (a =>
  {
    var prevGameState = 0;
    matchCount = 0;
    a.forEach(b =>
    {
      if(gameState[b[1]][b[0]] == prevGameState && gameState[b[1]][b[0]] != 0 ) 
      {
        matchCount++;
      }
      else matchCount = 0;
      prevGameState = gameState[b[1]][b[0]];
      if(matchCount >= 2)
      {
        // matched, add horizontal line
        winLines.push({
          sprite: "diag2",
          pos: [offset[0] + 32 * scale * (b[1] - 2), offset[1] + 32 * scale * (b[0] - 2)],
          scale: scale
        });
        gameWin = true;
      }
    });
  });

  if(gameWin)
  {
    bottomText.text = "Winner!"
  }
  // next player
  currentPlayer = (currentPlayer + 1) % 2;
});