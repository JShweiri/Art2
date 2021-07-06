let canvas = document.getElementById('gc');
let ctx = canvas.getContext('2d');

canvas.width = 4000;
canvas.height = 4000;


function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function pathPoints(x0, y0, vertices, radius){
  let theta0 = 2*Math.PI/vertices;
  let theta = theta0;
  let points = [[x0,y0]];

  for(let i = 1; i < vertices; i++){
    let x = x0 + radius * Math.sin(theta);
    let y = y0 + radius * (1 - Math.cos(theta));
    points.push([x,y]);
    theta+=theta0;
  }
  return points;
}

function drawPoints(points){

  ctx.beginPath();
  ctx.moveTo(points[0][0],points[0][1]);

  for(let i = 1; i <points.length; i++){
    ctx.lineTo(points[i][0],points[i][1]);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawDots(points){

  for(let i = 1; i <points.length; i++){
    ctx.beginPath();
    ctx.arc(points[i][0],points[i][1],2,0,2*Math.PI);
    ctx.stroke();
  }

}


let shapes = [];
let spots = [];
let nextPointNum = [];

function setup(){
  for(let i = 0; i < 10; i++){
     ctx.strokeStyle=getRandomColor();
    //shapes[i] = pathPoints(200,4,3+i,30+i*4);
    shapes[i] = pathPoints(800,100-i*10,3+i,140+i*30);//7.7
    //initialize moving dots to top of respective shape
    spots[i] = shapes[i][0];
    nextPointNum[i] = 1;
    drawPoints(shapes[i]);
  }

}

function update(){
  // move circles along path
v= 20;

drawPoints(spots);

   for(let i = 0; i < spots.length; i++){
  p0x = spots[i][0];
  p0y = spots[i][1];

  p1x = shapes[i][nextPointNum[i]][0];
  p1y = shapes[i][nextPointNum[i]][1];

  nextPointNum[i]++;


    angle = Math.atan(p1y-p0y, p1x-p0x);
    xv = v * Math.cos(angle);
    yv = v * Math.sin(angle);
    spots[i][0] += xv;
    spots[i][1] += yv;
   }


}


setup();
setInterval(update, 34);
