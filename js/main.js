var globalConfig;
var mouseX, mouseY, cMouseX, cMouseY; // Mouse position variables

//#region Level variables
var level0_config, level1_config, level2_config, level3_config;
var level0, level1, level2, level3;
var levelPromises = [];
//#endregion

//#region Loading everything
  //#region Loading global config file
  var globalConfigPromise = loadJSON('../config.json')
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
    if (globalConfig.debugMode) {
      console.warn('Debug Mode Enabled');
      document.querySelector('#debug-stuff').style.display = 'block';
    }
  });
  //#endregion
  //#region Loading main canvas, getting mouse positions on mouse move
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
  });
  //#endregion
  //#region Loading levels
  levelPromises[0] = loadJSON('../levels/level0.json')
  .then(data => {
    level0_config = data;
  })
  .then(() => {
    level0 = new Level(level0_config);
  });

  levelPromises[1] = loadJSON('../levels/level1.json')
  .then(data => {
    level1_config = data;
  })
  .then(() => {
    level1 = new Level(level1_config);
  });

  levelPromises[2] = loadJSON('../levels/level2.json')
  .then(data => {
    level2_config = data;
  })
  .then(() => {
    level2 = new Level(level2_config);
  });

  levelPromises[3] = loadJSON('../levels/level3.json')
  .then(data => {
    level3_config = data;
  })
  .then(() => {
    level3 = new Level(level3_config);
  });
  //#endregion
  //#region Load everything, set main canvas level to level1
  Promise.all([globalConfigPromise, mainCanvasPromise, ...levelPromises])
  .then(() => {
    mainCanvas.loadLevel(eval(globalConfig.startingLevel));
  });
//#endregion
//#endregion