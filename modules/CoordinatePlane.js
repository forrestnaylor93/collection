import {HighlightedArea} from './CoordinatePlaneUtils/HiglightedArea.js';
//import {add_event_listeners} from './CoordinatePlaneUtils/events.js';

// from drag and drop get coordinate frame area


//create drag and select area function for plane



class CoordinatePlane{
    constructor(ctx, x = 0, y = 0, x1 = 0, y1 = 0){
        // modes
            this.grid_highlight_mode = false;
            this.point_mode = false;
        //styles
               // border
               this.borderColor = '#ccc';
               this.borderWidth = 5;
               this.highlight_color = 'green';
               this.grid_color = '#ccc';
               this.number_color = '#ccc'
               this.x_axis_color = '#ccc';
               this.y_axis_color = "#ccc";
               this.highlighted_grid_color = "limegreen";
               this.highlighted_grid_width = 2;
               this.origin_color = 'orange'

               // points
               this.point_color = 'orange';
               this.point_size = 5;

               // lines
               this.line_color_rotation = ['cyan', 'fuchsia', 'yellow', 'limegreen', 'orange']

               this.selected_point_color = 'cyan';
               //this.selected_point_size = this.point_size*2;

               // numbers
               this.axis_number_font_size = 12;

        // booleans
        this.highlight_on = false;
        this.axis_numbers_on = true;
        //this.is_moveable = false;
        //this.is_resizeable = false; 
        this.active_resizing = false;
        this.is_mouse_on = false;
        this.is_grid_visible = true;

        // more than booleans
        this.movement_status = 'none'  // none, ready, moving
        this.resize_status = 'none' // none, ready, resizing


        // values given at initializiation
        this.ctx = ctx;
        this.canvas = this.ctx.canvas;
        this.layer = 0; 
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
        this.color = 'rgba(255,0,0,0.5)';
        this.unit_size = 40;

        this.width = this.x1 - this.x;
        this.height = this.y1 - this.y;

        this.visual_center = {
            x_px: this.x + this.width/2,
            y_px: this.y + this.height/2
        }

        // objects created at initialization

        this.origin = new Origin(0, 0, this.origin_color, 7, 0, 0 );
        this.cornerPoints = [];

        // create gridlines
       
        
        // measurements object
        this.m = {
            x: this.calculate_unit_measurements_x(),
            y: this.calculate_unit_measurements_y(),
        }


        // clientValues
        this.clientX = 0;
        this.clientY = 0;
        
        //this.interactive();
        this.interactive();

        this.gridlines = {vertical: [], horizontal:[]}
        this.create_gridlines();
        this.points = [];
        this.lines = [];
        this.removed_objects = [];

    
    }

    re_measure = ()=>{
        this.m = {
            x: this.calculate_unit_measurements_x(),
            y: this.calculate_unit_measurements_y(),
        }
        this.gridlines = {vertical: [], horizontal:[]}
        this.create_gridlines();
    }

    reset_unit_size = (new_unit_size)=>{
        this.unit_size = new_unit_size;
        this.re_measure();
    }


    draw(){
        this.update();
        this.drawOutline();
        this.gridlines.vertical.forEach((line)=>{this.drawGridline(line)});
        this.gridlines.horizontal.forEach((line)=>{this.drawGridline(line)});
        
        this.lines.forEach((line)=>{this.drawGridline(line)});
        this.drawPoint(this.origin);
        this.points.forEach((point)=>{this.drawPoint(point)});
       // this.drawPoint(this.testPoint);
       if(this.highlight_on){this.highlight_plane();}
       if(this.resize_status == 'ready' ){this.display_resizing_markers();} 
    }
        drawOutline(){
            this.ctx.lineWidth = this.borderWidth;
            this.ctx.strokeStyle = this.borderColor;
            this.ctx.beginPath();
            this.ctx.strokeRect(this.x, this.y, this.width, this.height);
            this.ctx.stroke();

        }

        drawGridline(line){
            let x_px = this.x_unit_to_px(line.x);
            let y_px = this.y_unit_to_px(line.y);
            let x1_px = this.x_unit_to_px(line.x1);
            let y1_px = this.y_unit_to_px(line.y1);

            this.ctx.lineWidth = line.lineWidth;
            //console.log(line.color);
            this.ctx.strokeStyle = line.color//line.color;
            this.ctx.globalAlpha = line.transparency;
            if(line.is_mouse_on){
                this.ctx.strokeStyle = this.highlighted_grid_color;
                this.ctx.lineWidth = this.highlighted_grid_width;
                this.ctx.globalAlpha  = 1; 
            }
            this.ctx.beginPath();
            this.ctx.moveTo(x_px, y_px);
            
            this.ctx.lineTo(x1_px, y1_px);
            this.ctx.stroke();
            this.ctx.globalAlpha = 1

            this.drawAxisNumbers(line);

            
        }

        create_slope_line = (slope)=>{
           // console.log(this.m)
            let line_x = this.m.x.min_unit;
            let line_y = line_x*slope;

            let line_x1 = this.m.x.max_unit;
            let line_y1 = line_x1*slope;

            if(line_y < this.m.y.min_unit){
                line_y = this.m.y.min_unit;
                line_x = line_y/slope

                line_y1 = this.m.y.max_unit;
                line_x1 = line_y1/slope;


            }
            if(line_y > this.m.y.max_unit){
                line_y = this.m.y.max_unit;
                line_x = line_y/slope;

                line_y1 = this.m.y.min_unit;
                line_x1 = line_y1/slope;
            }

            let line = new Line(line_x, line_y, line_x1, line_y1, 'limegreen', 3);

            this.lines.push(line);
            
        }


        drawLine(line){
            let x_px = this.x_unit_to_px(line.x);
            let y_px = this.y_unit_to_px(line.y);
            let x1_px = this.x_unit_to_px(line.x1);
            let y1_px = this.y_unit_to_px(line.y1);

            this.ctx.lineWidth = line.lineWidth;
            this.ctx.strokeStyle = line.color;
            this.ctx.globalAlpha = line.transparency;
            if(line.is_mouse_on){
                this.ctx.strokeStyle = line.color;
                this.ctx.lineWidth = line.lineWidth * 2;
                this.ctx.globalAlpha  = 1; 
            }
            this.ctx.beginPath();
            this.ctx.moveTo(x_px, y_px);
            
            this.ctx.lineTo(x1_px, y1_px);
            this.ctx.stroke();
            this.ctx.globalAlpha = 1

            this.drawAxisNumbers(line);

            
        }

        drawPoint(point){
            // draws a point on canvas based on origin location relative to visual center and unit size of plane
            let x_px = this.x_unit_to_px(point.x);
            let y_px = this.y_unit_to_px(point.y);
            
            //this.ctx.lineWidth = point.size;
            this.ctx.fillStyle = point.color;

            // selected points
            if(point.is_selected){
                this.ctx.fillStyle = this.selected_point_color;
            }
            
            this.ctx.beginPath();
            this.ctx.ellipse(x_px, y_px, point.size, point.size, 0, Math.PI*2,0);
            this.ctx.fill();

        } 
   
        highlight_plane(){
            this.ctx.fillStyle = this.highlight_color;
            this.ctx.globalAlpha = 0.4;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
            this.ctx.globalAlpha = 1;
        }


        drawAxisNumbers(line){
            let x_px = this.x_unit_to_px(line.x);
            let y_px = this.y_unit_to_px(line.y);
            let x1_px = this.x_unit_to_px(line.x1);
            let y1_px = this.y_unit_to_px(line.y1);
            //draw along x axis
            if(line.x == line.x1){
                //if(line.x == 0){return};
                this.ctx.fillStyle = this.number_color;
                this.ctx.font = this.axis_number_font_size.toString() + 'px monospace';

                let number = line.x.toString();
                let number_width = this.ctx.measureText(number).width;
                let hyphen_width = this.ctx.measureText('-').width;
                let origin_y = this.y_unit_to_px(0);

                let x_pos = x_px - number_width/2;
                if(line.x < 0){
                    x_pos -= hyphen_width/2;
                }
                if(line.x == 0){x_pos -= number_width};
                let y_pos = origin_y + this.axis_number_font_size*2;

                if(line.x < 0){

                }
                
               
                this.ctx.fillText(number, x_pos, y_pos );
            }

            // draw along y-axis
            if(line.y == line.y1){
                if(line.y == 0){return};
                this.ctx.fillStyle = this.number_color;
                this.ctx.font = this.axis_number_font_size.toString() + 'px monospace';

                let number = line.y.toString();
                let number_width = this.ctx.measureText(number).width;
                let negative_sign_width = this.ctx.measureText('-').width;
                //let number_height = this.ctx.measureText(number).height;
                let origin_x = this.x_unit_to_px(0);
                let xPos = 0;
                if(line.x >= 0){xPos = origin_x - number_width - this.axis_number_font_size}
                if(line.x < 0){xPos = origin_x - number_width + negative_sign_width - this.axis_number_font_size };
                let yPos = y_px;
                

                this.ctx.fillText(number, xPos , yPos + this.axis_number_font_size/2.5);

            }
        }

        



    update(){
       // console.log('update')
       // this.create_gridlines();

    }
        update_visual_center(){
            this.visual_center = {
                x_px: this.x + this.width/2,
                y_px: this.y + this.height/2
            }
        }

        update_origin_offSet(){

        }
        update_on_move(){
            this.x1 = this.x + this.width;
            this.y1 = this.y + this.height;

            this.visual_center = {
                x_px: this.x + this.width/2,
                y_px: this.y + this.height/2
            }
        }

        update_on_resize(){
              
        }

        create_gridlines(){
            //clear gridlines
            this.gridlines = {vertical: [], horizontal:[]}

            // vertical lines
            let left_most_line_x = Math.ceil(this.m.x.min_unit);
            for(let x = left_most_line_x; x < this.m.x.max_unit; x++){
                let line = new Line(x, this.m.y.min_unit, x, this.m.y.max_unit, this.grid_color, 1);
                line.transparency =  0.4; 
                if(line.x == 0){line.lineWidth = 3; line.transparency = 1; line.color = this.y_axis_color}
                this.gridlines.vertical.push(line);
            }

            //horizontal lines
            let bottom_line_y = Math.ceil(this.m.y.min_unit);
            for (let y = bottom_line_y; y < this.m.y.max_unit; y ++){
                let line = new Line(this.m.x.min_unit, y, this.m.x.max_unit, y, this.grid_color, 1);
                line.transparency =  0.4; 
                if(line.y == 0){line.lineWidth = 3; line.transparency = 1; line.color = this.x_axis_color}
                this.gridlines.horizontal.push(line);
            }

        //update_gridlines(){}

            
}
        // update_gridlines(){
        //     this.gridlines.vertical.forEach((line)=>{
        //         line.y = this.m.y.min_unit;
        //         line.y1 = this.m.y.max_unit;
        //     })
        // }


    calculate(){
        this.calculate_units(); 
    }


        calculate_units(){
        }
            calculate_unit_measurements_x(){
                let total_units = this.width/this.unit_size;
                let whole_units = Math.floor(this.width/this.unit_size);
                let remaining_units = total_units - whole_units;

                let x_offset_units = this.origin.offset_x_px/this.unit_size;
                let x_min_un = -x_offset_units - total_units/2;
                let x_max_un = -x_offset_units + total_units/2;

                return{
                    total_units: total_units,
                    whole_units: whole_units,
                    remaining_units: remaining_units,
                    min_unit: x_min_un,
                    max_unit: x_max_un
                }

            }
            calculate_unit_measurements_y(){
                let total_units = this.height/this.unit_size;
                let whole_units = Math.floor(this.height/this.unit_size);
                let remaining_units = total_units - whole_units;

                let y_offset_units = this.origin.offset_y_px/this.unit_size;
                let y_min_un = -y_offset_units - total_units/2;
                let y_max_un = -y_offset_units + total_units/2;

                return{
                    total_units: total_units,
                    whole_units: whole_units,
                    remaining_units: remaining_units,
                    min_unit: y_min_un,
                    max_unit: y_max_un 
                }




            }

        point_to_px(point){
            let x_px = this.x_unit_to_px(point.x);
            let y_px = this.y_unit_to_px(point.y);

            if(point.x1 && point.y1){
                let x1_px = this.x_unit_to_px(point.x1);
                let y1_px = this.y_unit_to_px(point.y1);

                return {
                    x_px: x_px,
                    y_px: y_px,
                    x1_px: x1_px,
                    y1_px: y1_px
                }
            }else{
                return {
                    x_px: x_px,
                    y_px: y_px
                }
            }
        }
        
            x_unit_to_px(unit){
                let origin_x_px = this.visual_center.x_px + this.origin.offset_x_px;
                let unit_x_px = origin_x_px + unit*this.unit_size;
                return unit_x_px; 
            }

            y_unit_to_px(unit){
                let origin_y_px = this.visual_center.y_px  - this.origin.offset_y_px;
                let unit_y_px = origin_y_px - unit*this.unit_size;
                return unit_y_px; 
            }

            x_px_to_unit(px){
                let origin_x_px = this.visual_center.x_px + this.origin.offset_x_px;
                let dist_from_origin_x_px = px - origin_x_px;
                let x_unit = dist_from_origin_x_px/this.unit_size;

                return x_unit;
            }

            y_px_to_unit(px){
                let origin_y_px = this.visual_center.y_px  - this.origin.offset_y_px;
                let dist_from_origin_y_px =  origin_y_px - px;
                let y_unit = dist_from_origin_y_px/this.unit_size;

                return y_unit;
            }


            zoom_in = ()=>{
                let unit_max = 500;
                if(this.unit_size > unit_max){ return};
                this.reset_unit_size(this.unit_size*1.05);
            }

            zoom_out = ()=>{
                let unit_min = 10;
                if(this.unit_size < unit_min){ return};
                this.reset_unit_size(this.unit_size*0.95);
            }


            origin_left = (pixels_left)=>{
                this.origin.offset_x_px += pixels_left;
                this.re_measure();
            }

            origin_right = (pixels_right)=>{
                this.origin.offset_x_px -= pixels_right;
                this.re_measure();
            }

            origin_up = (pixels_up)=>{
                this.origin.offset_y_px -= pixels_up;
                this.re_measure();
            }

            origin_down = (pixels_down)=>{
                this.origin.offset_y_px += pixels_down;
                this.re_measure();
            }

/// ShiftLeft
            keydown_shift_listeners= (e) =>{
                  // resizing
                  //console.log('doing_shift')
                  if(e.code == 'ShiftLeft' && this.is_mouse_on ){
                    this.resize_status = 'ready'// make resize state ready
                    // this.highlight_color = 'orange';
                    // this.highlight_on = true;
                    this.display_resizing_markers();
                }
            }

            keyup_shift_listeners = (e)=>{
                
                //resize
                if(e.code == 'ShiftLeft'){
                    this.resize_status = 'none';
                    this.highlight_on = false;
                    this.borderColor = 'white';
                }
            }
/// Space
            keydown_space_listeners = (e)=>{
                   // movement
                   if(e.code == 'Space' && this.is_mouse_on && this.movement_status == 'none'){
                    
                    this.movement_status = 'ready'// make move state to ready
                    this.highlight_color = 'green';
                    this.highlight_on = true;
                }
                if(
                    e.code == 'Space' &&
                    this.is_mouse_on
                    ){
                    this.highlight_on = true;
                } 
            }

            keyup_space_listeners = (e)=>{
                //movement
                if(e.code == 'Space'){
                    this.movement_status = 'none';
                    this.highlight_on = false;
                }
            }
/// general keydown
            keydown_general = (e)=>{
                if(e.shiftKey){
                    switch(e.code){
                        case "KeyP":
                            this.make_point_at_cursor_rounded_to_whole_unit();
                            
                        break;
                        case "Backspace":
                            this.remove_all_points();
                        break;
                        case "KeyZ":
                            this.replace_last_removed_object();
                        default:
                    }
                }else{
                    switch(e.code){
                        case "KeyP":
                            this.make_point_at_cursor();
                            
                        break;
                        case "Backspace":
                            this.remove_last_point();
                        break;
                        case "KeyZ":
                            this.replace_last_removed_object();
                        break;
                        case "KeyL":
                            this.make_line();
                        break;
                        case "KeyA":
                            if(this.is_mouse_on){
                            this.origin_left(30);}
                        break;
                        case "KeyD":
                            if(this.is_mouse_on){
                            this.origin_right(30);}
                        break;
                        case "KeyW":
                            if(this.is_mouse_on){
                            this.origin_up(30);}
                        break;
                        case "KeyS":
                            if(this.is_mouse_on){
                            this.origin_down(30);}
                        break;
                        default:
                    }
                }
                
            }
/// mouse down
            mousedown_listeners = (e)=>{
                //movement
                  // movement
                if(this.movement_status == 'ready'){
                      this.movement_status = 'active'
                }
                //
                if(this.resize_status == 'ready'){
                   
                    this.cornerPoints.forEach((point) =>{
                        if(point.is_mouse_on){
                            this.resize_status = 'active';
                      
                        }
                    })
                    
                }

                this.select_point();

            }
/// mouse move
            mousemove_listeners = (e)=>{
                // track mouse and checks if mouse is over coord plane
                this.clientX = e.clientX;
                this.clientY = e.clientY;
                this.check_mouse_over_plane();

                // if not over a panel, will not hightlight said panel
                if(!this.is_mouse_on){
                    this.highlight_on = false;
                }
                //this.check_mouse_on_point();
                this.check_mouse_on_points(this.points);

                // ends ready status for movement and resize if off plane
                if(!this.is_mouse_on){
                    this.movement_status = 'none';
                    //this.resize_status = 'none';
                }

                //movement
                if(this.movement_status == 'active'){
                    this.move_plane(e);
                }

                //resizing
                if(this.resize_status == 'active'){
                    this.resize(e);
                    this.create_gridlines();
                    this.borderColor = 'limegreen';
                }
            }
//// mouse up
            mouseup_listeners = (e)=>{
                //movement
                this.movement_status = 'none';

                //resize
                this.resize_status = 'none'

                // highlgiht
                this.highlight_on = false;

                // this.is_moveable = false;
            }

            wheel_listeners = (e)=>{
                //console.log(e)
                if(!this.is_mouse_on){return}
                if(e.deltaY < 0){
                    this.zoom_in();
                }
                if(e.deltaY > 0){
                    this.zoom_out();
                }
            }

  




        interactive(){
            this.canvas.addEventListener('keydown', this.keydown_shift_listeners);
            this.canvas.addEventListener('keyup', this.keyup_shift_listeners)
            this.canvas.addEventListener('keydown', this.keydown_space_listeners);
            this.canvas.addEventListener('keyup', this.keyup_space_listeners);

            this.canvas.addEventListener('mousedown', this.mousedown_listeners); 

            this.canvas.addEventListener('mousemove', this.mousemove_listeners); 

            this.canvas.addEventListener('mouseup', this.mouseup_listeners); 

            this.canvas.addEventListener('keydown', this.keydown_general);
            
            this.canvas.addEventListener('wheel', this.wheel_listeners )

        }

        remove_all_listeners(){
            this.canvas.removeEventListener('keydown', this.keydown_shift_listeners);
            this.canvas.removeEventListener('keyup', this.keyup_shift_listeners) 
            this.canvas.removeEventListener('keydown', this.keydown_space_listeners);
            this.canvas.removeEventListener('keyup', this.keyup_space_listeners);

            this.canvas.removeEventListener('mousedown', this.mousedown_listeners); 

            this.canvas.removeEventListener('mousemove', this.mousemove_listeners); 

            this.canvas.removeEventListener('mouseup', this.mouseup_listeners); 

            this.canvas.removeEventListener('keydown', this.keydown_general);
        }
    
        resize(e){
            let currentPoint = 0;
            // this.cornerPoints.forEach((point) =>{
            //     if(point.is_mouse_on){
            //         currentPoint = point;
            //     }

            this.display_resizing_markers();

            this.cornerPoints.forEach((point)=>{
                if(point.is_mouse_on){
                    currentPoint = point;
                }
            })

            // upperleft point
            if(currentPoint.x == this.m.x.min_unit && currentPoint.y == this.m.y.max_unit){
            this.x += e.movementX;
            this.y += e.movementY;

            this.width -= e.movementX;
            this.height -= e.movementY;
            }

            // uperright point
            if(currentPoint.x == this.m.x.max_unit && currentPoint.y == this.m.y.max_unit){
            this.x1 += e.movementX;
            this.y += e.movementY;
            
            this.width += e.movementX;
            this.height -= e.movementY;
            }

            // lowerleft point
            if(currentPoint.x == this.m.x.min_unit && currentPoint.y == this.m.y.min_unit){
            this.x += e.movementX;
            this.y1 += e.movementY;
            
            this.width -= e.movementX;
            this.height += e.movementY;
            }

            // lowerright point
            if(currentPoint.x == this.m.x.max_unit && currentPoint.y == this.m.y.min_unit){
                this.x1 += e.movementX;
                this.y1 += e.movementY;
                
                this.width += e.movementX;
                this.height += e.movementY;
                }

            
            
            

            

            //updates
            this.origin.offset_x_px -= e.movementX/2; 
            this.origin.offset_y_px += e.movementY/2;
            
            
            
            
            
            this.update_visual_center();
            this.m = {
                x: this.calculate_unit_measurements_x(),
                y: this.calculate_unit_measurements_y(),
            }

            
        }


    // movement of plane


    move_plane(e){
        this.x += e.movementX;
        this.y += e.movementY;
        this.update_on_move();
        this.create_gridlines(); 
    } 

    // move plane
  

   

    // resizing plane
 

    display_resizing_markers(){

        //create corner points and push to corner points array
        //if(!this.is_resizeable){return}; // only calculate when resizing with shift key
        this.cornerPoints = [];
        let upperLeft = new Point(this.m.x.min_unit, this.m.y.max_unit, 'rgba(0,255,0,0.4)', this.point_size*4);
        this.cornerPoints.push(upperLeft);
        let upperRight = new Point(this.m.x.max_unit, this.m.y.max_unit, 'rgba(0,255,0,0.4)', this.point_size*4);
        this.cornerPoints.push(upperRight);
        let lowerLeft = new Point(this.m.x.min_unit, this.m.y.min_unit, 'rgba(0,255,0,0.4)', this.point_size*4);
        this.cornerPoints.push(lowerLeft);
        let lowerRight = new Point(this.m.x.max_unit, this.m.y.min_unit, 'rgba(0,255,0,0.4)', this.point_size*4);
        this.cornerPoints.push(lowerRight);

        this.check_mouse_on_points(this.cornerPoints);
        this.cornerPoints.forEach((point)=>{
            if(point.is_mouse_on){
                point.color = 'limegreen';
                //this.resize_status = 'active';
            }
        })

        this.cornerPoints.forEach(point => this.drawPoint(point));

    }



        

            check_mouse_over_plane(){
                if(
                    this.clientX > this.x+5 &&
                    this.clientX < this.x1-5 &&
                    this.clientY > this.y+5 &&
                    this.clientY < this.y1-5 
                ){this.is_mouse_on = true;}else{
                    this.is_mouse_on = false;
                }
                
            }



    check_mouse_on_points(pointArray){
        pointArray.forEach(point=>this.check_mouse_on_point(point));
    }

    check_mouse_on_point(point){
        let pixels = this.point_to_px(point);
        let x_difference = this.clientX - pixels.x_px;
        let y_difference = this.clientY - pixels.y_px;
        let distance = Math.sqrt(x_difference**2 + y_difference**2);
        if(distance < point.size + 5){
            point.is_mouse_on = true;
            point.size = this.point_size*2;
            console.log('mouse on a point!');
        }else{
            point.is_mouse_on = false;
            point.size = this.point_size;
        }
        
    }

    // modes
  
        // console.log

        make_point(x, y){
            let point = new Point(x, y, this.point_color, this.point_size);
            this.points.push(point);
        }
        make_point_at_cursor(){
            let xCoord = this.x_px_to_unit(this.clientX);
            let yCoord = this.y_px_to_unit(this.clientY);
            let point = new Point(xCoord, yCoord, this.point_color, this.point_size);
            this.points.push(point);
        }

            make_point_at_cursor_rounded_to_whole_unit(){
                this.make_point_at_cursor();
                let lastpoint = this.points[this.points.length-1];
                lastpoint.x = Math.round(lastpoint.x);
                lastpoint.y = Math.round(lastpoint.y);
            }

        remove_last_point(){
            let last_point = this.points.pop();
            this.removed_objects.push(last_point);
        }

        remove_all_points(){
            let last_points = this.points;
            this.removed_objects.push(last_points);
            this.points = [];
        }

        replace_last_removed_object(){

            let last_removed_object = this.removed_objects.pop();
            let type = last_removed_object.constructor.name;
            switch(type){
                case 'Point':
                    this.points.push(last_removed_object);
                break;
                case 'Array':
                    let array_type = last_removed_object[0].constructor.name;
                    switch(array_type){
                        case 'Point':
                            this.points.push(...last_removed_object);
                        break;
                        default:
                    }
                default:
            }
        }

        select_point(){
            this.points.forEach((point)=>{
                if(point.is_mouse_on){
                    this.toggle_selection(point);
                    console.log('point selected!')
                }
            })
        }
            toggle_selection(point){
                if(point.is_selected){
                    point.is_selected = false;
                }else{
                    point.is_selected = true;
                }
            }

        make_line(){
            let selected_points = [];
            this.points.forEach((point)=>{
                if(point.is_selected){
                    selected_points.push(point);
                };
            })
            if(selected_points.length != 2){
                window.alert('wrong number of selected points to make line!')
                return;
            }else{
                let line = new Line(selected_points[0].x, selected_points[0].y, selected_points[1].x, selected_points[1].y, 'cyan', 5)
                this.lines.push(line);
                selected_points.forEach((point)=>{point.is_selected = false});
                console.log(line);
            }
             
        }

 
};

class Point{
    constructor(x = 0, y = 0, color = 'white', size = 5){
        this.x = x; // in coordinates
        this.y = y; // in coordinates
        this.color = color;
        this.size = size;
        this.transparency = 0.8;
        this.is_mouse_on = false;
        this.is_selected = false;
    }
}

class Origin extends Point{
    constructor(x = 0, y = 0, color = 'white', size = 5, offset_x_px = 0, offset_y_px = 0 ){
        super(x, y, color, size);

        this.offset_x_px = offset_x_px;
        this.offset_y_px = offset_y_px;

    }

}

class Line{
    constructor(x = 0, y = 0, x1 = 0, y1 = 0, color = 'gray', lineWidth = 1){
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
        this.color = color;
        this.lineWidth = lineWidth;
        this.transparency = 1;
        this.is_mouse_on = false;
    }
}

class Axis extends Line{
    constructor(x = 0, y = 0, x1 = 0, y1 = 0, color = 'limegreen', lineWidth = 1){
        super(x, y, x1, y1, color, lineWidth );

        this.arrows = false;
    }
}

export {CoordinatePlane};