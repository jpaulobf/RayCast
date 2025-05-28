import { player } from './player.js';
import { map, TILE_SIZE } from './map.js';

const FOV = Math.PI / 3;
const NUM_RAYS = 120;
const MAX_DEPTH = 20;

export function castRays(ctx, canvas, canvasWidth, canvasHeight) {
  const startAngle = player.angle - FOV / 2;
  const angleStep = FOV / NUM_RAYS;

  for (let ray = 0; ray < NUM_RAYS; ray++) {
    const rayAngle = startAngle + ray * angleStep;
    let distance = 0;
    let hit = false;

    let sin = Math.sin(rayAngle);
    let cos = Math.cos(rayAngle);

    while (!hit && distance < MAX_DEPTH * TILE_SIZE) {
      distance += 1;

      const targetX = player.x + cos * distance;
      const targetY = player.y + sin * distance;

      const mapX = Math.floor(targetX / TILE_SIZE);
      const mapY = Math.floor(targetY / TILE_SIZE);

      if (map[mapY] && map[mapY][mapX] === 1) {
        hit = true;

        const correctedDist = distance * Math.cos(rayAngle - player.angle);
        const safeDist = Math.max(correctedDist, 1); // evita zero

        const wallHeight = (TILE_SIZE * 277) / safeDist;

        const maxLightDistance = MAX_DEPTH * TILE_SIZE;
        let lightIntensity = 1 - (safeDist / maxLightDistance);
        lightIntensity = Math.max(0, Math.min(1, lightIntensity));

        const shade = Math.floor(255 * lightIntensity);
        ctx.fillStyle = `rgb(${255 - correctedDist * 0.5},0,0)`;


        ctx.fillRect(
          ray * (canvas.width / NUM_RAYS),
          (canvas.height / 2) - wallHeight / 2,
          (canvas.width / NUM_RAYS),
          wallHeight
        );
      }
    }
  }
}
