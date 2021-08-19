import Shader, { ShaderType } from "../shader";

export default class GLShader extends Shader
{
    private _id: WebGLShader;

    public constructor(context: WebGL2RenderingContext, type: ShaderType, source: string)
    {
        super(type, source);

        this._id = context.createShader(
            type == ShaderType.Vertex ? context.VERTEX_SHADER : context.FRAGMENT_SHADER
        );

        context.shaderSource(this._id, source);
        context.compileShader(this._id);
        this._compiled = context.getShaderParameter(this._id, context.COMPILE_STATUS);
        if (!this._compiled)
        {
            console.log(context.getShaderInfoLog(this._id));
            context.deleteShader(this._id);
        }
    }

    public get id(): WebGLShader { return this._id; }
}