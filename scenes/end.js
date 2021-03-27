import {Assesment2, Scene, Instructions} from '../Assesment2.js';


const build_scene = (ctx) =>{
    // create scene object
    const scene = new Scene(ctx);

    // create instructions
    scene.instructions = new Instructions('Cartesian Mastery', ['This is the Instruction Screen', 'You can always press i to get to an instruction screen', 'Each section of this test has an instruction screen', 'Press i again and then space to begin the test']);
    
    scene.handle_instructions(); // handle instructions
    scene.end_contion = false; // set end condition to false initially


   

    // contents of scene
    scene.contents = ()=>{

         // determine what should allow an end condition to be satisfied
    const satisfy_end_condition = (e)=>{
        if(e.code == 'Space'){
            scene.end_condition = true;
            console.log('end condition satisfied', scene.end_condition);
        }
    }


    // event listeners
    const handle_end_condition = scene.canvas.addEventListener('keydown', satisfy_end_condition)
    
    // get rid of event listeners (at end)
    const remove_all_event_listeners = ()=>{
        scene.canvas.removeEventListener('keydown', satisfy_end_condition);
    }

        let loop = ()=>{

            if(!scene.end_condition){ // does not redo loop if end condition is satisfied;
            console.log('animation running');

            scene.clear_canvas(); // clears canvas

            scene.display_title('Cartesian Mastery'); // display title if desired

            //display text if wanted
            scene.display_text_lines(['Topics:', 'Find X & Y Coordinates', 'Label X & Y Coordinates', 'Slope Intuition - (Positive, Negative, Big, Small, Vertical, Horizontal)', 'Measuring Slope Visually', 'Measuring Slope with Formula', '', 'press i to continue'])

            // displays instructions if i is pressed
            if(scene.instructions_visible){scene.display_instructions();}
 
           requestAnimationFrame(loop); // start loop again
            }else{ // otherwise break the loop
                cancelAnimationFrame(loop);
                scene.clear_canvas();
                scene.display_text_lines(['finsihed scene'])
                remove_all_event_listeners();
            }
           
        }

        loop();// run loop   
    }

    return scene; // return scene object because this function returns an object 

}





export{build_scene};


