var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Ball = (function () {
    function Ball(x, y, z, radius, color) {
        this.sphere = null;
        this.radius = radius;
        this.setDisplay(x, y, radius, color);
    }
    Ball.initial = function () {
        Ball.centerX = 0;
        Ball.centerY = Util.w(CAM_PERS_Y_PER_W);
    };
    Ball.prototype.destroy = function () {
        if (this.sphere) {
            this.sphere.parent.removeChild(this.sphere);
            this.sphere = null;
        }
    };
    Ball.prototype.setDisplay = function (x, y, radius, color) {
        this.sphere = new egret.Shape();
        GameObject.gameDisplay.addChildAt(this.sphere, 0);
        this.sphere.graphics.beginFill(color);
        this.sphere.graphics.drawCircle(0, 0, radius);
        this.sphere.graphics.endFill();
        // this.shadow.graphics.drawCircle( 0, radius*SHADOW_1_SY, radius );
    };
    Ball.prototype.setAlpha = function (alpha) {
        this.sphere.alpha = alpha;
    };
    Ball.prototype.setShapeFront = function () {
        this.sphere.parent.removeChild(this.sphere);
        GameObject.gameDisplay.addChild(this.sphere);
    };
    Ball.prototype.perspective = function (x, y, z) {
        this.sphere.x = x;
        this.sphere.y = y;
    };
    return Ball;
}());
__reflect(Ball.prototype, "Ball");
//# sourceMappingURL=Ball.js.map