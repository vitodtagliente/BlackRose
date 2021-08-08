import { Core, Graphics, Scene } from '..';
import { ContextFactory } from '../graphics';
import Canvas from './canvas';

export default class Application
{
    private _canvas: Canvas;
    private _context: Graphics.Context;
    private _time: Core.Time;
    private _world: Scene.World;

    public constructor(canvasId: string, api: Graphics.API)
    {
        this._canvas = new Canvas(canvasId);
        this._context = ContextFactory.get(this.canvas, api);
        this._time = new Core.Time();
        this._world = new Scene.World();
    }

    public get canvas(): Canvas { return this._canvas; }
    public get context(): Graphics.Context { return this._context; }
    public get world(): Scene.World { return this._world; }

    public run(): void
    {
        this.loop();
    }

    private loop(): void 
    {
        this._time.tick();
        const deltaTime: number = this._time.deltaTime;
        this._world.update(deltaTime);
        requestAnimationFrame(() => this.loop());
    }
}