import {Assesment2, Scene, Instructions} from '../Assesment2.js';
import {CoordinatePlane} from '../modules/CoordinatePlane.js';
import {runInput} from '../modules/InputBox.js';

const build_scene = (ctx) =>{
    // create scene object
    const scene = new Scene(ctx);
    scene.end_condition = false;

    



    // create instructions
    scene.instructions = new Instructions('Label X & Y Coordinates', ['Fill in X and Y coordinates', 'Press Enter to check coordinates', 'Get 5 in a row to continue', 'Try as many times as you like! (There is no penalty)']);
    scene.score_needed = 5;
    scene.handle_instructions(); // handle instructions


    // contents of scene
    scene.contents = ()=>{
        runInput();


          // determine what should allow an end condition to be satisfied

    // objects made for scene
    let height = ctx.canvas.height - 200;
    let x_margin = (ctx.canvas.width - height)/2;
    let width = height;
    const plane = new CoordinatePlane(ctx, x_margin, 100, x_margin + width, 100 + height);
    plane.remove_all_listeners();




    // event listeners
    //const handle_end_condition = scene.canvas.addEventListener('keydown', satisfy_end_condition)
    
    // get rid of event listeners (at end)
    const remove_all_event_listeners = ()=>{
       // scene.canvas.removeEventListener('keydown', satisfy_end_condition);
    }

    // copy and pasted code
    let end_condition = false;


        let canvas = ctx.canvas;
        // create 5 points to move around
        


        let get_random_coords = ()=>{
            let coords = {
                x: Math.round(2*(plane.m.x.min_unit + 1 + Math.random()*(plane.m.x.total_units-2)))/2,
                y: Math.round(2*(plane.m.y.min_unit + 1 + Math.random()*(plane.m.y.whole_units-2)))/2
            }

            return coords;
        }

        let current_index = 0;

        

        let target_coordinates = []
        const make_new_target_points = () =>{
            current_index = 0;
            target_coordinates  = [ ]
            for(let i = 0; i < 5; i++){
                let coordinates = get_random_coords()
                target_coordinates.push(coordinates);
               // console.log(target_coordinates);
            }
        }
        make_new_target_points();


        
        plane.make_point(target_coordinates[current_index].x, target_coordinates[current_index].y);
        
        let check_score = ()=>{}

        let makeInputs = ()=>{
            var inputX = new CanvasInput({
                canvas: document.getElementById('canvas1'),
                fontSize: 40,
                y: 10,
                x: ctx.canvas.width/2 - 60,
                fontFamily: 'Arial',
                fontColor: 'cyan',
                backgroundColor: '#333',
                fontWeight: 'bold',
                width: 90,
                padding: 10,
                borderWidth: 0,
                borderColor: '#000',
                borderRadius: 3,
                boxShadow: '1px 1px 0px #fff',
                innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
                placeHolder: '   X',
                placeHolderColor: 'cyan',
                onsubmit: function(){inputX.blur();check_score()},
              });
        
            var inputY = new CanvasInput({
                canvas: document.getElementById('canvas1'),
                fontSize: 40,
                y: 10,
                x: ctx.canvas.width/2 + 80,
                fontFamily: 'Arial',
                fontColor: 'fuchsia',
                backgroundColor: '#333',
                fontWeight: 'bold',
                width: 90,
                padding: 10,
                placeHolderColor: 'fuchsia',
                borderWidth: 0,
                borderColor: '#000',
                borderRadius: 3,
                boxShadow: '1px 1px 0px #fff',
                innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
                placeHolder: '   Y',
                onsubmit: function(){
                    inputY.blur();
                    check_score();
                }
            });
        }


        var inputX = new CanvasInput({
            canvas: document.getElementById('canvas1'),
            fontSize: 40,
            y: 10,
            x: ctx.canvas.width/2 - 60,
            fontFamily: 'Arial',
            fontColor: 'cyan',
            backgroundColor: '#333',
            fontWeight: 'bold',
            width: 90,
            padding: 10,
            borderWidth: 0,
            borderColor: '#000',
            borderRadius: 3,
            boxShadow: '1px 1px 0px #fff',
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            placeHolder: '   X',
            placeHolderColor: 'cyan',
            onsubmit: function(){inputX.blur(), check_score()},
          });

        var inputX_template = inputX
    
        var inputY = new CanvasInput({
            canvas: document.getElementById('canvas1'),
            fontSize: 40,
            y: 10,
            x: ctx.canvas.width/2 + 80,
            fontFamily: 'Arial',
            fontColor: 'fuchsia',
            backgroundColor: '#333',
            fontWeight: 'bold',
            width: 90,
            padding: 10,
            placeHolderColor: 'fuchsia',
            borderWidth: 0,
            borderColor: '#000',
            borderRadius: 3,
            boxShadow: '1px 1px 0px #fff',
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            placeHolder: '   Y',
            onsubmit: function(){
                check_score();
            }
        });

        var inputY_template = inputY;

        let show_original_inputs = true;

        check_score = ()=>{
            let x = inputX._value;
            let y = inputY._value;
            let target_x = plane.points[0].x;
            let target_y = plane.points[0].y;
            if(true){
                if(x == target_x && y == target_y){
                    //console.log('Huzzah!');
                    scene.score += 1;

                    if(scene.score == scene.score_needed){
                        scene.is_task_complete = true;
                        scene.display_title('Complete! press space to continue')
                    }



                    current_index += 1;
                    plane.points.shift();
                    plane.make_point(target_coordinates[current_index].x, target_coordinates[current_index].y)
                }else{
                    scene.score = 0;
                }
                
            }
        }

    

        canvas.addEventListener('keydown', check_score());
        

        let loop = ()=>{

            if(!scene.end_condition){ // does not redo loop if end condition is satisfied;
            //console.log('animation running');

            scene.clear_canvas(); // clears canvas

            //scene.display_title('Find X & Y Coordinates'); // display title if desired

          

            // copy and pasted

            ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
            
            //scene.display_as_text('Finding X & Y Coordinates', 100, canvas.width - 500);
            plane.draw();

            // input boxes
            //scene.ctx.fillRect(300,300, 100, 100);
            //xBox.draw();
            

            // display target coordinates
            
            

            // display score
            scene.ctx.fillStyle = '#ccc';
            scene.display_score();
            scene.display_next_button();
            //scene.display_text_lines(["Score: " + score.toString()], 100, 100);
            // scene.display_as_text("Score: " + score.toString(), 100, 100);
            
            // display soought point
            scene.ctx.fillStyle = "#ccc";
            scene.ctx.font = "60px Arial";
            scene.ctx.fillText("(", scene.ctx.canvas.width/2- 90, 60);
            scene.ctx.fillText(",", scene.ctx.canvas.width/2 + 55, 60);


    
            inputX.render();
            scene.ctx.fillText(")", scene.ctx.canvas.width/2+ 202, 60);
            inputY.render();
       
        
            

            
     

    
            

        
            // displays instructions if i is pressed
            if(scene.instructions_visible){scene.display_instructions();}
 
           requestAnimationFrame(loop); // start loop again
            }else{ // otherwise break the loop
                cancelAnimationFrame(loop);
                //scene.clear_canvas();
                scene.ctx.fillStyle = '#333';
                scene.ctx.fillRect(0,0,scene.canvas.width, 100);
                inputX.destroy();
                inputY.destroy();
                scene.display_title('Complete! Press Space to continue ');
                remove_all_event_listeners();
            }
           
        }

        loop();// run loop   
    }

    return scene; // return scene object because this function returns an object 

}





export{build_scene};


