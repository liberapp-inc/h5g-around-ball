// Liberapp 2019 - Tahiti Katagai
// 障害オブジェクト管理
class Wave extends GameObject{

    static I:Wave = null;

    constructor() {
        super();
    }
    update() {
        
        //    if(Game.obstacledistance >= 0){
        //        Wave.spawn();
        //    }
    }
    static ObstacleSet(){
        var n;
        for (n = 0; n < Obstacle.I.length; n++) {
            var num = 300;
            var _num = -300;
              Obstacle.I[n].y = num + n *_num;
              var result = this.getRandom( -100, 100);
              Obstacle.I[n].x = result;
              Obstacle.I[n].ball.perspective(  Obstacle.I[n].x,  Obstacle.I[n].y, 0 );

              if(n == Obstacle.I.length-1){  
                 Game.highestPosi = Obstacle.I[n].y;
                 console.log(Game.highestPosi+ "//"+Obstacle.I[n].y);
              }
            }
    }

    static ObstacleUpdate(){
        Game.highestPosi += -300;
        Obstacle.I[Player.I.currentNum].y = Game.highestPosi ;
         var result = this.getRandom( -100, 100);
        Obstacle.I[Player.I.currentNum].x = result;
        console.log(Game.highestPosi );

    }
    static getRandom( min, max ) {
    var random = Math.floor( Math.random() * (max + 1 - min) ) + min;
    return random;
}
}

