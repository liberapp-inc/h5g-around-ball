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
var Obstacle = (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle() {
        var _this = _super.call(this) || this;
        _this.ball = null;
        _this.point = null;
        _this.state = _this.stateNone;
        Obstacle.I.push(_this);
        _this.x = 0;
        _this.y = 0;
        _this.z = 0;
        _this.direction = 1;
        _this.radius = Util.w(OBSTACLE_RADIUS_PER_W);
        _this.ball = new Ball(_this.x, _this.y, _this.z, _this.radius, OBSTACLE_COLOR);
        return _this;
    }
    Obstacle.prototype.onDestroy = function () {
        this.ball.destroy();
        Obstacle.I = [];
    };
    Obstacle.prototype.update = function () {
        this.state();
        this.ball.perspective(this.x, this.y, 0);
    };
    Obstacle.prototype.setStateNone = function () {
        this.state = this.stateNone;
    };
    Obstacle.prototype.stateNone = function () {
    };
    Obstacle.prototype.setStateRun = function () {
        this.state = this.stateRun;
    };
    Obstacle.prototype.stateRun = function () {
        if (-1200 > this.y) {
            Game.obstaclemove = true;
            this.x += Game.obstaclespeed * this.direction;
            if (this.x < -OBSTACLE_MAX_POSITION || this.x > OBSTACLE_MAX_POSITION) {
                this.direction = this.direction * -1;
            }
        }
    };
    Obstacle.detectObstacle = function (x, y) {
        var flag = false;
        var r = Util.w(PLAYER_RADIUS_PER_W);
        var _r = Util.w(OBSTACLE_RADIUS_PER_W);
        var n;
        for (n = 0; n < Obstacle.I.length; n++) {
            var dx = Obstacle.I[n].x - x;
            var dy = Obstacle.I[n].y - y;
            var c = Math.sqrt(dx * dx + dy * dy);
            if (c <= r + _r) {
                flag = true;
                Player.I.currentNum = n;
                console.log("c" + c + "r+r" + r + _r);
            }
        }
        return flag;
    };
    Obstacle.prototype.setStateMiss = function () {
    };
    Obstacle.prototype.stateMiss = function () {
    };
    Obstacle.I = [];
    return Obstacle;
}(GameObject));
__reflect(Obstacle.prototype, "Obstacle");
//# sourceMappingURL=Obstacle.js.map