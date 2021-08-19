import { Color, ShaderType, Texture } from "..";
import { Canvas } from "../../application";
import { Matrix4, Transform, Vector2, Vector3 } from "../../math";
import API from "../api";
import Context from "../context";
import * as Shaders from "../shaders";
import Geometry from "../geometry";
import * as Geometries from "../geometries";
import { default as GLTexture } from "./gl_texture";
import { Image } from "../../asset";
import GLShader from "./gl_shader";
import GLShaderProgram from "./gl_shader_program";
import GLVertexArrayObject from "./gl_vertext_array_object";
import GLVertexBuffer from "./gl_vertex_buffer";
import GLIndexBuffer from "./gl_index_buffer";
import { VertexBufferElement, VertexBufferElementType, VertexBufferUsageMode } from "../vertex_buffer";

class RenderData
{
    public vao: GLVertexArrayObject;
    public vb: GLVertexBuffer;
    public ib: GLIndexBuffer;

    public bind(): void 
    {
        if (this.vao != null) this.vao.bind();
    }
}

export default class GLContext extends Context
{
    private _context: WebGL2RenderingContext;
    private _spriteProgram: GLShaderProgram;

    private _spriteRenderData: RenderData;

    public constructor(canvas: Canvas)
    {
        super(canvas, API.WebGL);
        this._context = canvas.canvas.getContext(this.api) as WebGL2RenderingContext;
        // to prevent showing images upside down
        this._context.pixelStorei(this._context.UNPACK_FLIP_Y_WEBGL, true);
        // enable the alpha blending
        this._context.enable(this._context.BLEND);
        this._context.blendFunc(this._context.SRC_ALPHA, this._context.ONE_MINUS_SRC_ALPHA);

        {
            const vs: GLShader = this.createShader(ShaderType.Vertex, Shaders.TextureShader.VertexSource);
            const fs: GLShader = this.createShader(ShaderType.Fragment, Shaders.TextureShader.FragmentSource);
            this._spriteProgram = this.createShaderProgram(vs, fs);
        }

        // sprite geometry
        {
            this._spriteRenderData = new RenderData;
            this._spriteRenderData.vao = new GLVertexArrayObject(this._context);
            this._spriteRenderData.vao.bind();

            const quad: Geometries.Quad = new Geometries.Quad;

            this._spriteRenderData.vb = new GLVertexBuffer(this._context);
            quad.layout(this._spriteRenderData.vb.layout);
            this._spriteRenderData.vb.update(quad.data);

            this._spriteRenderData.ib = new GLIndexBuffer(this._context);
            this._spriteRenderData.ib.update(quad.indices);
        }
    }

    public get context(): WebGL2RenderingContext { return this._context; }

    public createIndexBuffer(): GLIndexBuffer
    {
        return new GLIndexBuffer(this._context);
    }

    public createVertexBuffer(usageMode: VertexBufferUsageMode): GLVertexBuffer
    {
        return new GLVertexBuffer(this._context, usageMode);
    }

    public createTexture(image: Image): GLTexture
    {
        return new GLTexture(this._context, image);
    }

    public createShader(type: ShaderType, source: string): GLShader
    {
        return new GLShader(this._context, type, source);
    }

    public createShaderProgram(vertexShader: GLShader, fragmentShader: GLShader): GLShaderProgram
    {
        return new GLShaderProgram(this._context, vertexShader, fragmentShader);
    }

    public viewport(width: number, height: number): void 
    {
        this._context.viewport(0, 0, width, height);
    }

    public clear(color: Color): void
    {
        this.context.clearColor(color.r, color.g, color.b, color.a);
        this.context.clear(this.context.COLOR_BUFFER_BIT);
    }

    public drawCircle(position: Vector3, radius: number, color: Color): void
    {

    }

    public drawSprite(texture: Texture, transform: Transform): void
    {
        if (texture == null) return;

        this._spriteRenderData.bind();

        this._spriteProgram.use();
        texture.bind(0);
        this._spriteProgram.setInt("u_texture", 0);
        this._spriteProgram.setMatrix("u_matrix", transform.matrix());

        // draw
        var primitiveType = this._context.TRIANGLES;
        var offset = 0;
        var count = this._spriteRenderData.ib.length;
        var indexType = this._context.UNSIGNED_SHORT;
        this._context.drawElements(primitiveType, count, indexType, offset);
    }

    public test(): void 
    {
        
    }
}