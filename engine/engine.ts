import { time } from 'console';
import * as Core from './core/core';
import * as Graphics from './graphics/graphics';

export default class Engine
{
    private _device: Core.GraphicDevice;
    private _time: Core.Time;

    public constructor(canvasId: string, api: Graphics.API)
    {
        this._device = new Core.GraphicDevice(canvasId, api);
        this._time = new Core.Time();
    }

    public get device(): Core.GraphicDevice { return this._device; }

    public run(): void
    {
        this.loop();
    }

    private loop(): void 
    {
        this._time.tick();
        const deltaTime: number = this._time.deltaTime;
        requestAnimationFrame(() => this.loop());
    }
}