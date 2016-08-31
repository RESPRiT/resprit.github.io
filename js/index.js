function init(){
  window.requestAnimationFrame(draw);
}

// Returns a binary string of a minimum given length given a decimal number
function getBinary(decimal, length) {
  var binary = parseInt(decimal, 10).toString(2);
  
  while(binary.length < length) {
    binary = "0" + binary;
  }
  
  return binary;
}

// Draws a set of binary squares
function drawSquareSet(x, y, row, col, binary, prev, colors) {
  var index = 0;
  var opacity;
  var gradient = ctx.createLinearGradient(0,0,0,10);
  
  for(var i = 0; i < col; i++) {
    for(var j = 0; j < row; j++) {
      if(index < binary.length) {
        // Math to determine the shade of the color
        if(binary.charAt(index) == "0") {
          if(binary.charAt(index) != prev.charAt(index) && fill <= .5) {
            opacity = "." + parseInt((100 + Math.sin(fill * Math.PI) * -50), 10);
          } else {
            opacity = ".5";
          }
        } else {
          if(binary.charAt(index) != prev.charAt(index) && fill <= .5) {
            opacity = "." + parseInt((50 + Math.sin(fill * Math.PI) * 50), 10);
          } else {
            opacity = "1";
          }
        }
        // Building gradient to use
        gradient = ctx.createLinearGradient(x, y + 15, x , y - 10);
        for(var k = 0; k < colors.length; k++) {
          gradient.addColorStop(k, "rgba(" + colors[k] + ", " + opacity + ")");
        }
        // Draw square
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, 10, 10);
        
        // Outline square
        ctx.strokeStyle = "rgb(" + colors[1] + ")";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, 10, 10);
        ctx.stroke();
      }
      // Shifting for the next square
      x += 15;
      index++;
    }
    x -= 15 * row;
    y += 15;
  }
}

var fill;
var tempBinary1 = "";
var tempBinary2 = "111111111111111111111111";
var ctx = document.getElementById('canvas').getContext('2d');

function draw(){  
  //Initializing variables
  var now = new Date();
  
  //Time!
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var milli = now.getMilliseconds();
  
  //Binary string of everything combined
  var fullBinary = getBinary(hour / 10, 4) + getBinary(hour % 10, 4) +
                   getBinary(minute / 10, 4) + getBinary(minute % 10, 4) +
                   getBinary(second / 10, 4) + getBinary(second % 10, 4);
  
  //tB1 is current binary string, tB2 is the previous
  if(tempBinary1 != fullBinary) {
    tempBinary2 = tempBinary1;
    tempBinary1 = fullBinary;
  }
  
  //Used by the SquareSet
  fill = milli / 1000;
  
  //Starting pos
  var x = 85;
  var y = 10;
  
  //Initial Colors
  var colors = ["101, 220, 136", "40, 178, 82"];
  
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0,0,480,360); // clear canvas
  
  //Draw hours
  drawSquareSet(x, y, 2, 2, fullBinary.substring(0, 4),
                tempBinary2.substring(0, 4), colors); x += 40;
  drawSquareSet(x, y, 2, 2, fullBinary.substring(4, 8),
                tempBinary2.substring(4, 8), colors); x += 80;
  
  //Draw minutes
  colors = ["98, 218, 194", "56, 208, 178"];
  drawSquareSet(x, y, 2, 2, fullBinary.substring(8, 12), 
                tempBinary2.substring(8, 12), colors); x += 40;
  drawSquareSet(x, y, 2, 2, fullBinary.substring(12, 16), 
                tempBinary2.substring(12, 16), colors); x += 80;
  
  //Draw seconds
  colors = ["101, 124, 220", "31, 52, 137"];
  drawSquareSet(x, y, 2, 2, fullBinary.substring(16, 20), 
                tempBinary2.substring(16, 20), colors); x += 40;
  drawSquareSet(x, y, 2, 2, fullBinary.substring(20, 24),
                tempBinary2.substring(20, 24), colors);
  
  //Draw milliseconds
  colors = ["101, 124, 220", "31, 52, 137"];
  ctx.fillStyle = "rgba(" + colors[0] + ", .2)"; 
  ctx.fillRect(85, y+40, 305, 3); //This is the faint bar
  
  ctx.fillStyle =  "rgba(" + colors[0] + ", " + (1 - milli/1000) + ")"; 
  ctx.fillRect(85, y+40, (milli/1000) * 305, 3); //This is the bar that scales
  
  window.requestAnimationFrame(draw);
}

init();