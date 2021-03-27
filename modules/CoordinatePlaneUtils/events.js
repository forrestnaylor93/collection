const add_event_listeners = (plane)=>{
    const canvas = plane.ctx.canvas;
    console.log(canvas);
    // movement - (spaceKey) - is_moveable
    canvas.addEventListener('keydown', (e)=>{
        if(e.code == 'Space')
    })
    // resize - (leftShiftKey) - is_resizable 
    // zoom in/out with - (scrollwheel)

}

const 


export {add_event_listeners};