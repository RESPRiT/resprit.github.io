var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audio = document.getElementById('audio');
var audioSrc = audioCtx.createMediaElementSource(audio);
var analyser = audioCtx.createAnalyser();
audioSrc.connect(analyser);
var gainNode = audioCtx.createGain();
gainNode.gain.volume = 1;
audioSrc.connect(gainNode);
gainNode.connect(audioCtx.destination);
var now = new Date();
var minute = now.getMinutes();
var second = now.getSeconds();
var milli = now.getMilliseconds();

function init() {
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

function draw() {
    var now = new Date();
    minute = now.getMinutes();
    second = now.getSeconds();
    milli = now.getMilliseconds();

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0,0,canvas.width,canvas.height); // clear canvas

    analyser.fftSize = 256;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    console.log(dataArray);

    var end = Math.max(canvas.width, canvas.height) / 10;
    for(var i = 0; i < end; i++) {
        var sin = 1;//Math.sin(((minute * 60 + second + milli / 1000) * 3 + Math.PI * 2 - i) / 10);
        var sound = Math.sin(dataArray[(i) % bufferLength] / 256.0 * Math.PI / 2);
        ctx.lineWidth = Math.sin(((minute * 60 + second + milli / 1000) * 3 + Math.PI * 2 - i) / 6) / 2 + .6;
        drawSpinSquare((i * 10 + Math.pow(1.2, i) + (sin + 1) * i * 2) * ((.4 + .5 * sound )), i + 5);
        ctx.strokeStyle = 'rgba(255,255,255, 0.' + Math.max((50 - i * 2), 10) + ")";
    }
/*
    ctx.lineWidth = 2;

    ctx.beginPath();

    var sliceWidth = canvas.width * 1.0 / bufferLength;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {

        var v = dataArray[i] / 128.0;
        var y = v * canvas.height/2;

        if(i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
 */
    window.requestAnimationFrame(draw);

}

audio.play();
init();

