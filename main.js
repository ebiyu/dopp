var canvas=document.getElementById('can')
var ctx =canvas.getContext('2d');

var circles=[];

var mx,my;
canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePosition(canvas, evt);
    mx=mousePos.x;
    my=mousePos.y;
}, false);
function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

setInterval(function (evt) {
    circles.push([0,mx,my]);
    if(circles[0][0]>1000){
        circles.shift();
    }
}, 200);

setInterval(function (evt) {
    for(i=0;i<circles.length;i++){
        circles[i][0]+=10;
    }
    draw()
}, 30);

function draw(){
    ctx.clearRect(0,0,1500,1000)
    for(i=0;i<circles.length;i++){
        circle(circles[i][0],circles[i][1],circles[i][2]);
    }
}

function circle(rad,x,y){
    ctx.lineWidth=3;
    ctx.beginPath();
    ctx.arc(x,y,rad,0,Math.PI*2,false);
    ctx.stroke();
}
