import Shader, { ShaderType } from "../shader";

export default class CanvasShader extends Shader
{
    public constructor(type: ShaderType, source: string)
    {
        super(type, source);
        this._compiled = true;
    }
}