import { BufferUsageMode, Color, ShaderType, Texture, TextureRect } from "..";
import { Canvas } from "../../application";
import { Matrix4, Transform, Vector2, Vector3, Vector4 } from "../../math";
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
import { VertexBufferElement, VertexBufferElementType } from "../vertex_buffer";

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

class SpriteBatchRenderData extends RenderData
{
    public transformBuffer: GLVertexBuffer;
    public cropBuffer: GLVertexBuffer;
    public readonly quad: Geometries.Quad = new Geometries.Quad;
}

export default class GLContext extends Context
{
    private _context: WebGL2RenderingContext;
    private _positionProgram: GLShaderProgram;
    private _spriteProgram: GLShaderProgram;
    private _subSpriteProgram: GLShaderProgram;
    private _spriteBatchProgram: GLShaderProgram;

    private _spriteRenderData: RenderData;
    private _spriteBatchRenderData: SpriteBatchRenderData;

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
            const vs: GLShader = this.createShader(ShaderType.Vertex, Shaders.PositionShader.VertexSource);
            const fs: GLShader = this.createShader(ShaderType.Fragment, Shaders.PositionShader.FragmentSource);
            this._positionProgram = this.createShaderProgram(vs, fs);
        }

        {
            const vs: GLShader = this.createShader(ShaderType.Vertex, Shaders.SpriteShader.VertexSource);
            const fs: GLShader = this.createShader(ShaderType.Fragment, Shaders.SpriteShader.FragmentSource);
            this._spriteProgram = this.createShaderProgram(vs, fs);
        }

        {
            const vs: GLShader = this.createShader(ShaderType.Vertex, Shaders.SubSpriteShader.VertexSource);
            const fs: GLShader = this.createShader(ShaderType.Fragment, Shaders.SubSpriteShader.FragmentSource);
            this._subSpriteProgram = this.createShaderProgram(vs, fs);
        }

        {
            const vs: GLShader = this.createShader(ShaderType.Vertex, Shaders.SpriteBatchShader.VertexSource);
            const fs: GLShader = this.createShader(ShaderType.Fragment, Shaders.SpriteBatchShader.FragmentSource);
            this._spriteBatchProgram = this.createShaderProgram(vs, fs);
        }

        // sprite render data
        {
            this._spriteRenderData = new RenderData;
            this._spriteRenderData.vao = new GLVertexArrayObject(this._context);
            this._spriteRenderData.vao.bind();

            const quad: Geometries.Quad = new Geometries.Quad;

            this._spriteRenderData.vb = new GLVertexBuffer(this._context, quad.data.length, BufferUsageMode.Static);
            quad.layout(this._spriteRenderData.vb.layout);
            this._spriteRenderData.vb.fillData(quad.data);
            this._spriteRenderData.vb.activateLayout();

            this._spriteRenderData.ib = new GLIndexBuffer(this._context, quad.indices.length, BufferUsageMode.Static);
            this._spriteRenderData.ib.fillData(quad.indices);
        }

        // sprite batch render data
        {
            this._spriteBatchRenderData = new SpriteBatchRenderData;
            this._spriteBatchRenderData.vao = new GLVertexArrayObject(this._context);
            this._spriteBatchRenderData.vao.bind();

            this._spriteBatchRenderData.vb = this.createVertexBuffer(2000 * 5, BufferUsageMode.Dynamic);
            this._spriteBatchRenderData.vb.layout.push(new VertexBufferElement("position", VertexBufferElementType.Float, 3));
            this._spriteBatchRenderData.vb.layout.push(new VertexBufferElement("texcoords", VertexBufferElementType.Float, 2));

            this._spriteBatchRenderData.cropBuffer = this.createVertexBuffer(2000 * 2, BufferUsageMode.Dynamic);
            this._spriteBatchRenderData.cropBuffer.layout.push(new VertexBufferElement("crop", VertexBufferElementType.Float, 4, true, true));
            this._spriteBatchRenderData.cropBuffer.startingElementIndex = 2;

            this._spriteBatchRenderData.transformBuffer = this.createVertexBuffer(2000 * 16, BufferUsageMode.Dynamic);
            this._spriteBatchRenderData.transformBuffer.layout.push(new VertexBufferElement("transform", VertexBufferElementType.Float, 4, true, true));
            this._spriteBatchRenderData.transformBuffer.layout.push(new VertexBufferElement("transform", VertexBufferElementType.Float, 4, true, true));
            this._spriteBatchRenderData.transformBuffer.layout.push(new VertexBufferElement("transform", VertexBufferElementType.Float, 4, true, true));
            this._spriteBatchRenderData.transformBuffer.layout.push(new VertexBufferElement("transform", VertexBufferElementType.Float, 4, true, true));
            this._spriteBatchRenderData.transformBuffer.startingElementIndex = 3;

            this._spriteBatchRenderData.ib = this.createIndexBuffer(2000 * 6, BufferUsageMode.Dynamic);
        }
    }

    public get context(): WebGL2RenderingContext { return this._context; }

    public createIndexBuffer(size: number, mode: BufferUsageMode): GLIndexBuffer
    {
        return new GLIndexBuffer(this._context, size, mode);
    }

    public createVertexBuffer(size: number, mode: BufferUsageMode): GLVertexBuffer
    {
        return new GLVertexBuffer(this._context, size, mode);
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
        this._spriteProgram.setMat4("u_matrix", transform.matrix());

        // draw
        var primitiveType = this._context.TRIANGLES;
        var offset = 0;
        var count = 6;
        var indexType = this._context.UNSIGNED_SHORT;
        this._context.drawElements(primitiveType, count, indexType, offset);
    }

    public drawSubSprite(texture: Texture, transform: Transform, rect: TextureRect): void
    {
        if (texture == null) return;

        this._spriteRenderData.bind();

        this._subSpriteProgram.use();
        texture.bind(0);
        this._subSpriteProgram.setInt("u_texture", 0);
        this._subSpriteProgram.setMat4("u_matrix", transform.matrix());
        this._subSpriteProgram.setVec4("u_crop", new Vector4(rect.x, rect.y, rect.width, rect.height));

        // draw
        var primitiveType = this._context.TRIANGLES;
        var offset = 0;
        var count = 6;
        var indexType = this._context.UNSIGNED_SHORT;
        this._context.drawElements(primitiveType, count, indexType, offset);
    }

    public drawSprites(texture: Texture, data: Array<[Transform, TextureRect]>): void
    {
        if (texture == null || data.length == 0) return;

        const quad: Geometries.Quad = this._spriteBatchRenderData.quad;

        this._spriteBatchRenderData.bind();

        // fill sprites geometries and data
        {
            let positions: Array<number> = [];
            let crops: Array<number> = [];
            let transforms: Array<number> = [];
            let indices: Array<number> = [];
            for (let i: number = 0; i < data.length; ++i)
            {
                const [transform, rect] = data[i];

                positions.push(...quad.data);
                crops.push(...rect.data);
                transforms.push(...transform.matrix().data);

                for (let vertexIndex of quad.indices)
                {
                    indices.push(i + vertexIndex);
                }
            }

            this._spriteBatchRenderData.vb.fillData(positions);
            this._spriteBatchRenderData.cropBuffer.fillData(crops);
            this._spriteBatchRenderData.transformBuffer.fillData(transforms);
            this._spriteBatchRenderData.ib.fillData(indices);
        }

        this._spriteBatchProgram.use();
        texture.bind(0);
        this._spriteBatchProgram.setInt("u_texture", 0);

        // draw
        const primitiveType = this._context.TRIANGLES;
        const offset: number = 0;
        const count: number = 6;
        const numInstances: number = data.length;
        var indexType = this._context.UNSIGNED_SHORT;
        this._context.drawElementsInstanced(primitiveType, count, indexType, offset, numInstances);
    }

    public test(): void 
    {
        return;

        const vao: GLVertexArrayObject = new GLVertexArrayObject(this._context);
        vao.bind();

        const quad: Geometries.Quad = new Geometries.Quad;

        const vb: GLVertexBuffer = this.createVertexBuffer(quad.data.length, BufferUsageMode.Dynamic);
        vb.fillData(quad.data);
        quad.layout(vb.layout);
        vb.activateLayout();

        const ib: GLIndexBuffer = this.createIndexBuffer(quad.indices.length, BufferUsageMode.Dynamic);
        ib.fillData(quad.indices);

        this._positionProgram.use();

        var primitiveType = this._context.TRIANGLES;
        var offset = 0;
        var count = quad.indices.length;
        var indexType = this._context.UNSIGNED_SHORT;
        this._context.drawElements(primitiveType, count, indexType, offset);
    }
}