class Obstacle extends GameObject{

    static I:Obstacle[] = [];
    x:number;
    y:number;
    z:number;
    radius:number;
    ball:Ball = null;
    point:boolean = null;
    direction:number;
    move:boolean;
    speed:number;
    state:()=>void = this.stateNone;
    constructor() {
        super();
        Obstacle.I.push(this);     
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.speed = 0;
        this.move = false;
        this.direction = 1;
        this.radius = Util.w(OBSTACLE_RADIUS_PER_W);
        this.ball = new Ball( this.x, this.y, this.z, this.radius, OBSTACLE_COLOR);
    }
    onDestroy(){
        this.ball.destroy();
         Obstacle.I= [];
    }
    update(){    
        this.state();
        this.ball.perspective( this.x, this.y, 0 );
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