///<reference path="../../reference.ts" />

module Plottable {
export module Abstract {
  export class NewStyleBarPlot<X,Y> extends NewStylePlot<X,Y> {
    public static _barAlignmentToFactor: {[alignment: string]: number} = {};
    private static DEFAULT_WIDTH = 10;
    public _baseline: D3.Selection;
    public _baselineValue = 0;
    public _barAlignmentFactor = 0;
    public _isVertical: boolean;

    public _animators: Animator.IPlotAnimatorMap = {
      "bars-reset" : new Animator.Null(),
      "bars"       : new Animator.IterativeDelay(),
      "baseline"   : new Animator.Null()
    };

    /**
     * Constructs a NewStyleBarPlot.
     *
     * @constructor
     * @param {Scale} xScale The x scale to use.
     * @param {Scale} yScale The y scale to use.
     */
    constructor(xScale: Abstract.Scale<X, number>, yScale: Abstract.Scale<Y, number>) {
      super(xScale, yScale);
      this.classed("bar-plot", true);
      this.project("fill", () => Core.Colors.INDIGO);
      // super() doesn't set baseline
      this.baseline(this._baselineValue);
    }

    public _getDrawer(key: string) {
      return new Plottable._Drawer.Rect(key);
    }

    public _setup() {
      super._setup();
      this._baseline = this._renderArea.append("line").classed("baseline", true);
    }

    public _paint() {
      super._paint();

      var primaryScale: Abstract.Scale<any,number> = this._isVertical ? this._yScale : this._xScale;
      var scaledBaseline = primaryScale.scale(this._baselineValue);
      var baselineAttr: any = {
        "x1": this._isVertical ? 0 : scaledBaseline,
        "y1": this._isVertical ? scaledBaseline : 0,
        "x2": this._isVertical ? this.width() : scaledBaseline,
        "y2": this._isVertical ? scaledBaseline : this.height()
      };
      this._applyAnimatedAttributes(this._baseline, "baseline", baselineAttr);
    }

    /**
     * Sets the baseline for the bars to the specified value.
     *
     * The baseline is the line that the bars are drawn from, defaulting to 0.
     *
     * @param {number} value The value to position the baseline at.
     * @returns {NewStyleBarPlot} The calling NewStyleBarPlot.
     */
    public baseline(value: number) {
      return Abstract.BarPlot.prototype.baseline.apply(this, [value]);
    }

    public _updateDomainer(scale: Scale<any, number>) {
      return Abstract.BarPlot.prototype._updateDomainer.apply(this, [scale]);
    }

    public _generateAttrToProjector(): IAttributeToProjector {
      return Abstract.BarPlot.prototype._generateAttrToProjector.apply(this);
    }

    public _updateXDomainer() {
      return Abstract.BarPlot.prototype._updateXDomainer.apply(this);
    }
    public _updateYDomainer() {
      return Abstract.BarPlot.prototype._updateYDomainer.apply(this);
    }
  }
}
}