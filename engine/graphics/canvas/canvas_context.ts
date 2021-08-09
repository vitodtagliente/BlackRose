import { Color } from "..";
import { Canvas } from "../../application";
import { Vector3 } from "../../math";
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

    public drawCircle(position: Vector3, radius: number, color: Color): void
    {
        this._context.beginPath();
        this._context.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
        this._context.fillStyle = color.name;
        this._context.fill();
    }
}