class Ball {

    static centerX:number;
    static centerY:number;

    sphere:egret.Shape = null;
    radius:number;

    static initial(){
        Ball.centerX = 0;
        Ball.centerY = Util.w(CAM_PERS_Y_PER_W);
    }

    constructor( x:number, y:number, z:number, radius:number, color:number ) {
        this.radius = radius;
        this.setDisplay( x, y, radius, color );
    }

    destroy(){
        if( this.sphere ){
            this.sphere.parent.removeChild(this.sphere);
            this.sphere = null;
        }
    }

    setDisplay( x:number, y:number, radius:number, color:number ){
        this.sphere = new egret.Shape();
        GameObject.gameDisplay.addChildAt(this.sphere, 0 );


        this.sphere.graphics.beginFill( color );
        this.sphere.graphics.drawCircle( 0, 0, radius );
        this.sphere.graphics.endFill();

        // this.shadow.graphics.drawCircle( 0, radius*SHADOW_1_SY, radius );

    }

    setAlpha( alpha:number ){
        this.sphere.alpha = alpha;

    }

    setShapeFront(){
        this.sphere.parent.removeChild(this.sphere);
        GameObject.gameDisplay.addChild(this.sphere);
    }

    perspective( x:number, y:number, z:number ){
        this.sphere.x = x;
        this.sphere.y = y;
    }
}
