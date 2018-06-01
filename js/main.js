var globalConfig;
var mouseX, mouseY, cMouseX, cMouseY; // Mouse position variables

//#region Level related variables
const levelCount = 5;
var levels = [];
var levelPromises = [];
//#endregion

//#region Loading everything
  //#region Loading global config file
  var globalConfigPromise = loadJSON('../config.json')
  .then(data => {
    globalConfig = data;
    return globalConfig;
  })
  .then(data => {
    if (!globalConfig.staticMargins) {
      globalConfig.marginLeft = globalConfig.tileSize * globalConfig.marginLeftProp;
      globalConfig.marginRight = globalConfig.tileSize * globalConfig.marginRightProp;
      globalConfig.marginTop = globalConfig.tileSize * globalConfig.marginTopProp;
      globalConfig.marginBottom = globalConfig.tileSize * globalConfig.marginBottomProp;
    }
    if (globalConfig.debugMode) {
      console.warn('Debug Mode Enabled');
      document.querySelector('#debug-stuff').style.display = 'block';
    }
  });
  //#endregion
  //#region Loading main canvas, adding event listeners to it
  var mainCanvas, mainCanvasPromise = new Promise((resolve, reject) => {
    resolve();
  })
  .then(() => {
    window.addEventListener('mousemove', e => {
      mouseX = e.pageX;
      mouseY = e.pageY;
    });
  })
  .then(() => {
    mainCanvas = new Canvas('#canvas', 200, 200);
    return mainCanvas;
  })
  .then(canv => {
    canv.c.addEventListener('mousemove', function(e) {
      cMouseX = mouseX - this.offsetLeft;
      cMouseY = mouseY - this.offsetTop;
    });
    canv.c.addEventListener('click', e => canv.mouseClick(e));
    canv.c.addEventListener('mousedown', e => canv.mouseDown(e));
  });
  //#endregion
  //#region Loading levels
  for (let i = 0; i < levelCount; i++) {
    levelPromises[i] = loadJSON(`../levels/level${i}.json`)
    .then(data => {
      levels[i] = new Level(data);
    })
  }
  //#endregion
  //#region Load everything, set main canvas level to starting level set in config.json
  Promise.all([globalConfigPromise, mainCanvasPromise, ...levelPromises])
  .then(() => {
    mainCanvas.loadLevel(eval(globalConfig.startingLevel));
  });
  //#endregion
//#endregion