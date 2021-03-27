// import canvas initializiation functions
import {getCanvasCtx, resizeCanvasToDisplaySize} from './modules/initCanvasCtx.js';
import {CoordinatePlane} from './modules/CoordinatePlane.js';
import {HighlightedArea} from './modules/CoordinatePlaneUtils/HiglightedArea.js';
import {Assesment2, Scene, Instructions} from './Assesment2.js';
// import {build_scene as build_opening} from './scenes/opening.js';
// import {build_scene as build_find_xy} from './scenes/find_x_y_coordinates.js';
// import {build_scene as build_label_xy} from './scenes/label_x_y_coordinates.js';
// import {build_scene as build_slope_big_v_small} from './scenes/slope_big_and_small_intution.js';
// import {build_scene as build_slope_visual} from './scenes/slope_visual.js';
// import {build_scene as build_slope_formulaic} from './scenes/slope_formulaic.js';
// import {build_scene as build_score} from './scenes/score.js';

// import {build_scene as build_y_intercept_intro} from './scenes/y_intercept_intro.js';
// import {build_scene as build_y_intercept_identify} from './scenes/y_intercept_identify.js';

import {build_scene as build_y_intercept_opening} from './scenes/y_interecept_opening.js';


import {build_scene as build_template} from './scenes/scene_template.js';
import {build_scene as build_end} from './scenes/end.js';



// import {initEventListeners} from './modules/initEventListeners.js'




// create canvas initialization object
const [canvas1, ctx1] = getCanvasCtx('canvas1');


// resize canvas so ratios are correct
resizeCanvasToDisplaySize(canvas1);


let coordinatePlanes = [];

const highLightAction = ()=>{
    let x, x1, y, y1 = 0;
    ({x, x1, y, y1} = highLight.coords);
    let plane = new CoordinatePlane(ctx1, x, y, x1, y1);
    coordinatePlanes.push(plane);
}



let highLight = new HighlightedArea(ctx1, highLightAction);






let assesment = new Assesment2(ctx1);

//let opening = build_opening(ctx1);
let template = build_template(ctx1);
let template2 = build_template(ctx1);

let y_intecept_opening = build_y_intercept_opening(ctx1);



// let find_xy = build_find_xy(ctx1);
// let label_xy = build_label_xy(ctx1);
// let slope_big_v_small = build_slope_big_v_small(ctx1);
// let slope_visual = build_slope_visual(ctx1);
// let slope_formulaic = build_slope_formulaic(ctx1);
// let score = build_score(ctx1);
// let y_intercept_intro = build_y_intercept_intro(ctx1);
// let y_intercept_identify = build_y_intercept_identify(ctx1);



//score.other_assets[0]



let end = build_end(ctx1);
//scene.instructions_visible = true;
//assesment.scenes.push(template);
//assesment.scenes.push(opening);

//assesment.scenes.push(find_xy);
//assesment.scenes.push(label_xy);
// assesment.scenes.push(slope_big_v_small);
// assesment.scenes.push(slope_visual);
// assesment.scenes.push(slope_formulaic);
// assesment.scenes.push(score);
assesment.scenes.push(y_intecept_opening)
assesment.scenes.push(template);

assesment.scenes.push(template2);
// assesment.scenes.push(y_intercept_intro);
// assesment.scenes.push(y_intercept_identify)
//assesment.scenes = [y_intercept_intro, y_intercept_intro, y_intercept_identify ]
// slope intuiton 


let start = new Date()

assesment.scenes.forEach((scene)=>{
    scene.start = start;
})

//assesment.scenes.push(end);

//scene.contents();
//assesment.scenes[0].contents();
//assesment.start_scene();
//assesment.scenes[0].contents();
canvas1.addEventListener('keydown',(e)=>{
    switch(e.code){
        case 'Numpad0':
            assesment.scenes[0].contents();
        break;
        case 'Numpad1':
            assesment.scenes[1].contents();
        break;
        case 'Numpad2':
            assesment.scenes[2].contents();
        break;
        default:
    }
}
)


// get name
//assesment.scenes[2].contents();

//let name  = window.prompt('Enter your name: ')
//score.other_assets.push(name);

assesment.start_assesment();
//assesment.scenes[6].contents();

//assesment.scenes[2].contents();

//assesment.scenes[6].contents();




//scene.ctx.fillText(scene.instructions.headline, 100, 100);





// // canvas1.addEventListener('mousedown', (e) => {
// //     if(e.ctrlKey == true){
// //         x = e.clientX;
// //         y = e.clientY;
         
// //         highLight.visible = true;
// //         mouseIsDown = true;
// //     }
// // })

// // canvas1.addEventListener('mousemove', (e) => {
// //     if(mouseIsDown){
// //        highLight.x1 = e.clientX;
// //        highLight.y1 = e.clientY;
// //     }
// // })
 
// //

// // Exam Sections

// // Coordinates
//     // locating
//     // placing

// // Slope Intuition
//     // positive vs negative
//     // big vs small
//     // zero slope -> horizontal line
//     // undefined -> vertical line

// // Finding Slope
//     // Visual Method
//     // Formulaic Method


// // Sloppe Intuition

// // loop function

// // function loop(){
// //     ctx1.clearRect(0,0,canvas1.width, canvas1.height);
// //     highLight.update();
// //     highLight.draw();

// //     coordinatePlanes.forEach((plane)=>{
// //         plane.draw();
// //     })


// //     requestAnimationFrame(loop);


// // }


// // execute loop

// //loop();



// // Cooridnates

// let prompt_index = 0; 

// const next_prompt_on_space = (index)=>{
//     canvas1.addEventListener('keydown', (e)=>{
//         if(e.code == 'Space'){
//             prompt_index = index
//         }
//     })
// }

// const begin_exam = ()=>{
    
//     ctx1.fillStyle = '#ccc';
//     ctx1.font = '60px Arial';
//     ctx1.fillText('Click Screen and Press Space to Start.', 100, 100)
//     next_prompt_on_space(1);
// }



// const instructions_for_coordinates_exercise_1 = ()=>{

    
//     ctx1.fillStyle = '#ccc';
//     ctx1.font = '60px Arial';
//     ctx1.fillText('Click Screen and Press Space to Start.', 100, 100)

    


//     ctx1.clearRect(0,0,canvas1.width, canvas1.height);
//     ctx1.fillStyle = '#ccc';
//     ctx1.font = '60px Arial';
//     ctx1.fillText('Instructions', 100, 100)
//     ctx1.font = '30px Arial';
//     ctx1.fillText('X & Y Coordinates', 100, 200)
//     ctx1.fillText('use the arrow keys to navigate your point', 100, 250);
//     ctx1.fillText('press "enter" when you are satisfied you point matches the coordiantes given', 100, 300);
//     ctx1.fillText('Get 7 in a row to advance to the next section', 100, 350);
//     ctx1.fillText('Otherwise, restart!', 100, 400);
//     ctx1.fillText('Press the space key to begin', 100, 600);  

//     next_prompt_on_space(2);
// }

// const coordinates_exercise_1 = ()=>{
//    // console.log('exercise')

//    let plane = new CoordinatePlane(ctx1, 0, 100, canvas1.width, canvas1.height );

   
//     plane.make_point(5, 7);
//     console.log(plane.points.length);
   
   
   


//    let score = 0;
//    var timeoutId = null;

//    const coordinates_exercise_1_loop = ()=>{
//     ctx1.clearRect(0,0,canvas1.width, canvas1.height);
//     //console.log('howdy')
//     plane.draw();
//     ctx1.fillStyle = '#ccc';
//     ctx1.font = '30px Arial';
//     ctx1.fillText('SCORE: ' + score.toString(), 100, 50);

    
//     timeoutId = setTimeout(coordinates_exercise_1_loop, 3000);

//    }

//    do{coordinates_exercise_1_loop()}
//    while(1==1)
 
//     //coordinates_exercise_1_loop();


//    console.log('repeating');


//    //plane.draw();
   
// }

// const prompts = [begin_exam,  instructions_for_coordinates_exercise_1, coordinates_exercise_1];


// const loop = ()=>{
//     //console.log(prompt_index)
//     ctx1.clearRect(0,0,canvas1.width, canvas1.height);
//     prompts[prompt_index]();

//     requestAnimationFrame(loop);
// }

// // do{loop()}
// // while(prompt_index == 0);



// loop();

// //while(!next_prompt){};


// //coordinates_assessment();


