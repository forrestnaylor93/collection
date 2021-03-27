import {Assesment2, Scene, Instructions} from '../Assesment2.js';
import {Button} from '../modules/Button.js';


const build_scene = (ctx) =>{
    // create scene object
    const scene = new Scene(ctx);

    // create instructions
    scene.instructions = new Instructions('Cartesian Mastery', ['This is the Instruction Screen', 'You can always press i to get to an instruction screen', 'Each section of this test has an instruction screen', 'Press i again and click the next button to continue']);
    
    scene.handle_instructions(); // handle instructions
    scene.end_condition = false; // set end condition to false initially
    scene.score_needed = 0;

    //
    let instructions_viewed = false;
    // contents of scene
    scene.contents = ()=>{

        

         // determine what should allow an end condition to be satisfied
    const check_task_completion = (e)=>{
        if(e.code == 'KeyI'){
            console.log('i pressed');
            scene.is_task_complete = true;
            remove_all_event_listeners();
        }
    }

    // event listeners
    scene.canvas.addEventListener('keydown',check_task_completion)

    // get rid of event listeners (at end)
    const remove_all_event_listeners = ()=>{
        scene.canvas.removeEventListener('keydown',check_task_completion)
    }

    // const next_button = new Button(ctx, 'Next', ctx.canvas.width-250, 100, 100, 60);
    // next_button.end_condition = scene.end_condition;

    //next_button.on_click = next_button.satisfy_end_condition(scene.end_condition);
   


        let loop = ()=>{

            //

            

            if(!scene.end_condition){ // does not redo loop if end condition is satisfied;
            //console.log('animation running');

            scene.clear_canvas(); // clears canvas

            scene.display_title('Cartesian Mastery'); // display title if desired

            //display text if wanted
            scene.display_text_lines(['Topics:', 'Find X & Y Coordinates', 'Label X & Y Coordinates', 'Slope Intuition - (Positive, Negative, Big, Small, Vertical, Horizontal)', 'Measuring Slope Visually', 'Measuring Slope with Formula', '', 'press i to continue'])
            // 
            //next_button.draw();
            scene.display_next_button();
            // displays instructions if i is pressed
            if(scene.instructions_visible){scene.display_instructions();} //scene.show_time();}
 
           requestAnimationFrame(loop); // start loop again
            }else{ // otherwise break the loop
                cancelAnimationFrame(loop);
                scene.end_condition = true;
                scene.clear_canvas();
                //scene.display_text_lines(['Great, Space is usually a key you can press to move on to the next section.', 'Now... press it again.'])
                remove_all_event_listeners();
            }
           
        }

        loop();// run loop   
    }

    return scene; // return scene object because this function returns an object 

}





export{build_scene};


