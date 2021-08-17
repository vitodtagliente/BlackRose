import { Color, Texture } from "..";
import { Canvas } from "../../application";
import { Vector2, Vector3 } from "../../math";
import API from "../api";
import Context from "../context";

export default class WebGLContext extends Context
{
    private _context: WebGL2RenderingContext;

    public constructor(canvas: Canvas)
    {
        super(canvas, API.Canvas);
        this._context = canvas.canvas.getContext(this.api) as WebGL2RenderingContext;
    }

    public get context(): WebGL2RenderingContext { return this._context; }

    public clear(color: Color): void
    {
        
    }

    public drawCircle(position: Vector3, radius: number, color: Color): void
    {
        
    }

    public drawTexture(position: Vector3, texture: Texture): void
    {
        
    }

    public drawSubTexture(position: Vector3, texture: Texture, origin: Vector2, end: Vector2): void
    {
        
    }
}