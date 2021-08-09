import { Core, Graphics, Scene } from '..';
import { ContextFactory } from '../graphics';
import Canvas from './canvas';

export default class Application
{
    private _canvas: Canvas;
    private _context: Graphics.Context;
    private _renderer: Graphics.Renderer;
    private _time: Core.Time;
    private _world: Scene.World;

    public constructor(canvasId: string, api: Graphics.API)
    {
        this._canvas = new Canvas(canvasId);
        this._context = ContextFactory.get(this.canvas, api);
        this._renderer = new Graphics.Renderer(this._context);
        this._time = new Core.Time();
        this._world = new Scene.World();
    }

    public get canvas(): Canvas { return this._canvas; }
    public get context(): Graphics.Context { return this._context; }
    public get renderer(): Graphics.Renderer { return this._renderer; }
    public get time(): Core.Time { return this._time; }
    public get world(): Scene.World { return this._world; }

    public run(): void
    {
        this.loop();
    }

    private loop(): void 
    {
        this._time.tick();
        const deltaTime: number = this._time.deltaTime;

        this._renderer.begin();
        this._world.update(deltaTime);
        this._renderer.flush();

        requestAnimationFrame(() => this.loop());
    }
}