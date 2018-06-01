class Tile {
  constructor(i, j, type = Math.floor(Math.random() * 6) + 1) {
    this.i = i;
    this.j = j;
    this.type = type;
    this.color = this.colorByType(type);
  }
  colorByType(type) {
    switch(type) {
      case 1:
        return '#f00';
        break;
      case 2:
        return '#0f0';
        break;
      case 3:
        return '#00f';
        break;
      case 4:
        return '#ff0';
        break;
      case 5:
        return '#f0f';
        break;
      case 6:
        return '#0ff';
        break;
      case 11:
        return '#f44';
        break;
      case 12:
        return '#4f4';
        break;
      case 13:
        return '#44f';
        break;
      case 14:
        return '#ff4';
        break;
      case 15:
        return '#f4f';
        break;
      case 16:
        return '#4ff';
        break;
    }
  }
  isMouseOver() {
    let gc = globalConfig;
    if (cMouseX >= gc.marginLeft + (this.j - 1) * gc.tileSize && cMouseX < gc.marginLeft + this.j * gc.tileSize &&
        cMouseY >= gc.marginTop + (this.i - 1) * gc.tileSize && cMouseY < gc.marginTop + this.i * gc.tileSize)
      return true;
  }
}