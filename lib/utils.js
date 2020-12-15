  function rgbaArray(rgba) {
    var r = /\d+/g;
    var colorArr = [];
    var i;
    for (i = 0; i < 4; i++) {
      if (i == 3) {
        colorArr.push(parseFloat(r.exec(rgba)));
      } else {
        colorArr.push(parseInt(r.exec(rgba)));
      }
    }
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
    var r = /\d+/g'
    var i;
    var colorArr = [];
    for (i = 0; i < 3; i++) {
      colorArr.push(parseInt(r.exec(rgb)));
    }
    return colorArr;
  }

  function hexStr(arr) {
    return "#" + arr[0].toString(16) + arr[1].toString(16) + arr[2].toString(16);
  }

  function makeOpaque(color, back) {
    var colorArr;
    var result = [];
    var i;
    var channel = 0;
    bg = rgbArray(back);
    if (color.indexOf("rgba") != -1) {
      colorArr = rgbaArray(color).slice();
    } else if (color[0] == "#" && color.length == 9) {
      colorArr = hexArray(color).slice();
    } else {
      return color;
    }
    for (i = 0; i < 3; i++) {
      channel = back[i] * (1 - colorArr[3]) + colorArr[i] * colorArr[3];
      channel = Math.floor(channel);
      if (channel > 255) {
        channel = 255;
      }
      result.push(channel);
    }
    return hexStr(result);
  }

  module.exports= {makeOpaque,hexStr,rgbArray,hexArray,rgbaArray};
