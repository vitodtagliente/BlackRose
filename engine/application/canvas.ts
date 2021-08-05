export default class Canvas
{
    private _canvas: HTMLCanvasElement;
    private _isFullscreen: boolean = false;

    public constructor(id: string)
    {
        this._canvas = document.getElementById(id) as HTMLCanvasElement;
    }

    public resize(width: number, height: number): void
    {
        if (width > 0 && height > 0)
        {
            this._canvas.width = width;
            this._canvas.height = height;
            this._isFullscreen = false;
        }
    }

    public fullscreen(): void
    {
        this.resize(window.innerWidth, window.innerHeight);
        this._isFullscreen = true;
    }

    public get canvas(): HTMLCanvasElement { return this._canvas; }
    public get isFullscreen(): boolean { return this._isFullscreen; }
    public get isValid(): boolean { return this.canvas != null; }

    public get width(): number { return this.canvas.width; }
    public get height(): number { return this.canvas.height; }
}