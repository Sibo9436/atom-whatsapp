  function rgbaArray(rgba) {
    var i;
    var colorArr = [];
    var colorPH = "";
    for (i = rgba.indexOf('(') + 1; i < rgba.indexOf(','); i++) {
      colorPH += rgba[i];
    }
    colorArr.push(parseInt(colorPH));
    colorPH = "";
    rgba = rgba.substr(i);
    for (i = 0; i < rgba.indexOf(','); i++) {
      colorPH += rgba[i];
    }
    colorArr.push(parseInt(colorPH));
    colorPH = "";
    rgba = rgba.substr(i);
    for (i = 0; i < rgba.indexOf(','); i++) {
      colorPH += rgba[i];
    }
    colorArr.push(parseInt(colorPH));
    colorPH = "";
    i++;
    for (; i < rgba.indexOf(')'); i++) {
      colorPH += rgba[i];
    }
    colorArr.push(parseFloat(colorPH));
    return colorArr;
  }

  function hexArray(hex) {
    var colorArr = [];
    colorArr.push(parseInt(hex[1] + hex[2], 16));
    colorArr.push(parseInt(hex[3] + hex[4], 16));
    colorArr.push(parseInt(hex[5] + hex[6], 16))
    colorArr.push(parseInt(hex[7] + hex[8], 16) / 255);
    return colorArr;
  }

  function rgbArray(rgb) {
    var i;
    var colorArr = [];
    var colorPH = "";
    for (i = rgb.indexOf('(') + 1; i < rgb.indexOf(','); i++) {
      colorPH += rgb[i];
    }
    colorArr.push(parseInt(colorPH));
    colorPH = "";
    rgb = rgb.substr(i);
    for (i = 0; i < rgb.indexOf(','); i++) {
      colorPH += rgb[i];
    }
    colorArr.push(parseInt(colorPH));
    colorPH = "";
    i++;
    for (; i < rgb.indexOf(')'); i++) {
      colorPH += rgb[i];
    }
    colorArr.push(parseInt(colorPH));
    return colorArr;
  }

  function hexStr(arr) {
    return "#" + arr[0].toString(16) + arr[1].toString(16) + arr[2].toString(16);
  }

  function makeOpaque(color, back) {
    var isTransparentHex = color[0] == '#' && color.length == 9;
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
