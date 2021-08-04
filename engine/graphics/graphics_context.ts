
export enum GraphicsApi {
    Canvas = '2d',
    WebGL = 'webgl'
}

export default class GraphicsContext {
    private _api: GraphicsApi;
    private _context: RenderingContext;

    public constructor(canvas: HTMLCanvasElement, api: GraphicsApi) {
        this._api = api;
        this._context = canvas.getContext(api);
    }

    public get api(): GraphicsApi { return this._api; }
    public get context(): RenderingContext { return this._context; }

    public clear(color: string): void {
        var canvasContext: CanvasRenderingContext2D = this._context as CanvasRenderingContext2D;
        console.log(canvasContext);
        canvasContext.fillStyle = color;
        canvasContext.fillRect(0, 0, 100, 100);
    }
}