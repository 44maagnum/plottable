///<reference path="../reference.ts" />

module Plottable {
export module Component {
  export class Group extends AbstractComponentContainer {

    /**
     * Constructs a GroupComponent.
     *
     * A GroupComponent is a set of Components that will be rendered on top of
     * each other. When you call Component.merge(Component), it creates and
     * returns a GroupComponent.
     *
     * @constructor
     * @param {Component[]} components The Components in the Group (default = []).
     */
    constructor(components: AbstractComponent[] = []){
      super();
      this.classed("component-group", true);
      components.forEach((c: AbstractComponent) => this._addComponent(c));
    }

    public _requestedSpace(offeredWidth: number, offeredHeight: number): _SpaceRequest {
      var requests = this._components.map((c: AbstractComponent) => c._requestedSpace(offeredWidth, offeredHeight));
      return {
        width : _Util.Methods.max(requests, (request: _SpaceRequest) => request.width ),
        height: _Util.Methods.max(requests, (request: _SpaceRequest) => request.height),
        wantsWidth : requests.map((r: _SpaceRequest) => r.wantsWidth ).some((x: boolean) => x),
        wantsHeight: requests.map((r: _SpaceRequest) => r.wantsHeight).some((x: boolean) => x)
      };
    }

    public merge(c: AbstractComponent): Group {
      this._addComponent(c);
      return this;
    }

    public _computeLayout(xOrigin?: number,
                          yOrigin?: number,
                   availableWidth?: number,
                  availableHeight?: number): Group {
      super._computeLayout(xOrigin, yOrigin, availableWidth, availableHeight);
      this._components.forEach((c) => {
        c._computeLayout(0, 0, this.width(), this.height());
      });
      return this;
    }

    public _isFixedWidth(): boolean {
      return this._components.every((c) => c._isFixedWidth());
    }

    public _isFixedHeight(): boolean {
      return this._components.every((c) => c._isFixedHeight());
    }
  }
}
}
