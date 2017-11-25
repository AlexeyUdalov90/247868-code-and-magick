'use strict';

window.renderStatistics = function (ctx, names, times) {

  var drawBackground = function (x, y, width, height) {
    var drawTop = function () {
      var x1 = x;
      var x2 = x + 60;
      for (var i = 0; i < 7; i++) {
        ctx.bezierCurveTo(x1, 0, x2, 0, x2, y);
        x1 = x2;
        x2 += 60;
      }
    };

    var drawRight = function () {
      var y1 = y;
      var y2 = y + 30;
      for (var i = 0; i < 9; i++) {
        ctx.bezierCurveTo(x + width + 10, y1, x + width + 10, y2, x + width, y2);
        y1 = y2;
        y2 += 30;
      }
    };

    var drawBottom = function () {
    // ctx.bezierCurveTo(520, 290, 460, 290, 460, 280);
      var x1 = x + width;
      var x2 = x1 - 60;
      for (var i = 0; i < 7; i++) {
        ctx.bezierCurveTo(x1, y + height + 10, x2, y + height + 10, x2, y + height);
        x1 = x2;
        x2 -= 60;
      }
    };

    var drawLeft = function () {
      var y1 = y + height;
      var y2 = y1 - 30;
      for (var i = 0; i < 9; i++) {
        ctx.bezierCurveTo(x - 10, y1, x - 10, y2, x, y2);
        y1 = y2;
        y2 -= 30;
      }
    };

    ctx.beginPath();
    ctx.moveTo(x, y);
    drawTop();
    drawRight();
    drawBottom();
    drawLeft();
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };

  var findMaxItem = function (array) {
    var max = -1;
    for (var i = 0; i < array.length; i++) {
      if (array[i] > max) {
        max = array[i];
      }
    }
    return max;
  };

  var maxTime = findMaxItem(times);

  var histogramHeight = 150;
  var step = histogramHeight / (maxTime - 0);

  var barWidth = 40;
  var indent = 50;
  var lineHeight = 18;
  var initialX = 120;
  var initialY = 100;

  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'white';
  drawBackground(100, 10, 420, 270);

  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowColor = 'transparent';

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов: ', 120, 60);

  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var opacity = 0;
      while (opacity === 0) {
        opacity = Math.floor(Math.random() * 10);
      }
      opacity /= 10;
      var color = 'rgba(30, 0, 255, ' + opacity + ')';
      ctx.fillStyle = color;
    }
    ctx.fillRect(initialX + ((barWidth + indent) * i), initialY, barWidth, histogramHeight);
    ctx.fillStyle = 'white';
    ctx.fillRect(initialX + ((barWidth + indent) * i), initialY, barWidth, (maxTime - times[i]) * step);
    ctx.fillStyle = 'black';
    ctx.fillText(Math.floor(times[i]), initialX + ((barWidth + indent) * i), initialY - lineHeight + (maxTime - times[i]) * step);
    ctx.fillText(names[i], initialX + ((barWidth + indent) * i), initialY + histogramHeight + lineHeight);
  }
};
