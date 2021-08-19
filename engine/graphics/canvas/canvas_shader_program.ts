import { Matrix4 } from "../../math";
import ShaderProgram from "../shader_program";
import CanvasShader from "./canvas_shader";

export default class CanvasShaderProgram extends ShaderProgram
{
    public constructor(vertexShader: CanvasShader, fragmentShader: CanvasShader)
    {
        super(vertexShader, fragmentShader);

        this._linked = true;
    }

    public use(): void 
    {

    }

    public setInt(name: string, value: number): void 
    {

    }

    public setMatrix(name: string, value: Matrix4): void
    {

    }
}