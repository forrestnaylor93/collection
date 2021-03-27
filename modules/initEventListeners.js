import {HighlightedArea} from './CoordinatePlaneUtils/HiglightedArea.js';
// event listeners for coordinate plane js

const initEventListeners = (canvas, ctx) =>{

    // for dev
canvas.addEventListener('keydown', (e)=>{
    if(e.code == "KeyP")
    console.log(plane);
})

selectArea(canvas, ctx);
}


// select area



const selectArea = (canvas, ctx)=>{
    let startX = 0; // coordinate for start of graph
    let startY = 0; // coordinate for start of graph
    let endX = 0; // cordinate for end of graph
    let endY = 0; // coordinate for end of graph
    let mouseDown = false;
    let highLight = 0;

    canvas.addEventListener('mousedown', (e)=>{
        if(e.ctrlKey == true){
            console.log('down');
            startX = e.clientX;
            startY = e.clientY;
            endX = 0;
            endY = 0;
            console.log("start", startX, startY);
            mouseDown = true;
            highLight = new HighlightedArea(ctx, startX, startY, endX, endY);
        }
        

    })
    canvas.addEventListener('mousemove', (e)=>{
        //ctx.fillRect(0,0,100,100);
        if(mouseDown == true){
            console.log('dragging');
            highLight.draw();

        }
        //console.log('move');
        //console.log(startX, startY);
    //console.log(startX, startY);
    })
    canvas.addEventListener('mouseup', (e)=>{
        console.log('up');
        endX = e.clientX;
        endY = e.clientY;
        console.log("end", endX, endY);
        mouseDown = false;
    })
}

export {initEventListeners}