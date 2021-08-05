import { Core, Graphics } from '..';
import { ContextFactory } from '../graphics';
import Canvas from './canvas';

export default class Application
{
    private _canvas: Canvas;
    private _context: Graphics.Context;
    private _time: Core.Time;

    public constructor(canvasId: string, api: Graphics.API)
    {
        this._canvas = new Canvas(canvasId);
        this._context = ContextFactory.get(this.canvas, api);
        this._time = new Core.Time();
    }

    public get canvas(): Canvas { return this._canvas; }
    public get context(): Graphics.Context { return this._context; }

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