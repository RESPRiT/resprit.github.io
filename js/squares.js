var canvas = document.getElementById('canvasback');
var ctx = canvas.getContext('2d');
var now = new Date();
var minute = now.getMinutes();
var second = now.getSeconds();
var milli = now.getMilliseconds(); 

function init(){
  window.requestAnimationFrame(draw);
}

function drawSpinSquare(size, rate){ // rate is degrees/sec
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.beginPath();
    ctx.rotate((minute*60 + second + milli/1000) * rate * Math.PI / 180);
    ctx.strokeRect(size/-2, size/-2, size, size);
    ctx.stroke();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function draw(){  
    var now = new Date();
    minute = now.getMinutes();
    second = now.getSeconds();
    milli = now.getMilliseconds();
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;  
  
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0,0,canvas.width,canvas.height); // clear canvas
	
    for(var i = 0; i < Math.max(canvas.width, canvas.height) / 10; i++) {
      ctx.lineWidth = Math.sin(((minute * 60 + second + milli / 1000) * 3 + Math.PI * 2 - i) / 6) / 2 + .6;
      drawSpinSquare(i * 10 + Math.pow(1.2, i), 10 + i);
      ctx.strokeStyle = 'rgba(255,255,255, 0.' + Math.max((50 - i * 2), 10) + ")";
    }
  
    window.requestAnimationFrame(draw);
}

init();