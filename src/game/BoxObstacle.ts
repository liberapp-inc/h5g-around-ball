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
        this.color = OBSTACLE_COLOR;
        this.move = false;
        this.speed = 0;
        this.direction = 1;

        this.rect = new Rect( this.x, this.y, this.w, this.h, this.color );
    }
    onDestroy(){
        this.rect.destroy();
         Obstacle.I= [];
    }
    update(){    
        this.state();
        this.rect.perspective( this.x, this.y, 0 );
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
        if(this.x < -Game.obstacleposition|| this.x > Game.obstacleposition ){
            this.direction = this.direction * -1;
        }

        }
    }

    static detectObstacle( x:number, y:number ):boolean { 
        let flag = false;
        const r = Util.w(PLAYER_RADIUS_PER_W );
        const _r = Util.w(OBSTACLE_RADIUS_PER_W);
        var n;
        for (n = 0; n < Obstacle.I.length; n++) {           


            let dx = Obstacle.I[n].x - x;
            let dy = Obstacle.I[n].y - y;
            let c = Math.sqrt(dx*dx +dy*dy);
            if( c <= r+_r ){
                    Game.launchedposition = Obstacle.I[n].y;
                    flag = true;
                    Player.I.currentNum = n ;
                    console.log("c"+ c+ "r+r"+r+_r);

            }



            }


       

        return flag;
    }
    setStateMiss(){
    }
    stateMiss(){
    }
}