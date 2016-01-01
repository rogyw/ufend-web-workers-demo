importScripts('imageManips.js');

onmessage = function(e) {
  var a, b, g, i, j, length, pixel, r, ref;
  var type = e.data[0];
  var imageData = e.data[1];

  try {
    console.log('Worker Has Started.');
    length = imageData.data.length / 4;
    var manipulatePixel = getManipulateFunc(type);
    for (i = j = 0, ref = length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      r = imageData.data[i * 4 + 0];
      g = imageData.data[i * 4 + 1];
      b = imageData.data[i * 4 + 2];
      a = imageData.data[i * 4 + 3];
      pixel = manipulatePixel(r, g, b, a);
      imageData.data[i * 4 + 0] = pixel[0];
      imageData.data[i * 4 + 1] = pixel[1];
      imageData.data[i * 4 + 2] = pixel[2];
      imageData.data[i * 4 + 3] = pixel[3];
    }
    console.log('Worker Has Finsihed.');
    postMessage(imageData);
    console.log('Worker Has sent a reply.');

  } catch (e) {
    function ManipulationException(message) {
      this.name = "ManipulationException";
      this.message = message;
    };
    throw new ManipulationException('Image manipulation error');
    postMessage(undefined);
    console.log('Worker Has an error.');
  }
}
