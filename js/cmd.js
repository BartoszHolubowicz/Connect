function command(cmdInput) {
  let c = cmdInput.value.split(' '), // Input string split to word array
      cV = cmdInput.value;
  function executeCommand(callback, words = c.length) { // Call callback and console log an appropriate message
    callback();
    console.info(`Command executed: %c${c[0]} %c${c.splice(1, words - 1).join(' ')}`, 'color: #ffd000; font-weight: bold; text-shadow: 1px 1px 0 black;', 'color: blue; font-weight: bold;');
  }

  // ----- Commands -----
  //#region loadlevel <level name>
  if (c[0] === 'loadlevel') {
    try {
      executeCommand(() => mainCanvas.loadLevel(eval(c[1])), 2);
    } catch(err) {
      if (err instanceof ReferenceError || err instanceof SyntaxError)
        console.info(`%cError: %c${c[1]} %cdoesn't exist`, 'color: red;', 'color: blue; font-weight: bold;', 'color: red;');
      else
        console.log(err);
    }
  }
  //#endregion
  //#region reset
  else if (c[0] === 'reset')
    executeCommand(() => mainCanvas.level.reset(), 1);
  //#endregion
  //#region testing my fancy command line
  else if (c[0] === 'testing') {
    if (c[1] === 'my')
      if (c[2] === 'fancy')
        if (c[3] === 'command')
          if (c[4] === 'line')
            executeCommand(() => console.log("Woohoo!"), 5);
  }
  //#endregion
  //#region Unknown command case
  else
    console.info(`%cUnknown command:` + ` %c${c[0]}`, 'color: red;', 'color: #ffd000; font-weight: bold; text-shadow: 1px 1px 0 black;');
  //#endregion
  
  cmdInput.value = '';
}

//#region Command submit on enter press
document.querySelector('#cmd').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    command(e.target);
  }
});
//#endregion