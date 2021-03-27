class Button{
    constructor(ctx, label, x, y, width, height){
        this.ctx = ctx;
        this.canvas = this.ctx.canvas;
        this.label = label;
        this.x = x;
        this. y = y;
        this.width = width;
        this.height = height;
        this.on_color = 'green';
        this.off_color = '#ccc';
        this.is_mouse_on = false;
        this.font_size = 30;
        this.font = this.font_size.toString() + "px Arial";
        this.text_color = '#ccc';
        this.border_width = 5;
        this.off_opacity = 0.7;
        this.clicked = false;
        this.end_condition = null
        this.on_click = null;



        this.canvas.addEventListener('mousemove', (e)=>{
            if(e.clientX > this.x &&
                e.clientX < this.x + this.width &&
                e.clientY > this.y &&
                e.clientY < this.y + this.height){
                   this.is_mouse_on = true;// console.log('is on!')
                }else{
                    this.is_mouse_on = false;
                }
                //console.log(this.is_mouse_on)
        })

        

        this.canvas.addEventListener('mousedown', (e)=>{
            if(this.is_mouse_on){
                this.clicked = true;
                this.on_click();
            }
        })
    }

    on_click = (end_condition)=>{
        //console.log(this.end_condition)
        end_condition = true;
    };

   

    satisfy_end_condition = (end_condition)=>{
        end_condition = true;
    }

    draw(){
        if(this.is_mouse_on){
            this.ctx.globalAlpha = 1;
            this.ctx.fillStyle = this.on_color;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
            
        }else{
            this.ctx.globalAlpha = this.off_opacity;
        }
        
        this.ctx.strokeStyle = this.off_color;
            this.ctx.lineWidth = 5;
            this.ctx.strokeRect(this.x, this.y, this.width, this.height);

        this.ctx.font = this.font;
        this.ctx.fillStyle = this.text_color;

        let yPos = this.y+this.height/2 + this.font_size/3;
        let label_width = this.ctx.measureText(this.label).width
        let xPos = this.x + this.width/2 - label_width/2;
        this.ctx.fillText(this.label, xPos, yPos);

        this.ctx.globalAlpha = 1;
    }
}


export {Button};