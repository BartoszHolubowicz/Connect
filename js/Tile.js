class Tile {
  constructor(i, j, type = Math.floor(Math.random() * 5) + 1) {
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
        return '#f22';
        break;
      case 12:
        return '#2f2';
        break;
      case 13:
        return '#22f';
        break;
      case 14:
        return '#ff2';
        break;
      case 15:
        return '#f2f';
        break;
      case 16:
        return '#2ff';
        break;
    }
  }
  isMouseOver(mouseX, mouseY) {
    let gc = globalConfig;
    if(((mouseX >= this.j && mouseX < this.j + gc.tileSize)) && (mouseY >= this.i && mouseY < this.i + gc.tileSize))
      return true;
  }
}