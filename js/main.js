var globalConfig;
var mouseX, mouseY;

var level1_config, level2_config;
var level1, level2;

var mainCanvas = new Canvas('#canvas', 200, 200);

loadJSON('../config.json')
.then(data => {
  globalConfig = data;
})
.then(() => {
  if (!globalConfig.staticMargins) {
    globalConfig.marginLeft = globalConfig.tileSize * globalConfig.marginLeftProp;
    globalConfig.marginRight = globalConfig.tileSize * globalConfig.marginRightProp;
    globalConfig.marginTop = globalConfig.tileSize * globalConfig.marginTopProp;
    globalConfig.marginBottom = globalConfig.tileSize * globalConfig.marginBottomProp;
  }
});

loadJSON('../levels/level1.json')
.then(data => {
  level1_config = data;
})
.then(() => {
  level1 = new Level(level1_config);
  return level1;
})
.then(level => {
  mainCanvas.loadLevel(level);
});

loadJSON('../levels/level2.json')
.then(data => {
  level2_config = data;
})
.then(() => {
  level2 = new Level(level2_config);
});

window.addEventListener("mousemove", e => {
  mouseX = e.pageX;
  mouseY = e.pageY;
})

