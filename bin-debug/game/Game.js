var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SAVE_KEY_BESTSCORE = "aroundball-bestScore";
var BACK_COLOR = 0x3B4F5E;
var FONT_COLOR = 0xD1E1E2;
var PLAYER_RADIUS_PER_W = 0.04;
var OBSTACLE_RADIUS_PER_W = 0.08;
var PLAYER_COLOR = 0x1EB1C8;
var OBSTACLE_COLOR = 0x768998;
var CAMERA_Y_PER_W = -0.4;
var CAM_PERS_Y_PER_W = -CAMERA_Y_PER_W * 2;
var PLAYER_ADD_SPEED = 0.05;
var PLAYER_MAX_SPEED = 4;
var WALL_WIDTH_W = 50;
var OBSTACLE_ADD_SPEED = 0.1;
var OBSTACLE_MAX_SPEED = 5;
var OBSTACLE_COUNTS = 7;
var OBSTACLE_ADD_DISTANCE = 10;
var OBSTACLE_MAX_DISTANCE = 600;
var OBSTACLE_MAX_POSITION = 250;
var OBSTACLE_ADD_POSITION = 5;
var BOXOBSTACLE_LENGTH = 50;
var Game = (function () {
    function Game() {
    }
    Game.loadSceneGamePlay = function () {
        Game.obstaclemove = false;
        Game.shotspeed = 0.2;
        Game.circlespeed = 1.5;
        Game.circledirection = 1;
        Game.obstaclespeed = 0.3;
        Game.obstacledistance = 200;
        Game.obstacleposition = 100;
        Game.launchedposition = 0;
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
        var n;
        for (n = 0; n < 1; n++) {
            new BoxObstacle();
        }
        new StartScene();
        new Score();
    };
    return Game;
}());
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map