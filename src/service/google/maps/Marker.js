export default class Marker {

  constructor(map) {
    this.item = new map.Marker({
      draggable: true,
      anchorPoint: map.Point(0, -29)
    });
  }
}
