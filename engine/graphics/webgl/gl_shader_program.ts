import { Matrix4, Vector2 } from "../../math";
import GLShader from "./gl_shader";
import ShaderProgram from "../shader_program";
import { TextureCoords } from "..";

export default class GLShaderProgram extends ShaderProgram
{
    private _id: WebGLProgram;
    private _context: WebGL2RenderingContext;
    private _uniforms: Map<string, WebGLUniformLocation>;

    public constructor(context: WebGL2RenderingContext, vertexShader: GLShader, fragmentShader: GLShader)
    {
        super(vertexShader, fragmentShader);

        this._context = context;
        this._uniforms = new Map<string, WebGLUniformLocation>();

        this._id = context.createProgram();
        context.attachShader(this._id, vertexShader.id);
        context.attachShader(this._id, fragmentShader.id);
        context.linkProgram(this._id);
        this._linked = context.getProgramParameter(this._id, context.LINK_STATUS);
        if (!this._linked)
        {
            console.log(context.getProgramInfoLog(this._id));
            context.deleteProgram(this._id);
        }
    }

    public get id(): WebGLProgram { return this._id; }

    public use(): void 
    {
        this._context.useProgram(this._id);
    }

    public getUniformLocation(name: string): WebGLUniformLocation
    {
        if (this._uniforms.has(name)) return this._uniforms.get(name);

        const uniformLocation: WebGLUniformLocation = this._context.getUniformLocation(this._id, name);
        this._uniforms.set(name, uniformLocation);
        return uniformLocation;
    }

    public setInt(name: string, value: number): void 
    {
        this._context.uniform1i(this.getUniformLocation(name), value);
    }

    public setVec2(name: string, value: Vector2): void 
    {
        this._context.uniform2fv(this.getUniformLocation(name), value.data);
    }

    public setTextCoords(name: string, value: TextureCoords): void 
    {
        this._context.uniform2fv(this.getUniformLocation(name), value.data);
    }

    public setMatrix(name: string, value: Matrix4): void
    {
        this._context.uniformMatrix4fv(this.getUniformLocation(name), false, value.data);
    }
}