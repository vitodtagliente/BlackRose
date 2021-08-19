import { Matrix2, Matrix3, Matrix4, Vector2, Vector3, Vector4 } from "../../math";
import ShaderProgram from "../shader_program";
import CanvasShader from "./canvas_shader";

export default class CanvasShaderProgram extends ShaderProgram
{
    public constructor(vertexShader: CanvasShader, fragmentShader: CanvasShader)
    {
        super(vertexShader, fragmentShader);

        this._linked = true;
    }

    public use(): void { }
    public setInt(name: string, value: number): void { }
    public setBool(name: string, value: boolean): void { }
    public setVec2(name: string, value: Vector2): void { }
    public setVec3(name: string, value: Vector3): void { }
    public setVec4(name: string, value: Vector4): void { }
    public setMat2(name: string, value: Matrix2): void { }
    public setMat3(name: string, value: Matrix3): void { }
    public setMat4(name: string, value: Matrix4): void { }
}