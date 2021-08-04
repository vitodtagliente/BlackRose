import { API } from "../api";
import Context from "../context";

export default class CanvasContext extends Context
{
    private _canvasContext: CanvasRenderingContext2D;

    public constructor(canvas: HTMLCanvasElement)
    {
        super(canvas, API.Canvas);
        this._canvasContext = this.context as CanvasRenderingContext2D;
    }

    public clear(color: string): void
    {
        this._canvasContext.fillStyle = color;
        this._canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}