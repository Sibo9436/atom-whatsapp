  function rgbaArray(rgba) {
    var intRegExp = /\d+/g;
    var floatRegExp = /\d+\.\d+/g;
    var colorArr = [];
    var i;
    for (i = 0; i < 3; i++, colorArr.push(parseInt(intRegExp.exec(rgba))));
    colorArr.push(parseFloat(floatRegExp.exec(rgba)));
    return colorArr;
  }

  function hexArray(hex) {
    var colorArr = [];
    colorArr.push(parseInt(hex[1] + hex[2], 16));
    colorArr.push(parseInt(hex[3] + hex[4], 16));
    colorArr.push(parseInt(hex[5] + hex[6], 16));
    colorArr.push(parseInt(hex[7] + hex[8], 16) / 255);
    return colorArr;
  }

  function rgbArray(rgb) {
    var intRegExp = /\d+/g;
    var i;
    var colorArr = [];
    for (i = 0; i < 3; i++, colorArr.push(parseInt(intRegExp.exec(rgb))));
    return colorArr;
  }

  function rgbStr(arr) {
    return "rgb(" + String(arr[0]) + "," + String(arr[1]) + "," + String(arr[2]) + ")";
  }

  function makeOpaque(color, back) {
    var colorArr;
    var result = [];
    var i;
    var channel = 0;
    var bg = rgbArray(back).slice();
    if (color.indexOf("rgba") != -1) {
      colorArr = rgbaArray(color).slice();
    } else if (color[0] == "#" && color.length == 9) {
      colorArr = hexArray(color).slice();
    } else {
      return color;
    }
    for (i = 0; i < 3; i++) {
      channel = bg[i] * (1 - colorArr[3]) + colorArr[i] * colorArr[3];
      channel = Math.floor(channel);
      if (channel > 255) {
        channel = 255;
      }
      result.push(channel);
    }
    return rgbStr(result);
  }

  module.exports= {makeOpaque,rgbStr,rgbArray,hexArray,rgbaArray};
