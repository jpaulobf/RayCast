import { player } from './player.js';
import { map, TILE_SIZE } from './map.js';

const MINIMAP_SCALE = 0.2;
const MINIMAP_TILE = TILE_SIZE * MINIMAP_SCALE;
const FOV = Math.PI / 3;
const NUM_RAYS = 120;
const MAX_DEPTH = 20;

export function drawMinimap(ctx) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      ctx.fillStyle = map[y][x] === 1 ? "#888" : "#222";
      ctx.fillRect(x * MINIMAP_TILE, y * MINIMAP_TILE, MINIMAP_TILE, MINIMAP_TILE);
    }
  }

  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(player.x * MINIMAP_SCALE, player.y * MINIMAP_SCALE, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "yellow";
  ctx.beginPath();
  ctx.moveTo(player.x * MINIMAP_SCALE, player.y * MINIMAP_SCALE);
  ctx.lineTo(
    (player.x + Math.cos(player.angle) * 20) * MINIMAP_SCALE,
    (player.y + Math.sin(player.angle) * 20) * MINIMAP_SCALE
  );
  ctx.stroke();

  const startAngle = player.angle - FOV / 2;
  const angleStep = FOV / NUM_RAYS;

  ctx.strokeStyle = "rgba(255,255,0,0.3)";
  for (let ray = 0; ray < NUM_RAYS; ray += 5) {
    const rayAngle = startAngle + ray * angleStep;
    let distance = 0;
    let hit = false;

    const sin = Math.sin(rayAngle);
    const cos = Math.cos(rayAngle);

    while (!hit && distance < MAX_DEPTH * TILE_SIZE) {
      distance += 1;

      const targetX = player.x + cos * distance;
      const targetY = player.y + sin * distance;

      const mapX = Math.floor(targetX / TILE_SIZE);
      const mapY = Math.floor(targetY / TILE_SIZE);

      if (map[mapY] && map[mapY][mapX] === 1) {
        hit = true;
        ctx.beginPath();
        ctx.moveTo(player.x * MINIMAP_SCALE, player.y * MINIMAP_SCALE);
        ctx.lineTo(targetX * MINIMAP_SCALE, targetY * MINIMAP_SCALE);
        ctx.stroke();
      }
    }
  }
}
