import GraphicsContext, { GraphicsApi } from "../graphics/graphics_context";

export default class GraphicDevice {
    private _canvas: HTMLCanvasElement;
    private _context: GraphicsContext;
    private _isFullscreen: boolean = false;

    public constructor(canvasId: string, api: GraphicsApi) {
        this._canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        // assert(this._canvas != null, `Cannot find any canvas with id ${canvasId}`);

        this._context = new GraphicsContext(this._canvas, api);
    }

    public resize(width: number, height: number): void {
        if (width > 0 && height > 0) {
            this._canvas.width = width;
            this._canvas.height = height;
            this._isFullscreen = false;
        }
    }

    public fullscreen(): void {
        this.resize(window.innerWidth, window.innerHeight);
        this._isFullscreen = true;
    }

    public get canvas(): HTMLCanvasElement { return this._canvas; }
    public get context(): GraphicsContext { return this._context; }
    public get isFullscreen(): boolean { return this._isFullscreen; }
}