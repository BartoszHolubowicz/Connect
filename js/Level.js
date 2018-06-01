class Level {
  constructor(config) {
    this.config = config;
    this.levelMatrix = this.loadLevelMatrix();
    this.tileMatrix = this.generateTileMatrix(this.levelMatrix[0].length, this.levelMatrix.length);
    this.selectionMatrix = generateMatrix(this.levelMatrix[0].length, this.levelMatrix.length, 0);
  }
  loadLevelMatrix() { // Outline level matrix with zeros
    let newMatrix = [], emptyRow = [];
    for (let i = 0; i < this.config.levelMatrix[0].length + 2; i++)
      emptyRow.push(0);

    newMatrix.push(emptyRow);
    for (let i = 0; i < this.config.levelMatrix.length; i++)
      newMatrix.push([0, ...this.config.levelMatrix[i], 0]);
    newMatrix.push(emptyRow);

    return newMatrix;
  }
  generateTileMatrix(i, j) { // Generates tiles where level matrix values are ones
    let tileMatrix = generateMatrix(i, j, new Tile(i, j, -1));
    forAllOnes(this.levelMatrix, (y, x) => {
      let newTile = new Tile(y, x);
      tileMatrix[y][x] = newTile;
    });
    return tileMatrix;
  }
  reset() { // Generate a new tile matrix
    this.tileMatrix = this.generateTileMatrix(this.levelMatrix[0].length, this.levelMatrix.length, 0);
  }
  checkTileMatches() {
    return;
  }
}