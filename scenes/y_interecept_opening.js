import {Assesment2, Scene, Instructions} from '../Assesment2.js';
import {CoordinatePlane} from '../modules/CoordinatePlane.js';

// This is a scene template 



const build_scene = (ctx) =>{
    // create scene object
    const scene = new Scene(ctx);

   




    // contents of scene
    scene.contents = ()=>{

         // set desired score - defaults to 10
    scene.score_needed = 0


    // create instructions
    scene.instructions = new Instructions('Template Scene', ['Template Scene Instructions', 'line 1', 'line 2', 'line 3']);
    
    scene.handle_instructions(); // handle instructions


    // create criteria for satisfying scene.is_task_complete
    const check_if_task_completed = ()=>{
        if(scene.score == scene.score_needed){
            scene.is_task_complete = true;
        }
    }

    const check_answer = ()=>{
        console.log('check answer')
        //if(answer_not_viable){//warning message}
       // if(answer_correct){// increment score // next question}
       // if(answer_incorrect){// decrease/empty score // explanation // next question}
    }

    const howdy = ()=>{
        console.log('howdy hi there');
        console.log(scene.canvas);
    }

  



    scene.keydown.push(check_if_task_completed);
    scene.keydown.push(check_answer);
    scene.Space.push(howdy);
    scene.Enter.push(howdy);

    scene.add_all_listeners();
    //scene.remove_all_listeners();


        // contents of scene
        console.log('howdy');

        // adjust plane
        console.log(scene.plane);
        scene.plane.reset_unit_size(100);
        
        
  
        scene.animation_loop();// run loop   
    }

        // animation loop of scene
    scene.animation_loop = ()=>{
            if(!scene.end_condition){ // does not redo loop if end condition is satisfied;
                //console.log('animation running');
    
                scene.clear_canvas(); // clears canvas
    
                scene.display_title('Template'); // display title if desired
    
                //if scene plane
                if(scene.plane != null){
                    scene.plane.draw();
                }
    
               //display score
                scene.display_score();
    
                // display next button
                scene.display_next_button();
                // displays instructions if i is pressed
                if(scene.instructions_visible){scene.display_instructions();}
     
               requestAnimationFrame(scene.animation_loop); // start loop again
                }else{ // otherwise break the loop
                    cancelAnimationFrame(scene.animation_loop);
                    scene.clear_canvas();
                    scene.display_text_lines(['scene over'])
                }
     }

   

    return scene; // return scene object because this function returns an object 

}





export{build_scene};


