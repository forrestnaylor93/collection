// for getting canvas with id canvasId - returns canvas and ctx as 2 element list

function getCanvasCtx(canvasID){
// get canvas and context
const canvas = document.getElementById(canvasID); //get canvas
const ctx1 = canvas.getContext('2d'); // get context

// returns canvas and context as 2 element list
return [
    canvas,
    ctx1
]
}




// for resizing and establishing canvas to be used with following css

// html, body{
//     height: 100%;
//     margin:0;
//     padding: 0;
// }

// #canvas1{
//     background-color:#333;
//     width: 100%;
//     height: 100%;
//     display:blcok;
// }

// drawScene(){
//   resizeCanvasToDisplaySize(canvas);
//   ...
// }


function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
   
    // Check if the canvas is not the same size.
    const needResize = canvas.width  !== displayWidth ||
                       canvas.height !== displayHeight;
   
    if (needResize) {
      // Make the canvas the same size
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
   
    return needResize;
  }

  export{getCanvasCtx, resizeCanvasToDisplaySize};