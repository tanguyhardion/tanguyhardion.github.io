import { FastAverageColor } from 'fast-average-color';

export default async function getImageColor(
  imageElementId: string
): Promise<string | undefined> {
  const imageElement = document.getElementById(
    imageElementId
  ) as HTMLImageElement;

  if (imageElement) {
    const fac = new FastAverageColor();
    const result = await fac.getColorAsync(imageElement);
    return result.rgba;
  } else {
    return undefined;
  }
}
