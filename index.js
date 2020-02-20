// canvas is used to draw graphics
const canvas = document.getElementById('canvas');
// set context
const ctx = canvas.getContext('2d');

// set position in canvas
const boxSize = 20;
const middlePointX = Math.floor(canvas.width / 2) - Math.floor(boxSize / 2);
const middlePointY = Math.floor(canvas.height / 2) - Math.floor(boxSize / 2);
const position = { x: middlePointX, y: middlePointY };

// movement direction
let direction = 39; // default direction (right)

// identifier to cancel the animation
let requestId;

function draw() {
  console.log(position);
  // clear the pixels in a given rectangle
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // set the rectangle color
  ctx.fillStyle = 'black';
  // moves the rectangle to a given position
  // 1, 0, 0, 1 =>
  // 1: Keeps the current Horizontal scaling (no scaling)
  // 0: No Vertical skewing
  // 0: No Horizontal skewing
  // 1: Keeps the current Vertical scaling (no scaling)
  ctx.setTransform(1, 0, 0, 1, position.x, position.y);
  // draws a rectangle that is filled according to the current fillStyle
  ctx.fillRect(0, 0, boxSize, boxSize);

  // set the next position according the direction
  if (direction === 37) position.x--;
  else if (direction === 38) position.y--;
  else if (direction === 39) position.x++;
  else if (direction === 40) position.y++;

  // updates an animation before the next repaint
  requestId = window.requestAnimationFrame(draw);
}

draw();

// window event to move the snake inside the board (canvas) using arrow keys
window.onkeydown = function(event) {
  const keyCode = event.keyCode; // key pressed code

  // key codes
  // up:38 right:39 down:40 left:37
  if (keyCode === 38) {
    direction = 38;
  } else if (keyCode === 39) {
    direction = 39;
  } else if (keyCode === 40) {
    direction = 40;
  } else if (keyCode === 37) {
    direction = 37;
  } else if (keyCode === 13) {
    draw();
  } else if (keyCode === 27) {
    cancelAnimationFrame(requestId);
  }
};
