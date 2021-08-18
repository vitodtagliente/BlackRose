import { BufferElement, BufferElementType, Renderable, Shader, ShaderProgram, VAO, VertexBuffer } from ".";
import { Color, Texture } from "..";
import { Canvas } from "../../application";
import { Vector2, Vector3 } from "../../math";
import API from "../api";
import Context from "../context";
import { ShaderType } from "./shader";
import * as Shaders from "../shaders";
import Geometry from "../geometry";
import * as Geometries from "../geometries";
import { default as GLTexture } from "./gl_texture";
import { Image } from "../../asset";

export default class GLContext extends Context
{
    private _context: WebGL2RenderingContext;
    private _positionProgram: ShaderProgram;

    public constructor(canvas: Canvas)
    {
        super(canvas, API.WebGL);
        this._context = canvas.canvas.getContext(this.api) as WebGL2RenderingContext;
        // Tell WebGL how to convert from clip space to pixels
        canvas.onResize.on(() => this._context.viewport(0, 0, this.canvas.width, this.canvas.height));
        this._context.viewport(0, 0, canvas.width, canvas.height);

        {
            const vs: Shader = new Shader(this._context, ShaderType.Vertex, Shaders.PositionShader.VertexSource);
            const fs: Shader = new Shader(this._context, ShaderType.Fragment, Shaders.PositionShader.FragmentSource);
            this._positionProgram = new ShaderProgram(this._context, vs, fs);
            console.log(this._positionProgram.linked);
        }
    }

    public get context(): WebGL2RenderingContext { return this._context; }

    public createTexture(image: Image): Texture
    {
        return new GLTexture(this._context, image);
    }

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

    public test(): void 
    {
        const gl = this._context;

        var positions = [
            0, 0,
            0, 0.5,
            0.7, 0,
        ];

        const vao: VAO = new VAO(gl);
        vao.bind();

        const vb: VertexBuffer = new VertexBuffer(this._context);
        vb.layout.push(new BufferElement("position", BufferElementType.Float, 2, true));
        vb.update(positions);

        // Tell it to use our program (pair of shaders)
        this._positionProgram.use();

        // draw
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = vb.length;
        gl.drawArrays(primitiveType, offset, count);

    }
}