'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);

  var maxTime = -1;
  var indexMaxTime = -1;

  for (var i = 0; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
      indexMaxTime = i;
    }
  }

  ctx.fillText('Худшее время: ' + Math.floor(maxTime) + 'мс у игрока ' + names[indexMaxTime], 120, 60);
  // ctx.fillRect(120, 80, 40, 150);

  var histogramHeight = 150;
  var step = histogramHeight / (maxTime - 0);

  var barWidth = 40;
  var indent = 50;
  var lineHeight = 18;
  var initialX = 120;
  var initialY = 100;

  for (i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'black';
    }
    ctx.fillRect(initialX + ((barWidth + indent) * i), initialY, barWidth, histogramHeight);
    ctx.fillStyle = 'white';
    ctx.fillRect(initialX + ((barWidth + indent) * i), initialY, barWidth, (maxTime - times[i]) * step);
    ctx.fillStyle = 'black';
    ctx.fillText(Math.floor(times[i]), initialX + ((barWidth + indent) * i), initialY - lineHeight + (maxTime - times[i]) * step);
    ctx.fillText(names[i], initialX + ((barWidth + indent) * i), initialY + histogramHeight + lineHeight);
  }
};
