// Liberapp 2019 - Tahiti Katagai
// 四角形描画

class Rect {

    static centerX:number;
    static centerY:number;
    w:number;
    h:number;

    static initial(){
    Rect.centerX =  0;
    Rect.centerY = Util.w(CAM_PERS_Y_PER_W);
    }

    shape:egret.Shape = null;
    constructor( x:number, y:number, w:number, h:number, color:number, gameDisplay:boolean=false, dispFront:boolean=false ) {

        this.shape = new egret.Shape();
        this.setDisplay( x, y, w, h, color );

    }
    update() {
        
    }
       destroy(){
        if( this.shape ){
            this.shape.parent.removeChild(this.shape);
            this.shape = null;
        }
    }


    perspective(x:number, y:number, w:number) {        
        this.shape.x = x - w /2;
        this.shape.y = y;
    }

    setDisplay( x:number, y:number, w:number, h:number,color:number ){
        this.shape = new egret.Shape();
        GameObject.gameDisplay.addChildAt(this.shape, 0 );
        this.shape.graphics.beginFill( color );
        this.shape.graphics.drawRect( 0, 0,w,h);
        this.shape.graphics.endFill();

        // this.shadow.graphics.drawCircle( 0, radius*SHADOW_1_SY, radius );

    }
}
