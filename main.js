var canvas=document.getElementById('can')
var ctx =canvas.getContext('2d');

var running=false;

var img=new Image();
img.src='ambulance.png';

var icaston=new Image();
icaston.src='caston.png';

var circles=[];

var caston='0';

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
            img.src='ambulance.png';
            break;
        case 'h':
            cx-=5;
            img.src='ambulance-rev.png';
            break;
        case 'Enter':
            circles=[];
            cx=400;
            cy=400;
            running=true;
            document.getElementById('instruction').innerHTML='';
            break;
        case 'm':
            cx=mx;
            cy=my;
            break;
        case 'a':
            caston='l';
            break;
        case 's':
            caston='0';
            break;
        case 'd':
            caston='r';
            break;
        case 'r':
            circles=[];
            cx=400;
            cy=400;
            running=false;
            document.getElementById('instruction').innerHTML='';
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

    ctx.drawImage(img,0,0,450,330,cx-50,cy-50,100,100);

    if(caston=='l'){
        ctx.drawImage(icaston,0,0,800,800,100,300,200,200);
    }else if(caston=='r'){
        ctx.drawImage(icaston,0,0,800,800,1200,300,200,200);
    }
}

function circle(rad,x,y){
    ctx.lineWidth=3;
    ctx.beginPath();
    ctx.arc(x,y,rad,0,Math.PI*2,false);
    ctx.stroke();
}
