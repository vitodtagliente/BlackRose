import * as Core from './core/core';
import * as Graphics from './graphics/graphics';

export default class Engine
{
    private _device: Core.GraphicDevice;

    public constructor(canvasId: string, api: Graphics.API)
    {
        this._device = new Core.GraphicDevice(canvasId, api);
    }

    public get device(): Core.GraphicDevice { return this._device; }
}