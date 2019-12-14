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
        _this.y = 300;
        _this.z = 0;
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
    Player.prototype.setStateRun = function () {
        this.state = this.stateRun;
    };
    Player.prototype.stateRun = function () {
        this.angleRad += 1 * Math.PI / 180;
        this.x = 100 * Math.cos(this.angleRad) + 0;
        this.y = 100 * Math.sin(this.angleRad) + 0;
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