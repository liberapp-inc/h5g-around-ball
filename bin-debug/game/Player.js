var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.ball = null;
        _this.buttonOffsetX = 0;
        _this.angleRad = 0;
        _this.button = null;
        _this.state = _this.stateNone;
        Player.I = _this;
        _this.x = 0;
        _this.y = 0;
        _this.z = 0;
        _this.currentNum = 0;
        _this.radius = Util.w(PLAYER_RADIUS_PER_W);
        _this.ball = new Ball(_this.x, _this.y, _this.z, _this.radius, PLAYER_COLOR);
        _this.button = new Button(null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, null); // 透明な全画面ボタン
        return _this;
    }
    Player.prototype.onDestroy = function () {
        this.ball.destroy();
        this.button.destroy();
        Player.I = null;
    };
    Player.prototype.update = function () {
        this.state();
        this.ball.perspective(this.x, this.y, 0);
    };
    Player.prototype.setStateNone = function () {
        this.state = this.stateNone;
    };
    Player.prototype.stateNone = function () {
    };
    Player.prototype.setStateInitial = function () {
        this.state = this.stateInitial;
    };
    Player.prototype.stateInitial = function () {
        this.angleRad += 1 * Math.PI / 180 * Game.circlespeed;
        var num = Util.w(OBSTACLE_RADIUS_PER_W) + Util.w(PLAYER_RADIUS_PER_W);
        this.x = num * Math.cos(this.angleRad) + Obstacle.I[this.currentNum].x;
        this.y = num * Math.sin(this.angleRad) + Obstacle.I[this.currentNum].y;
        console.log(Math.atan(-100 / -100) / (Math.PI / 180));
    };
    Player.prototype.setStateRun = function () {
        this.state = this.stateRun;
    };
    Player.prototype.setStateShot = function () {
        this.addX = this.x - Obstacle.I[this.currentNum].x;
        this.addY = this.y - Obstacle.I[this.currentNum].y;
        this.state = this.StateShot;
    };
    Player.prototype.StateShot = function () {
        this.x += this.addX * Game.shotspeed;
        this.y += this.addY * Game.shotspeed;
        if (Obstacle.detectObstacle(this.x, this.y)) {
            //this.angleRad = Math.atan(this.y-Obstacle.I[this.currentNum].y/this.x-Obstacle.I[this.currentNum].x/(Math.PI / 180));
            this.state = this.setStateRun;
        }
    };
    Player.prototype.stateRun = function () {
        if (this.button.press) {
            this.state = this.setStateShot;
        }
        this.angleRad += 1 * Math.PI / 180 * Game.circlespeed;
        var num = Util.w(OBSTACLE_RADIUS_PER_W) + Util.w(PLAYER_RADIUS_PER_W);
        this.x = num * Math.cos(this.angleRad) + Obstacle.I[this.currentNum].x;
        this.y = num * Math.sin(this.angleRad) + Obstacle.I[this.currentNum].y;
        console.log(this.angleRad);
    };
    Player.prototype.setStateMiss = function () {
    };
    Player.prototype.stateMiss = function () {
    };
    Player.I = null;
    return Player;
}(GameObject));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map