var canvas;
var context;
var paintButton;
var image = document.getElementById('pompa');
  
function init() {
  var image = document.getElementById('SourceImage');
  paintButton = document.getElementById('PaintButton');
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');

  paintButton.addEventListener('click', function () {
    drawImage(image);
    // Or
    // var image = new Image();
    // image.onload = function () {
    //    drawImage(image);
    // }
    // image.src = 'image.jpg';
  });
}

function drawImage(image) {
  // Set the canvas the same width and height of the image
  canvas.width = image.width;
  canvas.height = image.height;

  context.drawImage(image, 0, 0);
}

window.addEventListener('load', init);


window.addEventListener("dragover", function (e) {
  e.preventDefault();
}, false);

document.getElementById('dropImageContainer').addEventListener("drop", function(e) {
  e.preventDefault();

  if (e.target.className === 'dropImageArea') {
    e.target.style.backgroundColor = "red";
    let dt = e.dataTransfer;
    let files = dt.files;
    let reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onloadend = function() {
      let img = document.createElement('img');
      img.src = reader.result;
      //document.getElementById('canvasContainer').appendChild(img);
      drawImage(image);
    }
  }

}, false);

$(function() {
    
    $('img').mousemove(function(e) {
        
        if(!this.canvas) {
            this.canvas = $('<canvas />')[0];
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
        }
        
        var pixelData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
        
        $('#output').html('R: ' + pixelData[0] + '<br>G: ' + pixelData[1] + '<br>B: ' + pixelData[2] + '<br>A: ' + pixelData[3]);
 
    }); 
});
