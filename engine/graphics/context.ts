import { Color, Shader, ShaderProgram, ShaderType, Texture } from ".";
import { Canvas } from "../application";
import { Image } from "../asset";
import { Transform, Vector2, Vector3 } from "../math";
import API from "./api";

export default abstract class Context
{
    private _canvas: Canvas;
    private _api: API;

    public constructor(canvas: Canvas, api: API)
    {
        this._canvas = canvas;
        this._api = api;
    }

    public get api(): API { return this._api; }
    public get canvas(): Canvas { return this._canvas; }

    public abstract createTexture(image: Image): Texture;
    public abstract createShader(type: ShaderType, source: string): Shader;
    public abstract createShaderProgram(vertexShader: Shader, fragmentShader: Shader): ShaderProgram;

    public abstract clear(color: Color): void;
    public abstract viewport(width: number, height: number): void;
    public abstract drawCircle(position: Vector3, radius: number, color: Color): void;
    public abstract drawSprite(texture: Texture, transform: Transform): void;
    // public abstract drawSubSprite(texture: Texture, transform: Transform, ): void;

    public abstract test(): void;
}