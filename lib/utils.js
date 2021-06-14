// Almost any function in this file, apart from opacify, are taken from the
// following article with just a little adaptation for our needs:
// 'https://css-tricks.com/converting-color-spaces-in-javascript/'

function hexToRGB(h) {
  let r = 0, g = 0, b = 0;
  h = h.trim();

  if (h.length == 4) {
    r = parseInt(2*h[1], 16);
    g = parseInt(2*h[2], 16);
    b = parseInt(2*h[3], 16);
  } else if (h.length == 7) {
    r = parseInt(h[1] + h[2], 16);
    g = parseInt(h[3] + h[4], 16);
    b = parseInt(h[5] + h[6], 16);
  }

  return [r, g, b];
}

function hexAToRGBA(h) {
  let r = 0, g = 0, b = 0, a = 1;
  h = h.trim();

  if (h.length == 5) {
    r = parseInt(2*h[1], 16);
    g = parseInt(2*h[2], 16);
    b = parseInt(2*h[3], 16);
    a = parseInt(2*h[4], 16) / 255;
  } else if (h.length == 9) {
    r = parseInt(h[1] + h[2], 16);
    g = parseInt(h[3] + h[4], 16);
    b = parseInt(h[5] + h[6], 16);
    a = parseInt(h[7] + h[8], 16) / 255;
  }

  return [r, g, b, a];
}

function RGBtoArr(rgb) {
  const reg = RegExp('\\d+', 'g');
  const arr = rgb.match(reg)
    .map(str => parseInt(str));
  return arr;
}

function RGBAtoArr(rgba) {
  const int_reg = RegExp('\\d+', 'g');

  let int_arr = rgba.match(int_reg);
  let arr = int_arr.slice(0,3).map(i => parseInt(i));
  arr.push(parseFloat(int_arr[3] + "." + int_arr[4]));

  return arr;
}

function nameToRGB(name) {
  // Create fake div
  let fakeDiv = document.createElement("div");
  fakeDiv.style.color = name;
  document.body.appendChild(fakeDiv);

  // Get color of div
  let cs = window.getComputedStyle(fakeDiv),
    pv = cs.getPropertyValue("color");

  // Remove div after obtaining desired color value
  document.body.removeChild(fakeDiv);

  return pv;
}

function arrToString(arr) {
  return "" + arr[0] + ", " + arr[1] + ", " + arr[2];
}

function opacify(color, base) {
  // here color is always an rgba array, base an rgb array
  let opaque = [0, 0, 0];
  const alpha = color[3];

  for (i in [0,1,2]) {
    opaque[i] = Math.round((base[i] + alpha*color[i]) / (1 + alpha));
  }

  return opaque;
}

// FIXME: somewhere the code is producing NaN
function handleColor(color, base) {
  // color and base are strings, here
  color = color.trim();
  base = base.trim();

  //check what kind of color we have, and behave accordingly
  const rgba_reg = RegExp('rgba');
  const rgb_reg = RegExp('rgb');
  const hex_reg = RegExp('^#');

  if (rgba_reg.test(color)) {
    arr = RGBAtoArr(color);
  } else if (rgb_reg.test(color)) {
    arr = RGBtoArr(color);
  } else if (hex_reg.test(color)) {
    if ([4,7].includes(color.length))
      arr = hexToRGB(color);
    else if ([5,9].includes(color.length))
      arr = hexAToRGBA(color);
  } else {
    arr = RGBtoArr(nameToRGB(color));
  }

  if (arr.length != 4) return arrToString(arr);
  else return arrToString(opacify(arr, RGBAtoArr(base)));
}

module.exports = {handleColor, hexToRGB, arrToString};
