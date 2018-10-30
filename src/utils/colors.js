import interpolate from 'color-interpolate';
import rgbHex from 'rgb-hex';

const
  colorMap = interpolate(['green', 'yellow', 'orange', 'red', 'darkred']);

export const getColorByDistance = (distance, minDistance, maxDistance) => {
  const
    value = distance - minDistance,
    maxValue = (maxDistance - minDistance) || value;

  return `#${rgbHex(colorMap(value / maxValue))}`;
};
