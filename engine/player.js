import { keys } from './input.js';
import { map, TILE_SIZE } from './map.js';

export const player = {
  x: TILE_SIZE * 1.5,
  y: TILE_SIZE * 1.5,
  angle: 0,
  speed: 2
};

export function movePlayer() {
  const moveStep = keys.w ? player.speed : (keys.s ? -player.speed : 0);
  const rotStep = keys.a ? -0.05 : (keys.d ? 0.05 : 0);

  player.angle += rotStep;

  const newX = player.x + Math.cos(player.angle) * moveStep;
  const newY = player.y + Math.sin(player.angle) * moveStep;

  const mapX = Math.floor(newX / TILE_SIZE);
  const mapY = Math.floor(newY / TILE_SIZE);

  if (map[mapY][mapX] === 0) {
    player.x = newX;
    player.y = newY;
  }
}
