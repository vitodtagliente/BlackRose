import * as Canvas from './canvas/canvas';

export enum GraphicsApi
{
    Canvas = '2d',
    WebGL = 'webgl'
}

export default abstract class GraphicsContext
{
    private _canvas: HTMLCanvasElement;
    private _api: GraphicsApi;
    private _context: RenderingContext;

    public constructor(canvas: HTMLCanvasElement, api: GraphicsApi)
    {
        this._canvas = canvas;
        this._api = api;
        this._context = canvas.getContext(api);
    }

    public get api(): GraphicsApi { return this._api; }
    public get canvas(): HTMLCanvasElement { return this._canvas; }
    public get context(): RenderingContext { return this._context; }

    public abstract clear(color: string): void;

    public static factory(canvas: HTMLCanvasElement, api: GraphicsApi): GraphicsContext
    {
        switch (api)
        {
            case GraphicsApi.Canvas: return new Canvas.CanvasGraphicsContext(canvas);
            case GraphicsApi.WebGL:
            default:
                return null;
        }
    }
}