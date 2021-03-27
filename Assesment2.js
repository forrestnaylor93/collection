import { Button } from "./modules/Button.js";
import {CoordinatePlane} from "./modules/CoordinatePlane.js";

class Assesment2{
    constructor(ctx){
        this.ctx = ctx;
        this.canvas = this.ctx.canvas;
        this.scenes = [];
        this.currentIndex = 0;
        this.currentScene = this.scenes[this.currentIndex];

        this.handle_next_scene_with_space();

        //this.handle_finished_scene();
    }


    handle_finished_scene = ()=>{
        this.canvas.addEventListener('keydown', (e)=>{
            if(this.currentScene.end_condition){
                this.next_scene();
                console.log('next scene')
            }
        })
    }

    handle_next_scene_with_space(){
        this.canvas.addEventListener('mouseup', (e)=>{
            if(this.currentScene.end_condition == true){
                this.next_scene();
            }
        })
    }

    start_assesment(){
        this.currentIndex = 0;
        this.run_scene();
    }

    run_scene(){
        this.currentScene = this.scenes[this.currentIndex];
        this.currentScene.contents();
    }

    next_scene(){
        console.log('next scene!')
        this.currentScene +=1;
        this.run_scene();
    }



    start_scene(){
        this.currentScene = this.scenes[this.currentIndex];
        this.currentScene.contents();
    }

    next_scene(){
        this.currentIndex += 1;
        if(this.currentIndex < this.scenes.length){
            this.start_scene(this.currentScene);
        }else{
            console.log('end of assesment')
        }
        
    }
}

class Scene{
    constructor(ctx){
        this.end_condition = false; // for ending scene
        this.is_task_complete = false; // for when user task finished - make a prompt for the next scene
        

        this.ctx = ctx;
        this.canvas = this.ctx.canvas;



        // screen sizing
        this.desired_scale = {x: 16, y: 9};
        this.actual_scale = {x: this.canvas.width, y: this.canvas.height};
        this.use_scale = {x:0, y:0};
        this.scaled_margin = {x: 0, y: 0};


        if(this.actual_scale.x/this.actual_scale.y > this.desired_scale.x/this.desired_scale.y){
            this.use_scale.x = this.actual_scale.x - ((this.actual_scale.x/this.actual_scale.y)-(this.desired_scale.x/this.desired_scale.y))*this.actual_scale.y;
            this.scaled_margin.x = this.actual_scale.x - this.use_scale.x; // get margin
            
    

            this.use_scale.y = this.actual_scale.y;
            // console.log("actual scale: ", this.actual_scale);
            // console.log("use scale: ", this.use_scale);
        }
        if(this.actual_scale.y/this.actual_scale.x > this.desired_scale.y/this.desired_scale.x){
            this.use_scale.y = this.actual_scale.y - ((this.actual_scale.y/this.actual_scale.x)-(this.desired_scale.y/this.desired_scale.x  ))*this.actual_scale.x;
            this.scaled_margin.y = this.actual_scale.y - this.use_scale.y; // get margin
            this.use_scale.x = this.actual_scale.x;

            // console.log("actual scale: ", this.actual_scale);
            // console.log("use scale: ", this.use_scale);  
        }

        this.scaled_units = {x:this.use_scale.x/16, y:this.use_scale.y/9};

        //this.size_canvas_for_16_9_scale();


        //this.screen_scale = {x:16, y:9};
        //this.screen_units = {x: this.canvas.width/16, y: this.canvas.width/9};

        
        this.instructions = null;
        this.contents = null;
        this.loop = null;
        this.instructions_visible = false;
        this.review_on = false;
        this.ready_to_answer = false;
        this.review_assets = [];
        this.other_assets = [];
        this.slope = null;
        this.next_question = true;
        this.question_object = null;
        this.start = null;
        this.end = null;
        this.animation_loop = ()=>{console.log('empty animation loop')}

        // score
        this.score = 0;
        this.score_needed = 10;

        // event listeners
        
        this.mousedown = [];
        this.mouseup = [];
        this.mousemouve = [];
        this.keydown = [];
        this.Enter = [];
        this.Space = [];
        this.KeySpecific = [];


        this.trueEnter = []
        this.trueSpace = [];
    



        


        // style
        this.instruction_background_color = "#333";
        this.color = "#ccc";
     
        this.font_size = this.scaled_units.y/4;
        this.font = this.font_size.toString()+'px Arial';
        this.headline_font_size = this.font_size*2;
        this.headline_font = this.headline_font_size.toString()+'px Arial';
        this.line_spacing = 1.7

        //obj
        // set plane unit size so there are 8 units horizontal and 6 units vertical
        this.button_width = this.use_scale.x/14;
        this.button_height = this.use_scale.y/14;
        this.next_button = new Button(ctx, 'Next', this.make_smu_x(1) - this.button_width - 10, this.make_smu_y(0.01), this.button_width,this.button_height);
        this.next_button.font_size = this.font_size;
        this.next_button.on_click = () => {
            if(this.is_task_complete){this.end_condition = true}
        };
        this.display_next_button = ()=>{
            if(this.is_task_complete){
                this.next_button.draw();
            }
        }
        this.buttons = [];

        window.addEventListener('resize', this.resize())



    }
    resize = ()=>{
        console.log('resize');
    }
    make_plane = ()=>{
        this.plane = new CoordinatePlane(this.ctx, this.make_smu_x(0.1), this.make_smu_y(0.1),this.make_smu_x(0.9),this.make_smu_y(0.9));
        let plane_width = this.use_scale.x*0.8;
        let unit_size = plane_width/17;
        this.plane.reset_unit_size(unit_size);
    }

    frame_use_scale = ()=>{
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = '#ccc';
        let posX = this.scaled_margin.x/2;
        let posY = this.scaled_margin.y/2
        this.ctx.strokeRect(posX,posY,this.use_scale.x, this.use_scale.y);
    }

    size_canvas_for_16_9_scale = ()=>{
        this.canvas.marginLeft = this.scaled_margin.x/2;
        this.canvas.marginTop = this.scaled_margin.y/2;
    }


    // make scaled_margin_unit for values 0-1 

    make_smu_x = (value)=>{  
        let smu = value*this.use_scale.x + this.scaled_margin.x/2;
        return smu;
    } 

    make_smu_y = (value)=>{
        let smu = value*this.use_scale.y+ this.scaled_margin.y/2;
        return smu;
    }

    add_all_listeners = ()=>{
        this.keydown.forEach((listener)=>{
            this.canvas.addEventListener('keydown', listener)
        })


        // add Enter listeners
        this.Enter.forEach((listener)=>{
            let enter_listener = (e)=> {if(e.key == 'Enter'){listener(e)}}
            this.canvas.addEventListener('keydown', enter_listener)
        })

        // add space listeners
        this.Space.forEach((listener)=>{
            let space_listener = (e)=> {if(e.key == ' '){listener(e)}}
            this.canvas.addEventListener('keydown', space_listener);
            this.trueSpace.push(space_listener);

        })


    }

    remove_all_listeners = ()=>{
        this.keydown.forEach((listener)=>{
            // keydown
            this.canvas.removeEventListener('keydown', listener)

            // remove space listeners
            this.trueSpace.forEach((listener)=>{
                this.canvas.removeEventListener('keydown', listener)
            });

        })
    }

    display_time = ()=>{
        let now = new Date();
        let diff = this.start - now;
        //let elapsed = now - this.start;
        //console.log('time since start: ' + elapsed.toString());
        //console.log(this.start - now);
        let time = Math.round(Math.abs(diff)/1000);
        let minutes = Math.floor(time/60);
        let seconds = time%60;
        this.ctx.fillStyle = '#ccc';
        this.ctx.font = '60px Arial'
        this.display_text_lines(['total time: ' + minutes + ' : ' + seconds], this.make_smu_x(0.1), this.make_smu_y(0.95));
        //console.log(time);
        
       // return time;

    }


    clear_canvas(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    }

    set_background(color = this.instruction_background_color){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);

    }

    display_title(title){
        //headline
        this.ctx.fillStyle = this.color;
        this.ctx.font = this.headline_font;
        let width_diff = this.ctx.measureText(title).width;
        this.ctx.fillText(title, this.make_smu_x(0.5) - width_diff/2, this.make_smu_y(.06));
    }

    display_text_lines(lines, x=null, y=null){
        this.ctx.font = this.font;
        
        let xPos = this.make_smu_x(0.1);
        let yPos = this.make_smu_y(0.2);
        if(x){xPos = x};
        if(y){yPos = y};
        

        lines.forEach((line, index)=>{
            if(typeof(line) != 'string'){
                console.log('argument for display_text() needs to be array for display text')
                console.log(line);
            }
            this.ctx.fillText(line, xPos, yPos)
            yPos += this.line_spacing*this.font_size
        })
    }

    display_instructions(){
        // background
        this.set_background();
        // //headline
        this.display_title(this.instructions.headline + " - Instructions");

        //lines
        this.display_text_lines(this.instructions.lines)

        this.display_score();
        this.display_time();
    }

    display_score(){
        if(this.score_needed != 0){
            this.ctx.fillStyle = '#ccc';
            this.display_text_lines(['Score: '+ this.score+ ' out of '+ this.score_needed + ' points.'], 50, this.canvas.height - 50);
        }
    }

    handle_instructions = ()=>{
        this.canvas.addEventListener('keydown', (e)=>{
            if(e.code == 'KeyI'){
                //toggle instruction value
                //console.log('instructions accessed')
                if(this.instructions_visible){
                    this.instructions_visible = false;
                }else{
                    this.instructions_visible = true;
                }
            }
        })
    }


}

class Instructions{
    constructor(headline, lines){
        this.headline = headline;
        this.lines = lines;
    }
}

export{Assesment2, Scene, Instructions}