export enum ShaderType
{
    Vertex,
    Fragment,
}

export default abstract class Shader
{
    private _type: ShaderType;
    protected _compiled: boolean = false;

    public constructor(type: ShaderType, source: string)
    {
        this._type = type;
    }

    public get compiled(): boolean { return this._compiled; }
    public get type(): ShaderType { return this._type; }
}