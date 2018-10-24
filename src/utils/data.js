import srcData from '../data/map.json';

export const estateBuildings = srcData.estateBuildings.map((item, i) => ({
  id: i,
  ...item
}));

export const ADMIN_TYPES = {
  1: 'kindergarten',
  2: 'school',
  3: 'hospitals',
  4: 'cultural_institutions',
  5: 'parking',
  6: 'market',
  7: 'stop'
};

export const COLORS = {
  // 'kindergarten': 'rgb(118,137,0)',
  // 'school': 'rgb(87,168,0)',
  // 'hospitals': 'rgb(80,175,0)',
  // 'cultural_institutions': 'rgb(132,123,0)',
  // 'parking': 'rgb(150,105,0)',
  // 'market': 'rgb(29,226,0)',
  // 'stop': 'rgb(81,174,0)',

  'kindergarten': 'rgb(19,110,137)',
  'school': 'rgb(82,161,199)',
  'hospitals': 'rgb(109,43,43)',
  'cultural_institutions': 'rgb(71,192,168)',
  'parking': 'rgb(192,71,95)',
  'market': 'rgb(95,192,71)',
  'stop': 'rgb(71,95,192)'
};

export const META_FIELDS = ['builder'];

export const getColorByType = type => {
  return type && ADMIN_TYPES[type] && COLORS[ADMIN_TYPES[type]];
};
