// Liberapp 2019 - Tahiti Katagai
// 四角形描画
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Rect = (function () {
    function Rect(x, y, w, h, color, gameDisplay, dispFront) {
        if (gameDisplay === void 0) { gameDisplay = false; }
        if (dispFront === void 0) { dispFront = false; }
        this.shape = null;
        this.shape = new egret.Shape();
        this.setDisplay(x, y, w, h, color);
    }
    Rect.initial = function () {
        Rect.centerX = 0;
        Rect.centerY = Util.w(CAM_PERS_Y_PER_W);
    };
    Rect.prototype.update = function () {
    };
    Rect.prototype.destroy = function () {
        if (this.shape) {
            this.shape.parent.removeChild(this.shape);
            this.shape = null;
        }
    };
    Rect.prototype.perspective = function (x, y, w) {
        this.shape.x = x - w / 2;
        this.shape.y = y;
    };
    Rect.prototype.setDisplay = function (x, y, w, h, color) {
        this.shape = new egret.Shape();
        GameObject.gameDisplay.addChildAt(this.shape, 0);
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawRect(0, 0, w, h);
        this.shape.graphics.endFill();
        // this.shadow.graphics.drawCircle( 0, radius*SHADOW_1_SY, radius );
    };
    return Rect;
}());
__reflect(Rect.prototype, "Rect");
//# sourceMappingURL=Rect.js.map