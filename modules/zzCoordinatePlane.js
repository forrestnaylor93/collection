// a coordinate plane class

//parameters:
    // Y ctx 
    // Y size of plane
    // Y step of x and y increments
    // Y location of plane


// functions
    // C alculate x_step_to_pixels
    // C calculate y_step_to_pixels
    // calculate line start and end points
    // draw y axis
    // draw x axis
    // draw vertical lines
    // draw horizontal lines

// sub classes
    // Line
        //parameters
            // Y start point
            // Y end point
            // Y is Axis?   
        //functions
            // Y draw line
            // highlight line
            // hide line
            // update line
            // if isAxis:
                //label Axis
    // Points
        // parameters
            // coordinates
            // color
            // transparency
            // size
        // functions
            // calculate xPos
            // calculate yPos
            // draw
            // updateColor
            // updateTransparency
            // updateCoordinates
            

class CoordinatePlane{
constructor(ctx, size = 'full', step = {x: 1, y:1}, location = {x:0, y:0}  ){
    this.ctx = ctx;


    // size and spacing

    //values in pixels
    this.size = size; // automatically set to 'full'
    this.height = 0; // pixel height is initialized to zero but determined by this.size before getting drawing in plane_dimension_to_pixels
    this.width = 0; // pixel width is initialized to zero but determined by this.size before being drawing in plane_dimension_to_pixels


    this.location = location; // location of frame - x,y corresponds to upper left corner
    this.location.x = location.x; 
    this.location.y = location.y;

    this.unit_size = 50; // size of unit set to 50 pixels
    this.unit_size_range = {
        min: 30,
        max: 50
    };

    this.margin_horizontal = 0; // determined by plane_dimensions_to_pixel
    this.margin_vertical = 0 // determined by plane_dimensions_to_pixel
   
    this.origin = { x: 0, y: 0}; // determined by plane_dimensions_to_pixel


    // relative values
    this.visual_center = {x:0, y:0};

    this.step = step;
        this.step.x = step.x;
        this.step.y = step.y;

    this.height_units = 0; // determined by plane_dimensions_to_pixels() - how many visual boxes will fit vertically within plane 
    this.width_units = 0; // determined by plane_dimension_to_pixels()  - how many visual boxes will fit horizontally within plane

    // objects contained
    this.points = [];
    this.lines = {
        vertical: [],
        horizontal: [],
        axes: [],
    }; // lines array starts with nothing

        // object tracking for delete and undeleting purposes
        this.created_object_sequence = [];
        this.deleted_objects = [];

    console.log('coordinate plane constructed');
}



plane_dimensions_to_pixels(){
    if(this.size == 'full'){

        // determine height and width of plane in pixels
        this.height = this.ctx.canvas.height;
        this.width = this.ctx.canvas.width;

        // determine how many visible units can appear in plane, must always odd numbers so origin can be centered
        this.height_units = Math.floor(this.height/this.unit_size); // sees how many units can fit in height
        if(this.height_units%2 == 0){
            this.height_units -=1;
        }

        this.width_units = Math.floor(this.width/this.unit_size); // sees how many units can fit in width
        if(this.width_units%2 == 0){
            this.width_units -=1;
        }

        // determine remaing space on margins
        this.margin_horizontal = this.width - this.width_units*this.unit_size;
        this.margin_vertical = this.height - this.height_units*this.unit_size;
    }

    //calculate origin
    this.origin.x = this.width/2;
    this.origin.y = this.height/2;
    this.visual_center.x = this.width/2;
    this.visual_center.y = this.height/2;
    console.log('initializing!');
   

}

//create sub objects

createLines(){

    // recalibrate width/height units if needed

    this.height_units = Math.floor(this.height/this.unit_size); // sees how many units can fit in height
        if(this.height_units%2 == 0){
            this.height_units -=1;
        }

    this.width_units = Math.floor(this.width/this.unit_size); // sees how many units can fit in width
        if(this.width_units%2 == 0){
            this.width_units -=1;
        }


    // horizontal lines

    // y-axis
    let yAxis = new Line(this.ctx, this.origin.x,this.location.y,this.origin.x, this.location.y + this.height, true);
    yAxis.draw();

    // x-axis
    let xAxis = new Line(this.ctx, this.location.x, this.origin.y, this.location.x + this.width, this.origin.y, true);
    xAxis.draw();

    // visual_center to origin offset

    let origin_center_offsetX = this.visual_center.x - this.origin.x;  // calculate offset for x
    let offset_unitsX = Math.floor(origin_center_offsetX/this.unit_size);


    let origin_center_offsetY = this.visual_center.y - this.origin.y;  // calculate offset for y
    let offset_unitsY = Math.floor(origin_center_offsetY/this.unit_size);


    //vertical lines
    let number_of_lines =  this.width_units; // determines how many lines total
    let line_number = Math.floor(number_of_lines/2)*-1; // half line numbers will be negative so line number is intialized at negative half the total to increment upwards

    for(line_number = line_number + offset_unitsX; line_number < number_of_lines/2 +2 + offset_unitsX; line_number++){
        let x_coordinate = this.origin.x + this.unit_size*line_number ;
        let line = new Line(this.ctx, x_coordinate, this.location.y, x_coordinate, this.location.y + this.height);
        this.lines.vertical.push(line);
    }

    // horizontal lines
    
    number_of_lines = this.height_units; // determines how many lines total
    line_number = Math.floor(number_of_lines/2)*-1; // half line numbers will be negative so line number is intialized at negative half the total to increment upwards
    for(line_number = line_number + offset_unitsY; line_number < number_of_lines/2 +2 + offset_unitsY; line_number++){
        let y_coordinate = this.origin.y + this.unit_size*line_number;
        let line = new Line(this.ctx, this.location.x, y_coordinate, this.location.x + this.width, y_coordinate);
        this.lines.horizontal.push(line);

    }

    // let margin_top = this.margin_vertical/2;

    // for(let line_number = 1; line_number <= this.height_units; line_number+=1){
    //     let line = new Line(
    //         this.ctx,
    //         this.location.x, this.location.y + this.unit_size*line_number + margin_top,
    //         this.location.x + this.width, this.location.y + this.unit_size*line_number + margin_top
    //     )
    //     this.lines.horizontal.push(line);
       
    // }

    // let margin_left = this.margin_horizontal/2;

    // // vertical lines
    // for(let line_number = 1; line_number <= this.width_units; line_number +=1){
    //     let line = new Line(
    //         this.ctx,
    //         this.location.x + this.unit_size*line_number, this.location.y, 
    //         this.location.x + this.unit_size*line_number, this.location.y+this.height);
    //     this.lines.vertical.push(line);
    // }
    
}

createaPointsFromCoords(){
    let xCoord = 3;
    let yCoord = 5;
    let xPos = this.origin.x + xCoord*this.unit_size;
    let yPos = this.origin.y - yCoord*this.unit_size;
    let point = new Point(this.ctx, xCoord, yCoord, xPos, yPos);
    this.points.push(point);
    //point.draw();
}

createPointsFromPos(xPos, yPos){
    let xCoord = (xPos-this.origin.x)/this.unit_size;
    let yCoord = (yPos - this.origin.y)/this.unit_size*-1;
    let point = new Point(this.ctx, xCoord, yCoord, xPos, yPos);
    this.points.push(point);
    this.created_object_sequence.push('point'); // let's undo system know last object created was point;
    //point.draw();
}

createPointsFromPos_round_to_half(xPos, yPos){
    let xCoord = (xPos-this.origin.x)/this.unit_size;
    let yCoord = (yPos - this.origin.y)/this.unit_size*-1;
    let point = new Point(this.ctx, xCoord, yCoord, xPos, yPos);
    console.log(point.xCoord, point.yCoord);
    point.coordX = Math.round(point.coordX*2)/2
    point.coordY = Math.round(point.coordY*2)/2

    point.posX = this.origin.x + point.coordX*this.unit_size;
    point.posY = this.origin.y - point.coordY*this.unit_size;

    this.points.push(point);
    this.created_object_sequence.push('point'); // let's undo system know last object created was point;
    //point.draw();
}

drawPoints(){
    this.points.forEach((point)=>{
        point.draw();
    })
}

updatePoints(){
    this.points.forEach((point)=>{
        point.posX = this.origin.x + point.coordX*this.unit_size;
        point.posY = this.origin.y - point.coordY*this.unit_size;
    })
}

// draw functions

// draw line


// draw origin
drawOrigin(){
    this.ctx.fillStyle = 'rgb(255,255,255,0.2';
    this.ctx.beginPath();
    this.ctx.ellipse(this.origin.x, this.origin.y, 10, 10, 0, 0, Math.PI*2);
    this.ctx.fill();
}

drawLines(){
    //draw horizontal lines
    this.lines.horizontal.forEach(line => line.draw());
    // draw vertical lines
    this.lines.vertical.forEach(line => line.draw());
}

drawAxes(){
    //draw X, y axes
    this.lines.axes.forEach(line => line.draw());
}

// console messages
console_messages(){
}

// initialize functions needed to initialize plane object
initialize(){
    this.plane_dimensions_to_pixels();
    this.createLines();
}

// recalibrate - similar to initialize, but does not reset origin to center of canvas if it has been panned
recalibrate(){
}


// functions that update the coordinate plane or the objects it holds
update(){
    this.change_unit_size();
    }

deleteAllObjects(){
    let deleted_array = this.points
    this.points = [];
    this.deleted_objects.push(deleted_array);
    
}


deleteLastObject(){
    if(this.created_object_sequence[this.created_object_sequence.length-1] == 'point'){
        let deleted_point = this.points.pop();
        this.deleted_objects.push(deleted_point);
        this.created_object_sequence.pop();
    }
}

undoLastDelete(){
    if(this.deleted_objects.length == 0){
        return;
    }
    let lastDeleted = this.deleted_objects.pop();
    if(lastDeleted[0] && lastDeleted[0].constructor.name == 'Point'){
        lastDeleted.forEach((point)=>{
            this.points.push(point);
        })
    }

    if(lastDeleted.constructor.name == 'Point'){
        this.points.push(lastDeleted);
        this.created_object_sequence.push('point');
    }
}
    
change_unit_size(change_amount = 5){
    if(
        this.unit_size < 100 &&
        this.unit_size > 10
        ){
        this.unit_size += change_amount*3;
        this.lines = {
            vertical: [],
            horizontal: []
        }; 
        //this.drawLines();
        //this.initialize();

        
    }
    if(this.unit_size > 100-1){this.unit_size = 100-1;}
    if(this.unit_size < 10+1){this.unit_size = 10+1}
        
    }

pan(pixels_per_push, orientation){
    if(orientation == 'horizontal')
    this.origin.x += pixels_per_push;
    this.lines = {
        vertical: [],
        horizontal: [],
        axex: []
    }
    if(orientation == 'vertical')
    this.origin.y += pixels_per_push;
    this.lines = {
        vertical: [],
        horizontal: [],
        axex: []
    }
    this.createLines();
    //this.display();
}

// functions that display the coordinate plane

display(){
    this.createLines();
    //this.createaPointsFromCoords();
    //this.createPointsFromPos(100,300);
    this.drawLines();
    
    this.drawPoints();
    this.updatePoints();
    //this.drawAxes();
    this.drawOrigin();
}


test(){
    //this.update();
    //this.initialize();
    this.display();
}

};

class Line{
    constructor(ctx, x, y, x1, y1, isAxis = false){
        this.ctx = ctx;
        this.x = x;
        this.x1 = x1;
        this.y = y;
        this.y1 = y1;
        this.isAxis = isAxis;
        this.transparency = 0.01;
        this.color = 'rgba(255,255,225,' + this.transparency + ")";
        this.lineWidth = 1;
        if(isAxis){this.lineWidth = 8};
    }




    draw(){
       // this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x1, this.y1);
        this.ctx.stroke();

    }
}


    // Points
        // parameters
            // coordinates
            // color
            // transparency
            // size
        // functions
            // calculate xPos
            // calculate yPos
            // draw
            // updateColor
            // updateTransparency
            // updateCoordinates

class Point{
    constructor(ctx, coordX, coordY, posX, posY, rgbvalue = 'rgba(0, 255, 255, 1)', transparency = 1, size = 5){
        this.ctx = ctx;
        this.color = rgbvalue;
        this.transparency = transparency;
        this.size = size;
        this.coordX =  coordX;
        this.coordY = coordY;
        this.posX = posX;
        this.posY = posY;
        this.showLabel = true;
    };

    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.ellipse(this.posX, this.posY, this.size, this.size, 0, 0, Math.PI*2 );
        this.ctx.fill();

        if(this.showLabel){
            this.drawLabel();
        }
        
    }

    drawLabel(){
        this.ctx.fillText("(" + Math.round(this.coordX*10)/10 +", " + Math.round(this.coordY*10)/10 + ")",this.posX + 5, this.posY + 15);
    }
}

export {CoordinatePlane};