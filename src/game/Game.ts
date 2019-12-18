const SAVE_KEY_BESTSCORE = "aroundball-bestScore";
const BACK_COLOR = 0x6F81DB; 
const FONT_COLOR = 0x000000;
const PLAYER_RADIUS_PER_W = 0.04;
const OBSTACLE_RADIUS_PER_W = 0.08;
const PLAYER_COLOR = 0x00e2de;
const OBSTACLE_COLOR = 0xffffff;
const CAMERA_Y_PER_W = -0.4;
const CAM_PERS_Y_PER_W = -CAMERA_Y_PER_W * 2;
const WALL_ADD_SPEED = 0.05;
const WALL_MAX_SPEED = 1;
const WALL_WIDTH_W = 50;
const OBSTACLE_ADD_SPEED = 0.1;
const OBSTACLE_MAX_SPEED = 10;

class Game {

    static loadSceneGamePlay() {
        Game.shotspeed = 0.2;
        Game.circlespeed = 1.5;
        Camera2D.x = Util.w(-0.5);
        Camera2D.y = Util.h(-0.5);

        new Player();
        Player.I.setStateInitial();
        var n;
        for (n = 0; n < 4; n++) {           
            new Obstacle();
            }
        Wave.ObstacleSet();
        new StartScene();
        new Score();
      
    }
   
    static circlespeed:number;
    static shotspeed: number;
    static highestPosi: number;

}