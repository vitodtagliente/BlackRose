import { Matrix2, Matrix3, Matrix4, Vector2, Vector3, Vector4 } from "../math";
import Shader from "./shader";

export default abstract class ShaderProgram
{
    protected _linked: boolean = false;

    public constructor(vertexShader: Shader, fragmentShader: Shader)
    {
        
    }

    public get linked(): boolean { return this._linked; }

    public abstract use(): void ;

    public abstract setInt(name: string, value: number): void ;
    public abstract setBool(name: string, value: boolean): void;
    public abstract setVec2(name: string, value: Vector2): void;
    public abstract setVec3(name: string, value: Vector3): void;
    public abstract setVec4(name: string, value: Vector4): void;
    public abstract setMat2(name: string, value: Matrix2): void;
    public abstract setMat3(name: string, value: Matrix3): void;
    public abstract setMat4(name: string, value: Matrix4): void;
}