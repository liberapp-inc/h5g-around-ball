const SAVE_KEY_BESTSCORE = "aroundball-bestScore";
const BACK_COLOR = 0x3B4F5E; 
const FONT_COLOR = 0xD1E1E2;
const PLAYER_RADIUS_PER_W = 0.04;
const OBSTACLE_RADIUS_PER_W = 0.08;
const PLAYER_COLOR = 0x1EB1C8;
const OBSTACLE_COLOR = 0x768998;
const CAMERA_Y_PER_W = -0.4;
const CAM_PERS_Y_PER_W = -CAMERA_Y_PER_W * 2;
const PLAYER_ADD_SPEED = 0.05;
const PLAYER_MAX_SPEED = 4;
const WALL_WIDTH_W = 50;
const OBSTACLE_ADD_SPEED = 0.1;
const OBSTACLE_MAX_SPEED = 5;
const OBSTACLE_COUNTS = 7;
const OBSTACLE_ADD_DISTANCE = 10;
const OBSTACLE_MAX_DISTANCE = 600;
const OBSTACLE_MAX_POSITION = 250;



class Game {

    static loadSceneGamePlay() {
        Game.obstaclemove = false;
        Game.shotspeed = 0.2;
        Game.circlespeed = 1.5;
        Game.circledirection = 1;
        Game.obstaclespeed = 0.2;
        Game.obstacledistance = 200;
        Camera2D.x = Util.w(-0.5);
        Camera2D.y = Util.h(-0.5);

        new Player();
        Player.I.setStateInitial();
        var n;
        for (n = 0; n < OBSTACLE_COUNTS; n++) {           
            new Obstacle();
            }
        var i;
        for (i = 0; i < Obstacle.I.length; i++) {           
            Obstacle.I[i].setStateRun();
            }
            
        Wave.ObstacleSet();
        new StartScene();
        new Score();
      
    }
   
    static circlespeed:number;
    static shotspeed: number;
    static highestPosi: number;
    static circledirection:number;
    static obstaclespeed:number;
    static obstacledistance:number;
    static obstaclemove:boolean;
}