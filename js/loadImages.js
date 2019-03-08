; (function ($) {
  function readMultipleFiles(evt) {
    //Retrieve all the files from the FileList object
    var files = evt.target.files;

    if (files) {
      for (var i = 0, f; f = files[i]; i++) {
        var r = new FileReader();
        r.onload = (function (f) {
          return function (e) {
            var contents = e.target.result;
            console.log("Got the file.n name: " + f.name + "n type: " + f.type + "n size: " + f.size + " bytesn starts with: " + contents.substr(1, contents.indexOf("n")));
          };
        })(f);

        r.readAsText(f);
      }
    } else {
      alert("Failed to load files");
    }
  }

  $('#fileinput').on('change', readMultipleFiles, false);


  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<img class="uploaded" src = "img/' + (f.name) + '">');
    }
    document.getElementById('grid-container').innerHTML = output.join('');
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);

}(jQuery));
