import { Shader, ShaderProgram } from ".";
import { Color, Texture } from "..";
import { Canvas } from "../../application";
import { Vector2, Vector3 } from "../../math";
import API from "../api";
import Context from "../context";
import { ShaderType } from "./shader";
import * as Shaders from "../shaders";

export default class WebGLContext extends Context
{
    private _context: WebGL2RenderingContext;
    private _positionProgram: ShaderProgram;

    public constructor(canvas: Canvas)
    {
        super(canvas, API.WebGL);
        this._context = canvas.canvas.getContext(this.api) as WebGL2RenderingContext;

        {
            const vs: Shader = new Shader(this._context, ShaderType.Vertex, Shaders.PositionShader.VertexSource);
            const fs: Shader = new Shader(this._context, ShaderType.Fragment, Shaders.PositionShader.FragmentSource);
            this._positionProgram = new ShaderProgram(this._context, vs, fs);
            console.log(this._positionProgram.linked);
        }
    }

    public get context(): WebGL2RenderingContext { return this._context; }

    public clear(color: Color): void
    {
        this.context.clearColor(color.r, color.g, color.b, color.a);
        this.context.clear(this.context.COLOR_BUFFER_BIT);
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