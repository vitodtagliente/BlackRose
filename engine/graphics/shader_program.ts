import { Matrix4 } from "../math";
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
    public abstract setMatrix(name: string, value: Matrix4): void;
}