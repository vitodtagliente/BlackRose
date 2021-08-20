import { Color, IndexBuffer, IndexBufferUsageMode, Shader, ShaderProgram, ShaderType, Texture, TextureRect } from ".";
import { Canvas } from "../application";
import { Image } from "../asset";
import { Transform, Vector3 } from "../math";
import API from "./api";
import VertexBuffer, { VertexBufferUsageMode } from "./vertex_buffer";

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

    public abstract createIndexBuffer(usageMode: IndexBufferUsageMode): IndexBuffer;
    public abstract createVertexBuffer(usageMode: VertexBufferUsageMode): VertexBuffer;
    public abstract createTexture(image: Image): Texture;
    public abstract createShader(type: ShaderType, source: string): Shader;
    public abstract createShaderProgram(vertexShader: Shader, fragmentShader: Shader): ShaderProgram;

    public abstract clear(color: Color): void;
    public abstract viewport(width: number, height: number): void;
    public abstract drawCircle(position: Vector3, radius: number, color: Color): void;
    public abstract drawSprite(texture: Texture, transform: Transform): void;
    public abstract drawSubSprite(texture: Texture, transform: Transform, rect: TextureRect): void;
    public abstract drawSprites(texture: Texture, data: Array<[Transform, TextureRect]>): void;

    public abstract test(): void;
}