const SAVE_KEY_BESTSCORE = "aroundball-bestScore";
const BACK_COLOR = 0x6F81DB; 
const FONT_COLOR = 0x000000;
const PLAYER_RADIUS_PER_W = 0.04;
const PLAYER_COLOR = 0x00e2de;
const CAMERA_Y_PER_W = -0.4;
const CAM_PERS_Y_PER_W = -CAMERA_Y_PER_W * 2;
const WALL_ADD_SPEED = 0.05;
const WALL_MAX_SPEED = 1;
const WALL_WIDTH_W = 50;
const OBSTACLE_ADD_SPEED = 0.1;
const OBSTACLE_MAX_SPEED = 10;

class Game {

    static loadSceneGamePlay() {
        Game.speed = 3;
        Camera2D.x = Util.w(-0.5);
        Camera2D.y = Util.h(-0.5);

        new Player();
        new StartScene();
      
    }
   
    static speed:number;

}