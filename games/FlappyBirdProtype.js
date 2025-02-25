/*Flappy Bird Game
@author: Andrew Chen 
@title: Flappy Bird protype
*/

const player = "p";
const wall = "w";
const background = "b";

setLegend(
  [ player, bitmap`
0000000000000000
00............00
00...222222...00
00..2......2..00
00..2.2..2.2..00
00..2......2..00
00..2......2..00
00...222222...00
00.....2......00
00....2222....00
00.....2......00
00.....2......00
00....2.2.....00
00...2...2....00
00..2.....2...00
0000000000000000`],
  [ wall, bitmap`
2222222222222222
2HHHH25555255552
2HHHH25555255552
2HHHH25555255552
2HHHH25555255552
2HHHH25555222222
2HHHH25555255552
2222225555255552
2333325555255552
2333325555255552
2333325555255552
2333322222255552
2333324444255552
2333324444255552
2333324444255552
2222222222222222`],
  [ background, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ]
);

setMap( map`
.......w
.......w
.......w
.p......
.......w
.......w
.......w
.......w` );
setBackground(background);

var opening = 3;
var speed = 250;
var score = 0;
var isGameOver = false;

setPushables({
  [ player ]: [],
});

onInput("s", () => {
  if (!isGameOver) {
    getFirst(player).y += 1
  }
});

onInput("w", () => {
  if (!isGameOver) {
    getFirst(player).y -= 1
  }
});

function genWall() {
  opening = Math.floor(Math.random() * 8);
  for (let y=0; y < 8; y++) {
    if (y != opening) {
      addSprite(7, y, wall);
    }
  }

  score++;
}

function gameLoop() {
  addText(`Score: ${score}`, {x: 9, y: 14,color: color`3`})
    
  getAll(wall).forEach((w) => {
    if (w.x == 0) {
      w.remove();
    } else {
      w.x -= 1;
    };
  });

  if (getAll(wall).length == 0) {
    genWall();
  }

  if (getFirst(wall).x == getFirst(player).x && getFirst(player).y != opening) {
      lost();
  } 

  speed -= (250-speed);
  if (!isGameOver) {
    setTimeout(gameLoop, speed);
  }
}

function lost() {
  isGameOver = true;
  console.log("You lost");
  setMap(map`
........
........
........
........
........
........
........
........`);
  clearText();
  addText("Game over!", {x: 5, y: 7, color: color`7`})
  addText(`Score: ${score}`, {x: 5, y: 8, color: color`1`})
}

gameLoop();
