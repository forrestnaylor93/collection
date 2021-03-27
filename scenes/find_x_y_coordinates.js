import {Assesment2, Scene, Instructions} from '../Assesment2.js';
import {CoordinatePlane} from '../modules/CoordinatePlane.js';


const build_scene = (ctx) =>{
    // create scene object
    const scene = new Scene(ctx);

    scene.instructions = new Instructions('Find X & Y Coordinates', ['Move the point with the arrow keys', 'Press Enter to place the point', 'Get 8 in a row to continue', 'Try as many times as you like! (There is no penalty)']);
    scene.score_needed = 8;

    // create instructions
    
   
    
    // contents of scene
    scene.contents = ()=>{

        scene.handle_instructions(); // handle instructions

        const check_task_completion = (e)=>{
            if(e.code == 'KeyI'){
                console.log('i pressed');
                scene.is_task_complete = true;
                scene.canvas.removeEventListener('keydown', movement_handler)
            }
        }

        // determine what should allow an end condition to be satisfied


    // objects made for scene
    let height = ctx.canvas.height - 200;
    let x_margin = (ctx.canvas.width - height)/2;
    let width = height;
    const plane = new CoordinatePlane(ctx, x_margin, 100, x_margin + width, 100 + height);
    plane.remove_all_listeners();




    // event listeners
    
    // get rid of event listeners (at end)
    const remove_all_event_listeners = ()=>{
    }

    // copy and pasted code
    let end_condition = false;
        //let score = 0;


        let canvas = ctx.canvas;
        // create 5 points to move around
        

        let get_random_coords = ()=>{
            let coords = {
                x: Math.round(2*(plane.m.x.min_unit + 1 + Math.random()*(plane.m.x.total_units-2)))/2,
                y: Math.round(2*(plane.m.y.min_unit + 1 + Math.random()*(plane.m.y.whole_units-2)))/2
            }

            return coords;
        }

        let starting_coords = get_random_coords();
        let point_index = 0;

        let targetPoints = [{x:0, y:0}] // always move to origin first
        // create four more target points
        for (let i = 0; i < 20; i++){
            let coords = get_random_coords();
            targetPoints.push(coords);
        }

        plane.make_point(starting_coords.x,starting_coords.y);
    

        // handle moving arrow keys
        let move_point_down = (point)=>{
            point.y -= 0.5;
        }
        let move_point_up = (point)=>{
            point.y += 0.5;
        }
        let move_point_right = (point)=>{
            point.x += 0.5;
        }
        let move_point_left = (point)=>{
            point.x -= 0.5;
        }

        let check_score = ()=>{
            if(
                    plane.points[point_index].x == targetPoints[point_index].x &&
                    plane.points[point_index].y == targetPoints[point_index].y 
                ){
                    scene.score += 1;
                    point_index += 1;
                    if(scene.score_needed == scene.score){
                        scene.is_task_complete = true;
                    }
                }else{
                    scene.score = 0;
                    point_index += 0;
                }

        }
            

           // if

            // if(
            //     plane.points[point_index].x == targetPoints[point_index].x &&
            //     plane.points[point_index].y == targetPoints[point_index].y 
            // ){
            //     scene.score += 1
            //     if(scene.score >= scene.score_needed){
            //         scene.is_task_complete = true;
            //         cancelAnimationFrame(loop);
            //         //scene.clear_canvas();
            //         //scene.ctx.fillStyle = '#333';
            //         //scene.ctx.fillRect(0,0,scene.canvas.width, 100);
            //         remove_all_event_listeners();
            //         return;
            //     }else{
            //         point_index +=1;
            //     };

            // }else{
            //     point_index += 1;
            //     scene.score = 0;
            // }

            // else{
            //     starting_coords = get_random_coords();
            //     scene.score = 0;
            //     point_index = -1;
            //     plane.points = [];
            //     plane.make_point(starting_coords.x, starting_coords.y)
            //     let targetPoints = [{x:0, y:0}] // always move to origin first
            //      // create four more target points
            //     for (let i = 0; i < 4; i++){
            //     let coords = get_random_coords();
            //     targetPoints.push(coords);
            // }

           
        

    
        

        let get_new_point = ()=>{
            //console.log('get new point')
            //let xPos = Math.round(plane.m.x.min_unit + 1 + Math.random()*(plane.m.x.total_units-2));
            //let yPos = Math.round(plane.m.y.min_unit + 1 + Math.random()*(plane.m.y.whole_units-2));




            plane.make_point(0, 0)

        }

        let movement_handler = (e)=>{
            //console.log(e.code);

            switch(e.code){
                case 'ArrowDown':
                    move_point_down(plane.points[point_index]);
                break;
                case'ArrowUp':
                    move_point_up(plane.points[point_index]);
                break;
                case'ArrowLeft':
                    move_point_left(plane.points[point_index]);
                break;
                case'ArrowRight':
                    move_point_right(plane.points[point_index]);
                break;
                case 'Enter':
                    get_new_point(0,0);
                    check_score();
                case 'NumpadEnter':
                    get_new_point(0,0);
                    check_score();
                    if(scene.score == 1){
                        alert('Hope this works for you Lizzie!')
                    }
                break;
                    
                    
                    
                break;
                default:
            }
            
            
            
        }

        canvas.addEventListener('keydown', movement_handler);

        let loop = ()=>{

            if(!scene.end_condition){ // does not redo loop if end condition is satisfied;
            console.log('animation running');

            scene.clear_canvas(); // clears canvas

            scene.display_title('Find X & Y Coordinates'); // display title if desired

          

            // copy and pasted

            ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
            
            //scene.display_as_text('Finding X & Y Coordinates', 100, canvas.width - 500);
            plane.draw();

            // display target coordinates
            
            if(point_index < targetPoints.length){
                scene.display_title("(" + targetPoints[point_index].x.toString() + ", " + targetPoints[point_index].y.toString() + ")");
            }

            // display score
            scene.display_score();
            //scene.display_text_lines(["Score: " + scene.score.toString()], 100, 100);
            // scene.display_as_text("Score: " + score.toString(), 100, 100);
            
            // display soought point
            //next_button.draw();
            scene.display_next_button();

    
            

        
            // displays instructions if i is pressed
            if(scene.instructions_visible){scene.display_instructions();}
 
           requestAnimationFrame(loop); // start loop again
            }else{ // otherwise break the loop
                // cancelAnimationFrame(loop);
                // //scene.clear_canvas();
                // scene.ctx.fillStyle = '#333';
                // scene.ctx.fillRect(0,0,scene.canvas.width, 100);
                // scene.display_title('Complete!, Press Space to Continue');
                // remove_all_event_listeners();
            }
           
        }

        loop();// run loop   
    }

    return scene; // return scene object because this function returns an object 

}





export{build_scene};


