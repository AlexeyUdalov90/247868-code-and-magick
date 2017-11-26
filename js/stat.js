'use strict';

window.renderStatistics = function (ctx, names, times) {

  var drawBackground = function (x, y, width, height) {
    ctx.beginPath();
    ctx.moveTo(x, y);

    var stepHorizontal = width / 7;
    var stepVertical = height / 9;
    var x1 = x;
    var x2 = x;
    for (var i = 0; i < 7; i++) {
      x2 += stepHorizontal;
      ctx.bezierCurveTo(x1, 0, x2, 0, x2, y);
      x1 = x2;
    }

    var y1 = y;
    var y2 = y;
    for (i = 0; i < 9; i++) {
      y2 += stepVertical;
      ctx.bezierCurveTo(x2 + 10, y1, x2 + 10, y2, x2, y2);
      y1 = y2;
    }

    x1 = x2;
    for (i = 0; i < 7; i++) {
      x2 -= stepHorizontal;
      ctx.bezierCurveTo(x1, y2 + 10, x2, y2 + 10, x2, y2);
      x1 = x2;
    }

    y1 = y2;
    for (i = 0; i < 9; i++) {
      y2 -= stepVertical;
      ctx.bezierCurveTo(x2 - 10, y1, x2 - 10, y2, x2, y2);
      y1 = y2;
    }

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
  // var texts = ['Ура вы победили!', 'Список результатов:'];

  var writeText = function (x, y, arr) {
    for (var i = 0; i < arr.length; i++) {
      ctx.fillText(arr[i], x, y);
      y += 20;
    }
  };

  var getColor = function () {
    var opacity = Math.random() * (1 - 0.1) + 0.1;
    return 'rgba(0, 0, 255, ' + opacity.toFixed(1) + ')';
  };

  var getRectColor = function (name) {
    return (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : getColor();
  };

  var drawColumn = function (x, y, width, height, name, time) {
    ctx.fillStyle = getRectColor(name);
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = 'black';
    ctx.fillText(Math.floor(time), x, y - lineHeight / 2);
    ctx.fillText(name, x, y + height + lineHeight);
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
  writeText(120, 40, ['Ура вы победили!', 'Список результатов:']);

  for (var i = 0; i < times.length; i++) {
    var x = initialX + (barWidth + indent) * i;
    var y = initialY + (maxTime - times[i]) * step;
    var height = times[i] * step;
    drawColumn(x, y, barWidth, height, names[i], times[i]);
  }
};
