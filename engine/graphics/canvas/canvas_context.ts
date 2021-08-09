import { Color } from "..";
import { Canvas } from "../../application";
import API from "../api";
import Context from "../context";

export default class CanvasContext extends Context
{
    private _context: CanvasRenderingContext2D;

    public constructor(canvas: Canvas)
    {
        super(canvas, API.Canvas);
        this._context = canvas.canvas.getContext(this.api) as CanvasRenderingContext2D;
    }

    public get context(): CanvasRenderingContext2D { return this._context; }

    public clear(color: Color): void
    {
        this.context.fillStyle = color.name;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}