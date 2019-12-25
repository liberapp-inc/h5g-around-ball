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
var BoxObstacle = (function (_super) {
    __extends(BoxObstacle, _super);
    function BoxObstacle() {
        var _this = _super.call(this) || this;
        _this.rect = null;
        _this.state = _this.stateNone;
        BoxObstacle.I.push(_this);
        _this.x = 0;
        _this.y = 0;
        _this.w = BOXOBSTACLE_LENGTH;
        _this.h = BOXOBSTACLE_LENGTH;
        _this.color = BOXOBSTACLE_COLOR;
        _this.move = false;
        _this.speed = 0;
        _this.direction = 1;
        _this.rect = new Rect(_this.x, _this.y, _this.w, _this.h, _this.color);
        return _this;
    }
    BoxObstacle.prototype.onDestroy = function () {
        this.rect.destroy();
        BoxObstacle.I = [];
    };
    BoxObstacle.prototype.update = function () {
        this.state();
        var center = BOXOBSTACLE_LENGTH / 2;
        this.rect.perspective(this.x - center, this.y - center, 0);
    };
    BoxObstacle.prototype.setStateNone = function () {
        this.state = this.stateNone;
    };
    BoxObstacle.prototype.stateNone = function () {
    };
    BoxObstacle.prototype.setStateRun = function () {
        this.state = this.stateRun;
    };
    BoxObstacle.prototype.stateRun = function () {
        if (this.move) {
            this.x += this.speed * this.direction;
            if (this.x < -OBSTACLE_MAX_POSITION || this.x > OBSTACLE_MAX_POSITION) {
                this.direction = this.direction * -1;
            }
        }
    };
    BoxObstacle.detectObstacle = function (x, y) {
        var flag = false; //一度ぶつかったら次から問題発生
        var r = BOXOBSTACLE_LENGTH / 2 + Util.w(PLAYER_RADIUS_PER_W);
        var rr = Math.pow(r, 2);
        BoxObstacle.I.forEach(function (p) {
            var dx = p.x - x;
            var dy = p.y - y;
            if (Math.pow(dx, 2) <= rr && Math.pow(dy, 2) <= rr) {
                flag = true;
            }
        });
        return flag;
    };
    BoxObstacle.prototype.setStateMiss = function () {
    };
    BoxObstacle.prototype.stateMiss = function () {
    };
    BoxObstacle.I = [];
    return BoxObstacle;
}(GameObject));
__reflect(BoxObstacle.prototype, "BoxObstacle");
//# sourceMappingURL=BoxObstacle.js.map