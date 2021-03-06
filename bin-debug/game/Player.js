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
        _this.lastAngleRad = 0;
        _this.currentNum = 0;
        _this.cameraPosition = 0;
        _this.cameraOffset = -700;
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
        this.cameraSet();
        this.ball.perspective(this.x, this.y, 0);
        //console.log(this.x)
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
        this.angleRad += 1 * Math.PI / 180;
        var num = Util.w(OBSTACLE_RADIUS_PER_W) + Util.w(PLAYER_RADIUS_PER_W);
        this.x = num * Math.cos(this.angleRad) + Obstacle.I[this.currentNum].x;
        this.y = num * Math.sin(this.angleRad) + Obstacle.I[this.currentNum].y;
    };
    Player.prototype.setStateRun = function () {
        this.state = this.stateRun;
    };
    Player.prototype.setStateShot = function () {
        this.addX = this.x - Obstacle.I[this.currentNum].x;
        this.addY = this.y - Obstacle.I[this.currentNum].y;
        this.state = this.StateShot;
        this.radius = 0;
        this.lastAngleRad = 0;
        Game.circleaddspeed = 1;
        Wave.ObstacleUpdate();
    };
    Player.prototype.StateShot = function () {
        this.x += this.addX * Game.shotspeed;
        this.y += this.addY * Game.shotspeed;
        var index = this.currentNum;
        if (index >= OBSTACLE_COUNTS - 1) {
            index = 0;
        }
        if (this.x < -320 ||
            320 < this.x ||
            this.y > Game.launchedposition + 400 ||
            this.y < Obstacle.I[index + 1].y - Util.w(OBSTACLE_RADIUS_PER_W) - Util.w(PLAYER_RADIUS_PER_W)) {
            this.state = this.setStateMiss;
        }
        //  if(this.y > Obstacle.I[this.currentNum].y + 300)
        if (BoxObstacle.detectObstacle(this.x, this.y)) {
            this.state = this.setStateMiss;
        }
        if (Obstacle.detectObstacle(this.x, this.y)) {
            Score.I.addPoint();
            new EffectCircle(this.x, this.y, Obstacle.I[Player.I.currentNum].radius / 1.5, PLAYER_COLOR);
            if (Game.obstacledistance > 400) {
                Wave.BoxObstacleUpdate();
            }
            if (PLAYER_MAX_SPEED > Game.circlespeed) {
                Game.circlespeed += PLAYER_ADD_SPEED;
                console.log(Game.circlespeed);
            }
            if (OBSTACLE_MAX_SPEED > Game.obstaclespeed && Game.obstaclemove) {
                Game.obstaclespeed += OBSTACLE_ADD_SPEED;
            }
            if (Obstacle.I[this.currentNum].x > this.x) {
                Game.circledirection = 1;
                if (Obstacle.I[this.currentNum].y < this.y) {
                    var numY = Obstacle.I[this.currentNum].y - this.y;
                    var numX = Obstacle.I[this.currentNum].x - this.x;
                    var tan = Math.atan(numY / numX);
                    tan = Math.abs(tan);
                    var angle = (180 * (Math.PI / 180)) - tan;
                    this.angleRad = angle;
                }
                else if (Obstacle.I[this.currentNum].y >= this.y) {
                    var numY = Obstacle.I[this.currentNum].y - this.y;
                    var numX = Obstacle.I[this.currentNum].x - this.x;
                    var tan = Math.atan(numY / numX);
                    tan = Math.abs(tan);
                    var angle = (180 * (Math.PI / 180)) + tan;
                    this.angleRad = angle;
                }
            }
            else if (Obstacle.I[this.currentNum].x <= this.x) {
                Game.circledirection = -1;
                if (Obstacle.I[this.currentNum].y < this.y) {
                    var numY = Obstacle.I[this.currentNum].y - this.y;
                    var numX = Obstacle.I[this.currentNum].x - this.x;
                    var tan = Math.atan(numY / numX);
                    this.angleRad = Math.abs(tan);
                }
                else if (Obstacle.I[this.currentNum].y >= this.y) {
                    var numY = Obstacle.I[this.currentNum].y - this.y;
                    var numX = Obstacle.I[this.currentNum].x - this.x;
                    var tan = Math.atan(numY / numX);
                    tan = Math.abs(tan);
                    var angle = (360 * (Math.PI / 180)) - tan;
                    this.angleRad = angle;
                }
            }
            this.state = this.setStateRun;
        }
    };
    Player.prototype.stateRun = function () {
        if (this.button.press) {
            this.state = this.setStateShot;
        }
        this.angleRad += Game.circledirection * Game.circlespeed * Game.circleaddspeed * Math.PI / 180;
        var num = Util.w(OBSTACLE_RADIUS_PER_W) + Util.w(PLAYER_RADIUS_PER_W);
        this.x = num * Math.cos(this.angleRad) + Obstacle.I[this.currentNum].x;
        this.y = num * Math.sin(this.angleRad) + Obstacle.I[this.currentNum].y;
        var currentAngleNum = Math.abs(this.angleRad);
        if (Game.circleaddspeed < 5) {
            if (currentAngleNum - this.lastAngleRad > 10) {
                Game.circleaddspeed += 0.5;
                this.lastAngleRad = currentAngleNum;
            }
        }
        console.log(this.lastAngleRad);
    };
    Player.prototype.setStateMiss = function () {
        this.state = this.stateMiss;
        new GameOver();
        EffectLine.create(this.x, this.y, 20, PLAYER_COLOR, 4);
    };
    Player.prototype.stateMiss = function () {
        this.y = 800;
    };
    Player.prototype.cameraSet = function () {
        if (this.cameraPosition > this.y) {
            this.cameraPosition = this.y;
        }
        Camera2D.y = this.cameraPosition + this.cameraOffset;
    };
    Player.I = null;
    return Player;
}(GameObject));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map