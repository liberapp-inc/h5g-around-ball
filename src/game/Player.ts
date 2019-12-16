class Player extends GameObject{

    static I:Player = null;
    
    x:number;
    y:number;
    z:number;
    radius:number;
    ball:Ball = null;
    buttonOffsetX:number = 0;
    angleRad:number = 0;
    addX:number;
    addY:number;

    currentNum:number;


    button:Button = null;
    state:()=>void = this.stateNone;

    constructor() {
        super();

        Player.I = this;
        
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.currentNum = 0;
        this.radius = Util.w(PLAYER_RADIUS_PER_W);
        this.ball = new Ball( this.x, this.y, this.z, this.radius, PLAYER_COLOR );
        this.button = new Button( null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, null ); // 透明な全画面ボタン
    }

    onDestroy(){
        this.ball.destroy();
        this.button.destroy();
        Player.I = null;
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
    setStateInitial(){
        this.state = this.stateInitial;
    }
    stateInitial(){
        this.angleRad += 1 * Math.PI / 180 * Game.circlespeed;
        var num = Util.w(OBSTACLE_RADIUS_PER_W)+ Util.w(PLAYER_RADIUS_PER_W);
        this.x = num * Math.cos(this.angleRad) + Obstacle.I[this.currentNum].x;
        this.y = num * Math.sin(this.angleRad) + Obstacle.I[this.currentNum].y;
        console.log (Math.atan(-100/-100)/(Math.PI / 180));
    }
    setStateRun(){
        this.state = this.stateRun;
    }
    setStateShot(){
        this.addX = this.x - Obstacle.I[this.currentNum].x;
        this.addY = this.y - Obstacle.I[this.currentNum].y;
        this.state = this.StateShot;
    }
    StateShot(){
        this.x += this.addX *Game.shotspeed;
        this.y += this.addY *Game.shotspeed;
         if( Obstacle.detectObstacle( this.x, this.y )){
           
            //this.angleRad = Math.atan(this.y-Obstacle.I[this.currentNum].y/this.x-Obstacle.I[this.currentNum].x/(Math.PI / 180));
            this.state = this.setStateRun;
             

        
        }



    }
    stateRun() {
                  if( this.button.press ){
            this.state = this.setStateShot;
        }

       
               this.angleRad += 1 * Math.PI / 180 * Game.circlespeed;
               var num = Util.w(OBSTACLE_RADIUS_PER_W)+ Util.w(PLAYER_RADIUS_PER_W);
               this.x = num * Math.cos(this.angleRad) + Obstacle.I[this.currentNum].x;
               this.y = num * Math.sin(this.angleRad) + Obstacle.I[this.currentNum].y;
               console.log (this.angleRad);
    }

    setStateMiss(){
    }
    stateMiss(){
    }



}