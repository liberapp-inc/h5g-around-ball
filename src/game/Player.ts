class Player extends GameObject{

    static I:Player = null;
    
    x:number;
    y:number;
    z:number;
    radius:number;
    ball:Ball = null;
    buttonOffsetX:number = 0;
    angleRad:number = 0;
    lastAngleRad:number = 0;
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
        //console.log(this.x)
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
        this.lastAngleRad = 0;
        Game.circleaddspeed = 1;
        Wave.ObstacleUpdate();

    }
    StateShot(){
        this.x += this.addX *Game.shotspeed;
        this.y += this.addY *Game.shotspeed;
        var index = this.currentNum;
        if(index >=OBSTACLE_COUNTS -1){
            index = 0;
        }
        if(this.x < -320 ||
           320 < this.x  ||
           this.y > Game.launchedposition + 400||
           this.y < Obstacle.I[index+1].y - Util.w(OBSTACLE_RADIUS_PER_W) - Util.w(PLAYER_RADIUS_PER_W)
           ){
           this.state = this.setStateMiss;
        }
        //  if(this.y > Obstacle.I[this.currentNum].y + 300)

         if( BoxObstacle.detectObstacle( this.x, this.y )){
             this.state = this.setStateMiss;
         }
         if( Obstacle.detectObstacle( this.x, this.y )){
             Score.I.addPoint();
            new EffectCircle( this.x, this.y, Obstacle.I[Player.I.currentNum].radius/1.5, PLAYER_COLOR );
             if(Game.obstacledistance > 400){
                 
                 Wave.BoxObstacleUpdate();


            }




            
             if(PLAYER_MAX_SPEED > Game.circlespeed){
                 Game.circlespeed += PLAYER_ADD_SPEED;
                 console.log(Game.circlespeed);
             }
             if(OBSTACLE_MAX_SPEED > Game.obstaclespeed && Game.obstaclemove){
                 Game.obstaclespeed += OBSTACLE_ADD_SPEED;

             }
             if(Obstacle.I[this.currentNum].x > this.x){
                 Game.circledirection = 1;
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
                 Game.circledirection = -1;
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
               this.angleRad += Game.circledirection * Game.circlespeed * Game.circleaddspeed * Math.PI / 180 ;
               var num = Util.w(OBSTACLE_RADIUS_PER_W)+ Util.w(PLAYER_RADIUS_PER_W);
               this.x = num * Math.cos(this.angleRad) + Obstacle.I[this.currentNum].x;
               this.y = num * Math.sin(this.angleRad) + Obstacle.I[this.currentNum].y;
               
               var currentAngleNum = Math.abs(this.angleRad);
               if(Game.circleaddspeed < 5){
                   if(currentAngleNum - this.lastAngleRad > 10){
                   Game.circleaddspeed += 0.5;
                   this.lastAngleRad = currentAngleNum;
                }
             }

               console.log(this.lastAngleRad );
    }

    setStateMiss(){
        this.state = this.stateMiss;
        new GameOver();
        EffectLine.create( this.x, this.y, 20, PLAYER_COLOR, 4 );
        
    }
    stateMiss(){
        this.y = 800;
    }


    cameraSet(){

            if(this.cameraPosition > this.y){
            this.cameraPosition = this.y
        }
         Camera2D.y = this.cameraPosition + this.cameraOffset;
    }
        

        



}