function rgbaArray(rgba) {
	var intRegExp = /\d+/g;
	var floatRegExp = /\d+\.\d+/g;
	const arr= rgba.match(intRegExp);
	const colorArr = arr.slice(0,3).map(i=>parseInt(i));
	colorArr.push(parseFloat(floatRegExp.exec(rgba)));
	return colorArr;
}

function hexArray(hex) {
	var colorArr = [];
	hex=hex.trim();
	colorArr.push(parseInt(hex.substr(1, 2), 16));
	colorArr.push(parseInt(hex.substr(3, 2), 16));
	colorArr.push(parseInt(hex.substr(5, 2), 16));
	if (hex.length == 9) colorArr.push(parseInt(hex.substr(7, 2), 16) / 255);
	return colorArr;
}

function rgbArray(rgb) {
	var intRegExp = /\d+/g;
	var i;
	const arr= rgb.match(intRegExp);
	const colorArr = arr.map(i=>parseInt(i));
	return colorArr;
}

function rgbStr(arr) {
	return "rgb(" + String(arr[0]) + "," + String(arr[1]) + "," + String(arr[2]) + ")";
}

function makeOpaque(color, back) {
	var colorArr;
	var result = [];
	var i=0;
	var bg;
	var channel = 0;
	if(back.indexOf("rgb")!==-1){
		bg = rgbArray(back);
	}else{
		bg = hexArray(back);
	}
	if (color.indexOf("rgba") !== -1) {
		colorArr = rgbaArray(color);
	} else if (color[0] == "#" && color.length == 9) {
		colorArr = hexArray(color);
	} else {
		return color;
	}
	for (i = 0; i < 3; i++) {
		channel = bg[i] * (1 - colorArr[3]) + colorArr[i] * colorArr[3];
		if (channel >= 255) {
			channel = 255;
		} else {
			channel = Math.round(channel);
		}
		result.push(channel);
	}
	return rgbStr(result);
}

function stupidRGB(rightColor) {
	var wrongColor;
	if (rightColor.indexOf("rgb") !== -1) {
		wrongColor = rgbArray(rightColor);
	} else {
		wrongColor = hexArray(rightColor);
	}
	return String(wrongColor[0]) + "," + String(wrongColor[1]) + "," + String(wrongColor[2]);
}

module.exports= {makeOpaque,rgbStr,hexArray,rgbArray,rgbaArray,stupidRGB};
