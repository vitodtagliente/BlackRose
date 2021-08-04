import { API } from "./api";

export default abstract class Context
{
    private _canvas: HTMLCanvasElement;
    private _api: API;
    private _context: RenderingContext;

    public constructor(canvas: HTMLCanvasElement, api: API)
    {
        this._canvas = canvas;
        this._api = api;
        this._context = canvas.getContext(api);
    }

    public get api(): API { return this._api; }
    public get canvas(): HTMLCanvasElement { return this._canvas; }
    public get context(): RenderingContext { return this._context; }

    public abstract clear(color: string): void;
}