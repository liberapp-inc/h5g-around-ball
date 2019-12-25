class BoxObstacle extends GameObject{

    static I:BoxObstacle[] = [];
    x:number;
    y:number;
    w:number;
    h:number;
    speed:number;
    move:boolean;
    color:number;
    direction:number;
    rect:Rect = null;
    state:()=>void = this.stateNone;
    constructor() {
        super();
        BoxObstacle.I.push(this);     
        this.x = 0;
        this.y = 0;
        this.w = BOXOBSTACLE_LENGTH;
        this.h = BOXOBSTACLE_LENGTH;
        this.color = BOXOBSTACLE_COLOR;
        this.move = false;
        this.speed = 0;
        this.direction = 1;

        this.rect = new Rect( this.x, this.y, this.w, this.h, this.color );
    }
    onDestroy(){
        this.rect.destroy();
         BoxObstacle.I= [];
    }
    update(){    
        this.state();
        var center = BOXOBSTACLE_LENGTH/2;
        this.rect.perspective( this.x - center, this.y - center, 0 );
    }
    setStateNone(){
        this.state = this.stateNone;
    }
    stateNone(){        
    }
    setStateRun(){
        this.state = this.stateRun;   
    }
    stateRun() {   
        if(this.move){
        this.x += this.speed * this.direction;
        if(this.x < -OBSTACLE_MAX_POSITION|| this.x > OBSTACLE_MAX_POSITION){
            this.direction = this.direction * -1;
        }

        }
    }



    static detectObstacle( x:number, y:number ):boolean { 
        let flag = false;//一度ぶつかったら次から問題発生
        const r = BOXOBSTACLE_LENGTH /2 + Util.w(PLAYER_RADIUS_PER_W);
        const rr = r ** 2;
        BoxObstacle.I.forEach( p => {
            let dx = p.x - x;
            let dy = p.y - y;
            if( dx ** 2 <= rr && dy ** 2 <= rr){

                    flag = true;

            }
        });
        return flag;
    }
    setStateMiss(){
    }
    stateMiss(){
    }
}