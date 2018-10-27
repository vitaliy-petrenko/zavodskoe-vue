import interpolate from 'color-interpolate';
import rgbHex from 'rgb-hex';

const
  colorMap = interpolate(['green', 'yellow', 'orange', 'red', 'darkred']);

export const getColorByDistance = (distance, maxDistance) => `#${rgbHex(colorMap(distance / maxDistance))}`;

export const ADMIN_COLORS = {
  'kindergarten': 'rgb(19,110,137)',
  'school': 'rgb(82,161,199)',
  'hospitals': 'rgb(109,43,43)',
  'cultural_institutions': 'rgb(71,192,168)',
  'parking': 'rgb(192,71,95)',
  'market': 'rgb(95,192,71)',
  'stop': 'rgb(71,95,192)'
};
