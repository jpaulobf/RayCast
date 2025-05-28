import { setupInput } from './input.js';
import { movePlayer } from './player.js';
import { castRays } from './raycaster.js';
import { drawMinimap } from './minimap.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

setupInput();

function gameLoop() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  movePlayer();
  castRays(ctx, canvas, WIDTH, HEIGHT);
  drawMinimap(ctx);

  requestAnimationFrame(gameLoop);
}

gameLoop();
