import { CanvasTexture, Math } from "three";

export default function loadTexture(c) {
  const tl = new CanvasTexture(c);
  return new Promise(resolve => {
    tl.load(c, data => {

      data.needsUpdate = true;
      resolve(data);
    });
  });
}
