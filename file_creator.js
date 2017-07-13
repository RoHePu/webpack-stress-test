var fs = require('fs'),
    findRemoveSync = require('find-remove'),
    argv = require('minimist')(process.argv.slice(2));

var lNumberOfFilesPerCycle = argv["files"] || 140;
var lNumberOfCircles = argv["cycles"] || 1;
var lNumberOfFiles = lNumberOfFilesPerCycle * lNumberOfCircles + 1;

//you can change the payload if you want to
var jsFilePayload = `

// thanks to https://github.com/jonataswalker/es6-sample-project/edit/master/src/js/drag.js
class Drag {

  /**
   * @constructor
   * @param {Function} base Drag class.
   */
  constructor(base) {

    let container = base.container,
        lastX, lastY, currentX, currentY, x, y,
        when = {},
        dragging = (evt) => {
          evt.preventDefault && evt.preventDefault();

          currentX = parseInt(container.style.left, 10) || 0;
          currentY = parseInt(container.style.top, 10) || 0;

          x = currentX + (evt.clientX - lastX);
          y = currentY + (evt.clientY - lastY);

          when.move.call(undefined, {
            target: container,
            x: x,
            y: y
          });
          lastX = evt.clientX;
          lastY = evt.clientY;
        },
        stopDragging = () => {
          document.removeEventListener('mousemove', dragging, false);
          document.removeEventListener('mouseup', stop, false);

          when.end.call(undefined, {
            target: container,
            x: x,
            y: y
          });
        },
        start = (evt) => {
          if (evt.button !== 0) return;

          lastX = evt.clientX;
          lastY = evt.clientY;

          when.start.call({ target: container });
          document.addEventListener('mousemove', dragging, false);
          document.addEventListener('mouseup', stopDragging, false);
        };

    container.addEventListener('mousedown', start, false);

    // yes, this way we can call other classes methods
    base.constructor.Html.htmlTest();
    base.baseTest();

    return {
      when: (obj) => {
        when.start = obj.start;
        when.move = obj.move;
        when.end = obj.end;
      }
    };
  }
}`;



console.log("~~~~~ File Creator ~~~~~~~");
console.log("Parameters:");
console.log("    #cycle:       " + lNumberOfCircles);
console.log("    #files/cycle: " + lNumberOfFilesPerCycle);
console.log("--------------------------\n\n");

//delete all js files in src directory
var result = findRemoveSync('./src', {extensions: ['.js']});

//create modules
for (var lCircle = 0; lCircle < lNumberOfCircles; lCircle++){
    for (var lFile = 0; lFile < lNumberOfFilesPerCycle; lFile++){

        var lFileNumber = lFile;
        var lImportFileNumber = lFile+1;

        //if last file in circle
        if (lFileNumber === lNumberOfFilesPerCycle - 1){
            lImportFileNumber = 0;
        }

        var sModuleName = `file_c${lCircle}_${lFileNumber}`;
        var sImportModuleName = `file_c${lCircle}_${lImportFileNumber}`;
        var sFilePath = "src/" + sModuleName + ".js";
        var jsImportCode = `import ${sImportModuleName} from "./${sImportModuleName}";
export default "${sModuleName}";`;

        console.log("creating file " + sFilePath);
        fs.writeFileSync(sFilePath, jsImportCode + "\n" + jsFilePayload, 'utf8');
    }
    // append line to index file
    sLineToAppendToIndex = `import file_c${lCircle}_0 from "./file_c${lCircle}_0";`;
    fs.appendFileSync("src/index.js", sLineToAppendToIndex + "\n", 'utf8');
}

console.log("\n~~~~~~~~~~~~~~~~~~~~~\n");
console.log("Total # of files created: " + lNumberOfFiles);
console.log("\n~~~~~~~~~~~~~~~~~~~~~\n");




