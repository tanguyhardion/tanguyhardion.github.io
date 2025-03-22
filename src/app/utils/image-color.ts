import { prominent } from 'color.js';

export default async function getImageColor(imageElementId: string): Promise<string | undefined> {
  const imageElement = document.getElementById(imageElementId) as HTMLImageElement;

  if (imageElement) {
    const colors = await prominent(imageElement, {
      amount: 10,
      sample: 500
    });

    let bestColor: number[] | undefined;

    for (const color of colors) {
      if (Array.isArray(color) && !isTooSimilar(color)) {
        bestColor = color;
        break;
      }
    }

    if (bestColor) {
      return `rgb(${bestColor[0]}, ${bestColor[1]}, ${bestColor[2]})`;
    }
  }

  return undefined;
}

function isTooSimilar(color: number[], threshold: number = 10): boolean {
  return (
    Math.abs(color[0] - color[1]) <= threshold &&
    Math.abs(color[1] - color[2]) <= threshold &&
    Math.abs(color[0] - color[2]) <= threshold
  );
}
