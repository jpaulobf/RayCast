export const keys = {
  w: false,
  a: false,
  s: false,
  d: false
};

export function setupInput() {
  document.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.key)) keys[e.key] = true;
  });

  document.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.key)) keys[e.key] = false;
  });
}
