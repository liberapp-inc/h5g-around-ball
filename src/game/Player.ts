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

    currentNum:number = 0;
    cameraPosition:number = 0;
    cameraOffset:number = -700;
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
        this.cameraSet();
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
        this.angleRad +=  1 * Math.PI / 180;
        var num = Util.w(OBSTACLE_RADIUS_PER_W)+ Util.w(PLAYER_RADIUS_PER_W);
        this.x = num * Math.cos(this.angleRad) + Obstacle.I[this.currentNum].x;
        this.y = num * Math.sin(this.angleRad) + Obstacle.I[this.currentNum].y;
        
    }
    setStateRun(){
        this.state = this.stateRun;
    }
    setStateShot(){
        this.addX = this.x - Obstacle.I[this.currentNum].x;
        this.addY = this.y - Obstacle.I[this.currentNum].y;
        this.state = this.StateShot;
        this.radius = 0;
        //Wave.ObstacleUpdate();
        console.log (this.x + "//"+ Obstacle.I[this.currentNum].x);
    }
    StateShot(){
        this.x += this.addX *Game.shotspeed;
        this.y += this.addY *Game.shotspeed;
         if( Obstacle.detectObstacle( this.x, this.y )){
             if(Obstacle.I[this.currentNum].x > this.x){
             if(Obstacle.I[this.currentNum].y < this.y){
                 var numY = Obstacle.I[this.currentNum].y - this.y;
                 var numX = Obstacle.I[this.currentNum].x - this.x;
                 var tan = Math.atan(numY/ numX);
                 tan = Math.abs(tan) ;
                 var angle = (180 * (Math.PI / 180)) - tan ;
                 this.angleRad = angle ;
             }  
             else if(Obstacle.I[this.currentNum].y >= this.y){
                 var numY = Obstacle.I[this.currentNum].y - this.y;
                 var numX = Obstacle.I[this.currentNum].x - this.x;
                 var tan = Math.atan(numY/ numX);
                 tan = Math.abs(tan) ;
                 var angle = (180 * (Math.PI / 180)) + tan ;
                 this.angleRad = angle ;
             }

             }
             else if( Obstacle.I[this.currentNum].x <= this.x){
                 if(Obstacle.I[this.currentNum].y < this.y){
                     var numY = Obstacle.I[this.currentNum].y - this.y;
                     var numX = Obstacle.I[this.currentNum].x - this.x;
                     var tan = Math.atan(numY/ numX);
                     this.angleRad =  Math.abs(tan);
                    }
                    
                    else if(Obstacle.I[this.currentNum].y >= this.y){
                        var numY = Obstacle.I[this.currentNum].y - this.y;
                        var numX = Obstacle.I[this.currentNum].x - this.x;
                        var tan = Math.atan(numY/ numX);
                            tan = Math.abs(tan) ;
                        var angle = (360 * (Math.PI / 180)) - tan;
                        this.angleRad = angle ;
                    
                }

             }




            this.state = this.setStateRun;
        }



    }
    stateRun() {
                  if( this.button.press ){
            this.state = this.setStateShot;

        } 
               this.angleRad += 1 * Math.PI / 180 ;//* Game.circlespeed;
               var num = Util.w(OBSTACLE_RADIUS_PER_W)+ Util.w(PLAYER_RADIUS_PER_W);
               this.x = num * Math.cos(this.angleRad) + Obstacle.I[this.currentNum].x;
               this.y = num * Math.sin(this.angleRad) + Obstacle.I[this.currentNum].y;
               
    }

    setStateMiss(){
    }
    stateMiss(){

    }


    cameraSet(){
        if(this.cameraPosition > this.y){
            this.cameraPosition = this.y
        }
         Camera2D.y = this.cameraPosition + this.cameraOffset;
    }



}