import { ShaderProgram } from ".";

export enum MaterialPropertyType
{
    Color,
    Bool,
    Float,
    Int,
    Mat2,
    Mat3,
    Mat4,
    Texture1D,
    Texture2D,
    Texture2DArray,
    Texture3D,
    TextureCube,
    Vec2,
    Vec3,
    Vec4,
}

export class MaterialProperty
{
    private _type: MaterialPropertyType;
    private _value: any;

    public constructor(type: MaterialPropertyType, value: any)
    {
        this._type = type;
        this._value = value;
    }

    public get type(): MaterialPropertyType { return this._type; }
    public get value(): any { return this._value; }
}

export default class Material
{
    private _program: ShaderProgram;
    private _properties: Map<string, MaterialProperty>;

    public constructor()
    {
        
    }
}