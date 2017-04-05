$( document ).ready(function() {

var grid =
    [
        [0,0,0,0,0,2,0,0,0,0,0,0],
        [0,0,0,2,0,2,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,2,0,0,0],
        [0,2,0,0,0,0,0,0,0,0,2,0],
        [0,0,0,2,0,0,2,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,2,0,0,0,2,0,0],
        [0,0,2,0,0,2,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,2,0,0],
        [0,2,0,0,0,0,0,0,0,0,0,0]
    ];


var tankPosition = {
    x: 4,
    y: 6
};

var bulletPosition = {
    x: null,
    y: null
};


var lastDirection = '';
var currX;
var currY;

function checkForBullet(grid) {


    for(var i = 0; i < grid.length; i ++){
        for(var y = 0; y < grid[i].length; y++ ) {
            if(grid[i][y] == 3){
                return false;
            }
        }
    }
    return true;
}


function moveBullet(lastDirection) {


     var startBullet = setInterval(function(){

         if(!checkOutOfField(bulletPosition.x , bulletPosition.y)){
             clearInterval(startBullet);
             //grid[bulletPosition.y][bulletPosition.x] = 0;
             main();
             return;
         }

         if(lastDirection == 'left'){
             grid[bulletPosition.y][bulletPosition.x] = 0;
             bulletPosition.x--;
             if(checkOutOfField(bulletPosition.x, bulletPosition.y)){
                 grid[bulletPosition.y][bulletPosition.x] = 3;
             }
             main();
         }
         if(lastDirection == 'right'){
             grid[bulletPosition.y][bulletPosition.x] = 0;
             bulletPosition.x++;
             if(checkOutOfField(bulletPosition.x, bulletPosition.y)){
                 grid[bulletPosition.y][bulletPosition.x] = 3;
             }
         }

         if(lastDirection == 'top'){
             grid[bulletPosition.y][bulletPosition.x] = 0;
             bulletPosition.y--;
             if(checkOutOfField(bulletPosition.x, bulletPosition.y)){
                 grid[bulletPosition.y][bulletPosition.x] = 3;
             }
             main();
         }

         if(lastDirection == 'down'){
             grid[bulletPosition.y][bulletPosition.x] = 0;
             bulletPosition.y++;
             if(checkOutOfField(bulletPosition.x, bulletPosition.y)){
                 grid[bulletPosition.y][bulletPosition.x] = 3;
             }
             main();
         }

         main();
     }, 300);

}

function bulletLogic(lastDirection) {
    currX = tankPosition.x;
    currY = tankPosition.y;

    if(!checkForBullet(grid)){
        return;
    }


    if(lastDirection == 'left'){
        currX--;
        if(!checkOutOfField(currX , currY)){
            //return;
        }
        grid[currY][currX] = 3;
        bulletPosition.x = currX;
        bulletPosition.y = currY;
        main();
        moveBullet(lastDirection);
    }

    if(lastDirection == 'right'){
        currX++;
        if(!checkOutOfField(currX , currY)){
            //return;
        }
        grid[currY][currX] = 3;
        bulletPosition.x = currX;
        bulletPosition.y = currY;
        main();
        moveBullet(lastDirection);
    }

    if(lastDirection == 'top'){
        currY--;
        if(!checkOutOfField(currX , currY)){
            //return;
        }
        grid[currY][currX] = 3;
        bulletPosition.x = currX;
        bulletPosition.y = currY;
        main();
        moveBullet(lastDirection);
    }

    if(lastDirection == 'down'){
        currY++;
        if(!checkOutOfField(currX , currY)){
            //return;
        }
        grid[currY][currX] = 3;
        bulletPosition.x = currX;
        bulletPosition.y = currY;
        main();
        moveBullet(lastDirection);
    }
}


function checkOutOfField(x , y, isTank) {


    if(isTank){
        if(x > grid[0].length - 1 || x < 0){
            return false;
        }
        if(y > grid.length - 1 || y < 0){
            return false;
        }
    }else {
        if (x > grid[0].length - 1 || x < 0) {
            return false;
        }
        if (y > grid.length - 1 || y < 0) {
            return false;
        }
    }

    return true;

}

$(document).keydown(function (event) {

    console.log(event.keyCode);
    currX = tankPosition.x;
    currY = tankPosition.y;

    if(event.keyCode == 37){
        lastDirection = 'left';
        currX--;
        if(!checkOutOfField(currX, currY, true)){
            return;
        }

        if(grid[currY][currX] != 2 ){
            grid[tankPosition.y][tankPosition.x] = 0; //left
            tankPosition.x--;
            main()
        }
    }
    if(event.keyCode == 38){
        lastDirection = 'top';
        currY--;

        if(!checkOutOfField(currX, currY, true)){
            return;
        }

        if(grid[currY][currX] != 2){
            grid[tankPosition.y][tankPosition.x] = 0; //top
            tankPosition.y--;
            main();
        }

    }
    if(event.keyCode == 39){
        lastDirection = 'right';
        currX++;
        if(!checkOutOfField(currX, currY, true)){
            return;
        }

        if(grid[currY][currX] != 2){
            grid[tankPosition.y][tankPosition.x] = 0; //right
            tankPosition.x++;
            main();
        }
    }
    if(event.keyCode == 40){
        lastDirection = 'down';
        currY++;
        if(!checkOutOfField(currX, currY, true)){
            return;
        }

        if(grid[currY][currX] != 2 ){
            grid[tankPosition.y][tankPosition.x] = 0;//down
            tankPosition.y++;
            main();
        }
    }

    if(event.keyCode == 32){

        bulletLogic(lastDirection);

    }

});





function main() {

    grid[tankPosition.y][tankPosition.x] = 1;

    $(".container").empty();

    for(var i = 0; i < grid.length; i ++){
        for(var y = 0; y < grid[i].length; y++ ){
            var cellVal = grid[i][y];
            var div;

            if(cellVal == 0){
                $('.container').append("<div class=\"empty\"></div>");
            }
            if(cellVal == 1){
                $('.container').append("<div class=\"tank\"></div>");
            }
            if(cellVal == 2){
                $('.container').append("<div class=\"rock\"></div>");
            }
            if(cellVal == 3){
                $('.container').append("<div class=\"bullet\"></div>");
            }
        }
    }
}
main();

});