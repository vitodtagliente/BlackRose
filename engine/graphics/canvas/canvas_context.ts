import { Color, Shader, ShaderProgram, ShaderType, Texture } from "..";
import { Canvas } from "../../application";
import { Image } from "../../asset";
import { Vector2, Vector3 } from "../../math";
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

    public createTexture(image: Image): Texture
    {
        return null;
    }

    public createShader(type: ShaderType, source: string): Shader
    {
        return null;
    }

    public createShaderProgram(vertexShader: Shader, fragmentShader: Shader): ShaderProgram
    {
        return null;
    }

    public clear(color: Color): void
    {
        this.context.fillStyle = color.rgba;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public viewport(width: number, height: number): void 
    {

    }

    public drawCircle(position: Vector3, radius: number, color: Color): void
    {
        this._context.beginPath();
        this._context.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
        this._context.fillStyle = color.rgba;
        this._context.fill();
    }

    public drawTexture(position: Vector3, texture: Texture): void
    {
        this._context.drawImage(texture.image.data, position.x, position.y);
    }

    public drawSubTexture(position: Vector3, texture: Texture, origin: Vector2, end: Vector2): void
    {
        this._context.drawImage(
            texture.image.data,
            origin.x, origin.y,
            end.x, end.y,
            position.x, position.y,
            end.x, end.y
        );
    }

    public test(): void 
    {

    }
}