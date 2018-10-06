var canvas=document.getElementById('can')
var ctx =canvas.getContext('2d');

var running=false;

var filename='ambulance.png'

var circles=[];

var mx,my;
var cx,cy;
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

window.onkeypress=function(e){
    console.log(e.key);
    switch(e.key){
        case ' ':
            e.preventDefault();
            running=!running;
            break;
        case 'l':
            cx+=5;
            filename='ambulance.png'
            break;
        case 'h':
            cx-=5;
            filename='ambulance-rev.png'
            break;
        case 'Enter':
            circles=[];
            cx=400;
            cy=400;
            running=true;
            break;
        case 'm':
            cx=mx;
            cy=my;
        case 'r':
            circles=[];
            running=false;
            draw();
    }
}

setInterval(function (evt) {
    if(running){
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

    var img=new Image();
    img.src=filename;
    img.onload=function(){
        ctx.drawImage(img,0,0,450,330,cx-50,cy-50,100,100);
    };
}

function circle(rad,x,y){
    ctx.lineWidth=3;
    ctx.beginPath();
    ctx.arc(x,y,rad,0,Math.PI*2,false);
    ctx.stroke();
}
