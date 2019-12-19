var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SAVE_KEY_BESTSCORE = "aroundball-bestScore";
var BACK_COLOR = 0x6F81DB;
var FONT_COLOR = 0x000000;
var PLAYER_RADIUS_PER_W = 0.04;
var OBSTACLE_RADIUS_PER_W = 0.08;
var PLAYER_COLOR = 0x00e2de;
var OBSTACLE_COLOR = 0xffffff;
var CAMERA_Y_PER_W = -0.4;
var CAM_PERS_Y_PER_W = -CAMERA_Y_PER_W * 2;
var PLAYER_ADD_SPEED = 0.05;
var PLAYER_MAX_SPEED = 4;
var WALL_WIDTH_W = 50;
var OBSTACLE_ADD_SPEED = 0.1;
var OBSTACLE_MAX_SPEED = 5;
var OBSTACLE_MAX_POSITION = 250;
var Game = (function () {
    function Game() {
    }
    Game.loadSceneGamePlay = function () {
        Game.shotspeed = 0.2;
        Game.circlespeed = 1.5;
        Game.circledirection = 1;
        Game.obstaclespeed = 1;
        Camera2D.x = Util.w(-0.5);
        Camera2D.y = Util.h(-0.5);
        new Player();
        Player.I.setStateInitial();
        var n;
        for (n = 0; n < 4; n++) {
            new Obstacle();
        }
        var i;
        for (i = 0; i < Obstacle.I.length; i++) {
            Obstacle.I[i].setStateRun();
        }
        Wave.ObstacleSet();
        new StartScene();
        new Score();
    };
    return Game;
}());
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map