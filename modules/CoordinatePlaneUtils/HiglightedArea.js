// creates highlight class for ctx with optional action function
// const highLightAction = ()=>{
//     console.log(highLight.coords);
// }


class HighlightedArea{
    constructor(ctx, action = ()=>{} , x = 0, y = 0, x1 = 0, y1 = 0, transparency = 0.6, color = 'cyan'){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
        this.orient();
        this.width = this.x1 - this.x;
        this.height = this.y1 - this.y;
        this.transparency = transparency;
        this.color = color;
        this.visible = false;
        this.mouseIsDown = false;
        this.actionable = true;
        this.action = action;
        this.initialize();
    }


    initialize(){
        console.log('initializing hightlight');
        this.ctx.canvas.addEventListener('mousedown', (e) => {
            if(e.ctrlKey == true){
                this.x = e.clientX;
                this.y = e.clientY;
                this.x1 = this.x;
                this.y1 = this.y;
                 
                this.visible = true;
                this.mouseIsDown = true;
                this.cords = {
                    x:0,
                    y:0,
                    x1:0,
                    y1:0
                }
            }
        })
        
        this.ctx.canvas.addEventListener('mousemove', (e) => {
            if(this.mouseIsDown){
               this.x1 = e.clientX;
               this.y1 = e.clientY;
            }
        })

        this.ctx.canvas.addEventListener('mouseup', (e) => {
            if(this.mouseIsDown){
                this.mouseIsDown = false;
                this.visible = false;
                this.orient();
                this.getCoords();
                if(this.actionable){
                    this.action();
                }
            }
        })
    }


    getCoords(){
        this.coords = {
            x: this.x,
            y: this.y,
            x1: this.x1,
            y1: this.y1
        }

        return this.coords;
    }




    orient(){
        if(this.x > this.x1){
            let bigger = this.x;
            let smaller = this.x1;
            this.x = smaller;
            this.x1 = bigger
        }
        if(this.y > this.y1){
            let bigger = this.y;
            let smaller = this.y1;
            this.y = smaller;
            this.y1 = bigger
        }
    }

    update(){
        this.width = this.x1 - this.x;
        this.height = this.y1 - this.y;
    }

    draw(){
        this.update();
        if(this.visible){
            this.ctx.fillStyle = this.color;
            this.ctx.globalAlpha = this.transparency;
            this.ctx.fillRect(this.x,this.y, this.width, this.height);
            this.ctx.globalAlpha = 1;
        }
        
    }
}

export{HighlightedArea};