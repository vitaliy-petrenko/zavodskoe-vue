import srcData from '../data/map.json';
import { getColorByDistance } from './colors';

let maxDistances = {};

export const estateBuildings = (() => {
  const paths = [];

  const _buildings = srcData.estateBuildings.map((building, i) => {
    if (Array.isArray(building.paths)) {
      paths.push(...building.paths);

      building.distances = {};

      building.paths.forEach(({ type, distance }) => {
        building.distances[type] = distance;

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

    path.color = getColorByDistance(distance, maxDistances[type]);
  });

  return _buildings;
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
