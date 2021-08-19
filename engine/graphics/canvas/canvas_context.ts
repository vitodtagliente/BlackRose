import { Color, ShaderType, Texture } from "..";
import { Canvas } from "../../application";
import { Image } from "../../asset";
import { Transform, Vector2, Vector3 } from "../../math";
import API from "../api";
import Context from "../context";
import CanvasShader from "./canvas_shader";
import CanvasShaderProgram from "./canvas_shader_program";
import CanvasTexture from "./canvas_texture";

export default class CanvasContext extends Context
{
    private _context: CanvasRenderingContext2D;

    public constructor(canvas: Canvas)
    {
        super(canvas, API.Canvas);
        this._context = canvas.canvas.getContext(this.api) as CanvasRenderingContext2D;
    }

    public get context(): CanvasRenderingContext2D { return this._context; }

    public createTexture(image: Image): CanvasTexture
    {
        return new CanvasTexture(image);
    }

    public createShader(type: ShaderType, source: string): CanvasShader
    {
        return new CanvasShader(type, source);
    }

    public createShaderProgram(vertexShader: CanvasShader, fragmentShader: CanvasShader): CanvasShaderProgram
    {
        return new CanvasShaderProgram(vertexShader, fragmentShader);
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

    public drawSprite(texture: Texture, transform: Transform): void
    {
        this._context.drawImage(texture.image.data, transform.position.x, transform.position.y);
    }

    public drawSubSprite(position: Vector3, texture: Texture, origin: Vector2, end: Vector2): void
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