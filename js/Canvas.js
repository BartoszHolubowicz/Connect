class Canvas {
  constructor(selector, width, height) {
    this.c = document.querySelector(selector);
    this.ctx = document.querySelector(selector).getContext('2d');
    this.resize(width, height);
  }
  //#region Scene management
  resize(width, height) {
    this.width = width;
    this.height = height;
    this.c.width = width;
    this.c.height = height;
  }
  loadLevel(level) {
    let gc = globalConfig;
    this.level = level;
    this.resize(gc.marginLeft + gc.tileSize * (level.levelMatrix[0].length - 2) + gc.marginRight, 
      gc.marginTop + gc.tileSize * (level.levelMatrix.length - 2) + gc.marginBottom);
    this.draw();
  }
  //#endregion
  //#region Figure drawing functions
  ellipse(x, y, rx = 1, ry = 1, stroke = true, fill = false) {
    let gc = globalConfig;
    if(!(stroke || fill))
      return;
    this.ctx.beginPath();
    this.ctx.ellipse(x + gc.tileSize * 0.5, y + gc.tileSize * 0.5, rx, ry, 0, 0, 2 * Math.PI);
    if(fill)
      this.ctx.fill();
    if(stroke)
      this.ctx.stroke();
  }
  line(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }
  //#endregion
  //#region Tile related functions
  getTileGridPos(x, y) {
    let gc = globalConfig,
        grid_j = Math.ceil((x - gc.marginLeft) / gc.tileSize),
        grid_i = Math.ceil((y - gc.marginTop) / gc.tileSize);
    if ((grid_j <= this.level.tileMatrix[0].length - 2 && grid_j > 0) && (grid_i <= this.level.tileMatrix.length - 2 && grid_i > 0))
      return {i: grid_i, j: grid_j};
    else {
      return {i: -1, j: -1}; // out of grid
    }
  }
  getTileByPos(i, j) {
    return this.level.tileMatrix[i][j];
  }
  drawTile(tile) {
    let gc = globalConfig;
    this.ctx.fillStyle = tile.isMouseOver() ? tile.colorByType(tile.type + 10) : tile.colorByType(tile.type);
    this.ellipse(gc.marginLeft + (tile.j - 1) * gc.tileSize, gc.marginTop + (tile.i - 1) * gc.tileSize, gc.tileSize * 0.5, gc.tileSize * 0.5, false, true);
  }
  //#endregion
  //#region Scene drawing
  draw() {
    //#region Draw settings
    let gc = globalConfig;
    const outerColor = '#ddd';
    //#endregion
    //#region Background setting
    this.ctx.fillStyle = outerColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.clearRect(gc.marginLeft, gc.marginTop, gc.tileSize * this.level.config.levelMatrix[0].length, gc.tileSize * this.level.config.levelMatrix.length);
    //#endregion
    //#region Tile drawing
    this.level.forAllOnes(this.level.levelMatrix, (i, j) => {
      // let mouseGridPos = this.getTileGridPos(cMouseX, cMouseY);
      // if (i === mouseGridPos.i && j === mouseGridPos.j) {
      //   let tileHighlighted = this.level.tileMatrix[i][j];
      //   tileHighlighted.type += 10;
      //   tileHighlighted.color = tileHighlighted.colorByType(tileHighlighted.type);
      //   this.drawTile(tileHighlighted);
      // } else
        this.drawTile(this.level.tileMatrix[i][j]);
    });
    //#endregion
    //#region Background for empty tiles
    this.ctx.fillStyle = outerColor;
    this.level.forAllZeros(this.level.levelMatrix, (i, j) => {
      this.ctx.fillRect(gc.marginLeft + (j - 1) * gc.tileSize, gc.marginTop + (i - 1) * gc.tileSize, gc.tileSize, gc.tileSize);
    });
    //#endregion
    //#region Outlining tiles
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = '#000';
    this.ctx.lineCap = 'round';
    this.level.forAllOnes(this.level.levelMatrix, (i, j) => {
      if (!this.level.levelMatrix[i-1][j])
        this.line((j - 1) * gc.tileSize + gc.marginLeft, (i - 1) * gc.tileSize + gc.marginTop, j * gc.tileSize + gc.marginLeft, (i - 1) * gc.tileSize + gc.marginTop);
      if (!this.level.levelMatrix[i][j-1])
        this.line((j - 1) * gc.tileSize + gc.marginLeft, (i - 1) * gc.tileSize + gc.marginTop, (j - 1) * gc.tileSize + gc.marginLeft, i * gc.tileSize + gc.marginTop);
      if (!this.level.levelMatrix[i+1][j])
        this.line((j - 1) * gc.tileSize + gc.marginLeft, i * gc.tileSize + gc.marginTop, j * gc.tileSize + gc.marginLeft, i * gc.tileSize + gc.marginTop);
      if (!this.level.levelMatrix[i][j+1])
        this.line(j * gc.tileSize + gc.marginLeft, (i - 1) * gc.tileSize + gc.marginTop, j * gc.tileSize + gc.marginLeft, i * gc.tileSize + gc.marginTop);
    });
    //#endregion

    this.level.checkTileMatches();
    window.requestAnimationFrame(this.draw.bind(this));
  }
  //#endregion
}