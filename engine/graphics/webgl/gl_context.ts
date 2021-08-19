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
import GLVertexBuffer, { GLVertexBufferElement, GLVertexBufferElementType } from "./gl_vertex_buffer";
import GLIndexBuffer from "./gl_index_buffer";

export default class GLContext extends Context
{
    private _context: WebGL2RenderingContext;
    private _positionProgram: GLShaderProgram;
    private _textureProgram: GLShaderProgram;
    private _cat: Image;
    private _texture: Texture;

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
            this._positionProgram =this.createShaderProgram(vs, fs);
            console.log(this._positionProgram.linked);
        }

        {
            const vs: GLShader = this.createShader(ShaderType.Vertex, Shaders.TextureShader.VertexSource);
            const fs: GLShader = this.createShader(ShaderType.Fragment, Shaders.TextureShader.FragmentSource);
            this._textureProgram =this.createShaderProgram(vs, fs);
            console.log(this._textureProgram.linked);
        }

        this._cat = Image.load("assets/cat.png", () =>
        {
            console.log("cat loaded")
            this._texture = this.createTexture(this._cat);
        });
    }

    public get context(): WebGL2RenderingContext { return this._context; }

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

    public drawTexture(position: Vector3, texture: Texture): void
    {

    }

    public drawSubTexture(position: Vector3, texture: Texture, origin: Vector2, end: Vector2): void
    {

    }

    public test(): void 
    {
        if (this._texture == null) return;

        const gl = this._context;

        const vao: GLVertexArrayObject = new GLVertexArrayObject(gl);
        vao.bind();

        const quad: Geometries.Quad = new Geometries.Quad;

        const vb: GLVertexBuffer = new GLVertexBuffer(this._context);
        vb.layout.push(new GLVertexBufferElement("position", GLVertexBufferElementType.Float, 2, true));
        vb.layout.push(new GLVertexBufferElement("texcoord", GLVertexBufferElementType.Float, 2, true));
        vb.update([
            1, 1, 1, 1,
            1, -1, 1, 0,
            -1, -1, 0, 0,
            -1, 1, 0, 1
        ]);

        const ib: GLIndexBuffer = new GLIndexBuffer(this._context);
        ib.update(quad.indices);

        // Tell it to use our program (pair of shaders)
        this._textureProgram.use();

        this._texture.bind(0);
        this._textureProgram.setInt("u_texture", 0);
        let transform: Transform = new Transform;
        transform.position.x = .6;
        transform.scale.set(.4, .4, 0);
        transform.rotation.z = 35;
        this._textureProgram.setMatrix("u_matrix", transform.matrix());

        // draw
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = ib.length;
        var indexType = gl.UNSIGNED_SHORT;
        gl.drawElements(primitiveType, count, indexType, offset);
    }
}