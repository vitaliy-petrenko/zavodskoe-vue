import srcData from '../data/map.json';

const estateBuildings = srcData.estateBuildings.map((item, i) => ({
  id: i,
  ...item
}));

export default {
  estateBuildings,

  selectEstateBuilding(id) {
    console.log(id);
    this.state.selectedEstateBuilding = id;
  }
};
