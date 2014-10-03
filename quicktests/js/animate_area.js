function makeData() {
  "use strict";

  return [makeRandomData(50), makeRandomData(50)];
}

function run(div, data, Plottable) {
  "use strict";

  var svg = div.append("svg").attr("height", 500);

  var doAnimate = true;

  var xScale = new Plottable.Scale.Linear();
  var xAxis = new Plottable.Axis.Numeric(xScale, "bottom");

  var yScale = new Plottable.Scale.Linear();
  var yAxis = new Plottable.Axis.Numeric(yScale, "left");

  var areaData = data[0].slice(0, 20);
  areaData[10].y = NaN;
  areaData[13].x = undefined;
  var areaRenderer = new Plottable.Plot.Area(areaData, xScale, yScale);
  areaRenderer.attr("opacity", 0.75);
  areaRenderer.animate(doAnimate);

  var areaChart = new Plottable.Component.Table([[yAxis, areaRenderer],
   [null,  xAxis]]);

  areaChart.renderTo(svg);

  var cb = function(x, y){
    var d = areaRenderer.dataset().data();
    areaRenderer.dataset().data(d);
  };

  areaRenderer.registerInteraction(
    new Plottable.Interaction.Click(areaRenderer).callback(cb)
  );
}
