export enum ShaderType
{
    Vertex,
    Fragment,
}

export default class Shader
{
    private _id: WebGLShader;
    private _type: ShaderType;
    private _compiled: boolean;

    public constructor(context: WebGL2RenderingContext, type: ShaderType, source: string)
    {
        this._id = context.createShader(
            type == ShaderType.Vertex ? context.VERTEX_SHADER : context.FRAGMENT_SHADER
        );
        this._type = type;

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
    public get compiled(): boolean { return this._compiled; }
    public get type(): ShaderType { return this._type; }
}