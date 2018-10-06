var canvas=document.getElementById('can')
var ctx =canvas.getContext('2d');

var running=false;
var mute=false;

var circles=[];

var mx,my;
var cx,cy;
canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePosition(canvas, evt);
    mx=mousePos.x;
    cx=mx;
    my=mousePos.y;
    cy=my;
}, false);
function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

window.onkeypress=function(e){
    console.log(e.key);
    switch(e.key){
        case 'm':
            mute=!mute;
            break;
        case ' ':
            e.preventDefault();
            running=!running;
            break;
        case 'r':
            circles=[];
            running=false;
            mute=false;
            draw();
    }
}

setInterval(function (evt) {
    if(!mute&&running){
        circles.push([0,cx,cy]);
    }
    if(circles.length!=0){
        if(circles[0][0]>1000){
            circles.shift();
        }
    }
}, 200);

setInterval(function (evt) {
    if(running){
        for(i=0;i<circles.length;i++){
            circles[i][0]+=10;
        }
        draw()
    }
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
