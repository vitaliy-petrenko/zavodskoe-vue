import interpolate from 'color-interpolate';
import rgbHex from 'rgb-hex';

const
  colorMap = interpolate(['green', 'yellow', 'orange', 'red', 'darkred']);

export const getColorByDistance = (distance, maxDistance) => `#${rgbHex(colorMap(distance / maxDistance))}`;
