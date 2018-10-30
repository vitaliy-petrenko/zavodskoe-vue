import srcData from '../data/map.json';
import rgbHex from 'rgb-hex';

let
  maxDistances = {},
  minDistances = {};

export const estateBuildings = (() => {
  const paths = [];

  const _buildings = srcData.estateBuildings.map((building, i) => {
    if (Array.isArray(building.paths)) {
      paths.push(...building.paths);

      building.distances = {};

      building.paths.forEach(({ type, distance }) => {
        building.distances[type] = distance;

        if (minDistances[type]) {
          minDistances[type] = Math.min(minDistances[type], distance);
        } else {
          minDistances[type] = distance;
        }

        if (maxDistances[type]) {
          maxDistances[type] = Math.max(maxDistances[type], distance);
        } else {
          maxDistances[type] = distance;
        }
      });
    }

    return {
      id: i,
      ...building
    };
  });

  paths.forEach(path => {
    const { distance, type } = path;

    //вот тут закомментить/раскомментить для использования цветов из приложения, а не из json
    path.color = '#' + rgbHex(`rgb(${path.color})`);
    // path.color = getColorByDistance(distance, minDistances[type], maxDistances[type]);
  });

  return _buildings;
})();

export const MIN_MAX_DISTANCES = (() => {
  return Object.entries(maxDistances).reduce((result, [type, distance]) => {
    Object.assign(result, {
      [type]: {
        min: minDistances[type],
        max: distance
      }
    });

    return result;
  }, {});
})();

export const ADMIN_TYPES = {
  1: 'kindergarten',
  2: 'school',
  3: 'hospitals',
  4: 'cultural_institutions',
  5: 'parking',
  6: 'market',
  7: 'stop'
};

export const META_FIELDS = ['builder'];
