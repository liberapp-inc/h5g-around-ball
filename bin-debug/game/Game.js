var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SAVE_KEY_BESTSCORE = "aroundball-bestScore";
var BACK_COLOR = 0x6F81DB;
var FONT_COLOR = 0x000000;
var PLAYER_RADIUS_PER_W = 0.04;
var PLAYER_COLOR = 0x00e2de;
var CAMERA_Y_PER_W = -0.4;
var CAM_PERS_Y_PER_W = -CAMERA_Y_PER_W * 2;
var WALL_ADD_SPEED = 0.05;
var WALL_MAX_SPEED = 1;
var WALL_WIDTH_W = 50;
var OBSTACLE_ADD_SPEED = 0.1;
var OBSTACLE_MAX_SPEED = 10;
var Game = (function () {
    function Game() {
    }
    Game.loadSceneGamePlay = function () {
        Game.speed = 3;
        Camera2D.x = Util.w(-0.5);
        Camera2D.y = Util.h(-0.5);
        new Player();
        new StartScene();
    };
    return Game;
}());
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map