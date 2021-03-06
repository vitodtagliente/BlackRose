import { Core, Debug, Game, Graphics, Input, Scene } from '..';
import { Section } from '../debug';
import { ContextFactory } from '../graphics';
import { Camera } from '../scene';
import Canvas from './canvas';
import Stats from './stats';

export default class Application
{
    private static _main: Application;
    public static get main(): Application { return Application._main; }

    private _canvas: Canvas;
    private _context: Graphics.Context;
    private _renderer: Graphics.Renderer;
    private _time: Core.Time;
    private _world: Scene.World;
    private _stats: Stats;
    private _inspector: Debug.Inspector;
    private _keyboard: Input.Keyboard;
    private _mouse: Input.Mouse;
    private _touch: Input.Touch;
    private _gameMode: Game.GameMode;
    public camera: Camera;

    public constructor(canvasId: string, api: Graphics.API)
    {
        Application._main = this;
        
        this._canvas = new Canvas(canvasId);
        this._context = ContextFactory.get(this.canvas, api);
        this._context.viewport(this._canvas.width, this._canvas.height);
        this._canvas.onResize.on(() =>
        {
            this._context.viewport(this._canvas.width, this._canvas.height);
        });
        this._renderer = new Graphics.Renderer(this._context);
        this._time = new Core.Time();
        this._world = new Scene.World();
        this._stats = new Stats();
        this._inspector = new Debug.Inspector();
        this._keyboard = new Input.Keyboard(this.canvas);
        this._keyboard.plugin();
        this._mouse = new Input.Mouse(this.canvas);
        this._mouse.plugin();
        this._touch = new Input.Touch(this.canvas);
        this._touch.plugin();

        {
            const rendererSection: Section = this._inspector.addSection('renderer');
            rendererSection.color('clear', this._renderer.background);
        }
    }

    public get canvas(): Canvas { return this._canvas; }
    public get context(): Graphics.Context { return this._context; }
    public get renderer(): Graphics.Renderer { return this._renderer; }
    public get time(): Core.Time { return this._time; }
    public get world(): Scene.World { return this._world; }
    public get debug(): Debug.Inspector { return this._inspector; }
    public get keyboard(): Input.Keyboard { return this._keyboard; }
    public get mouse(): Input.Mouse { return this._mouse; }
    public get touch(): Input.Touch { return this._touch; }
    public get gameMode(): Game.GameMode { return this._gameMode; }

    public run(gameMode: Game.GameMode): void
    {
        this._gameMode = gameMode;
        this._gameMode.init();
        this.loop();
        this._gameMode.uninit();
    }

    private loop(): void 
    {
        this._time.tick();
        const deltaTime: number = this._time.deltaTime;

        this._renderer.begin();
        this._world.update(deltaTime);
        this._gameMode.update(this.world, deltaTime);
        if (this.camera)
        {
            this.camera.compute();
            this._context.camera = this.camera.matrix;
        }
        this._world.render(this._renderer);
        this._renderer.flush();

        this._stats.update();

        requestAnimationFrame(() => this.loop());
    }
}