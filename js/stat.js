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

  var maxTime = times.reduce(function (max, element) {
    return max < element ? element : max;
  });
  var histogramHeight = 150;
  var step = histogramHeight / (maxTime - 0);
  var barWidth = 40;
  var indent = 50;
  var lineHeight = 18;
  var initialX = 120;
  var initialY = 100;
  var texts = ['Ура вы победили!', 'Список результатов:'];

  var writeText = function (arr, x, y) {
    for (var i = 0; i < arr.length; i++) {
      ctx.fillText(arr[i], x, y);
      y += 20;
    }
  };

  var getRectColor = function (name) {
    var rgba = 'rgba(255, 0, 0, 1)';
    if (name !== 'Вы') {
      var opacity = 0;
      while (opacity === 0) {
        opacity = Math.floor(Math.random() * 10);
      }
      rgba = 'rgba(0, 0, 255, ' + opacity / 10 + ')';
    }
    return rgba;
  };

  var drawColumn = function (x, y, width, height) {
    ctx.fillRect(x, y, width, height);
  };

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
  writeText(texts, 120, 40);

  for (var i = 0; i < times.length; i++) {
    var x = initialX + (barWidth + indent) * i;
    var y = initialY + (maxTime - times[i]) * step;
    var height = times[i] * step;

    ctx.fillStyle = getRectColor(names[i]);
    drawColumn(x, y, barWidth, height);
    ctx.fillStyle = 'black';
    ctx.fillText(Math.floor(times[i]), x, y - lineHeight / 2);
    ctx.fillText(names[i], x, y + height + lineHeight);
  }
};
