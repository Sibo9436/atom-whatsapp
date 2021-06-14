// Create an rgb or rgba array from hex value
const decomposeHEX = (hex) => {
  hex = hex.trim();
  let reg;
  let colorArr;
  if (hex.length > 4) {
    reg = /[a-f0-9]{2}/ig;
    colorArr = hex.match(reg).map(i => parseInt(i, 16));
    if (colorArr.length == 4) colorArr[3] = colorArr[3] / 255;
  } else {
    reg = /[a-f0-9]/ig;
    colorArr = hex.match(reg).map(i => parseInt(i + i, 16));
  }
  return colorArr;
}

// Create an rgb array from rgb string
const decomposeRGB = (rgb) => {
  const re = /\d+/g;
  const arrayColor = rgb.match(re).map(
    strnum => parseInt(strnum)
  );
  return arrayColor;
}

// Create rgba array form rgba string
const decomposeRGBA = (rgba) => {
  const intre = /\d+/g;
  const floatre = /\d+\.\d+/g;
  const arr = rgba.match(intre);
  const colorArr = arr.slice(0,3).map(i=>parseInt(i));
  colorArr.push(parseFloat(floatre.exec(rgba)));
  return colorArr;
}

// Convert builtin color_names to rgb
// thanks to https://css-tricks.com/converting-color-spaces-in-javascript/ for the code
const builtinToRGB = (colror_name) => {
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

// Transform given array as string "r,g,b"
const stringifyColor = (colorArr) => {
  return "" + colorArr[0] + "," + colorArr[1] + "," + colorArr[2];
}

// Check if color is opaque, otherwise make it so
const opacify = (color, base) => {
  const rgbre = /rgb/;
  const rgbare = /rgba/;
  const hexre = /^\s*#/;
  const intre = /\d+/g;

  if (rgbare.exec(color)) {
    colorArr = decomposeRGBA(color);
  } else if (rgbre.exec(color)) {
    colorArr = decomposeRGB(color);
  } else if (hexre.exec(color)) {
    colorArr = decomposeHEX(color);
  } else {
    named_color = builtinToRGB(color);
    colorArr = decomposeRGB(named_color);
  }

  if (colorArr.length != 4) return stringifyColor(colorArr);
  let baseArr = base.match(intre).map(i => parseInt(i));
  let opaqueArr = [];
  for (let i = 0; i < 3; i++) {
    opaqueArr[i] = baseArr[i] * (1 - colorArr[3]) + colorArr[i] * colorArr[3];
    opaqueArr[i] >= 255 ? opaqueArr[i] = 255 :
      opaqueArr[i] = Math.round(opaqueArr[i]);
  }
  return stringifyColor(opaqueArr);
}

module.exports = {opacify, decomposeHEX, stringifyColor};
