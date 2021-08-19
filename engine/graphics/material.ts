import { ShaderProgram } from ".";
import { Matrix2, Matrix3, Matrix4, Vector2, Vector3, Vector4 } from "../math";

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

    public constructor(program: ShaderProgram)
    {
        this._program = program;
        this._properties = new Map<string, MaterialProperty>();
    }

    public bind(): void 
    {
        this._program.use();

        for (const [name, property] of this._properties)
        {
            switch (property.type)
            {
                case MaterialPropertyType.Int: this._program.setInt(name, property.value as number); break;
                case MaterialPropertyType.Bool: this._program.setBool(name, property.value as boolean); break;
                case MaterialPropertyType.Vec2: this._program.setVec2(name, property.value as Vector2); break;
                case MaterialPropertyType.Vec3: this._program.setVec3(name, property.value as Vector3); break;
                case MaterialPropertyType.Vec4: this._program.setVec4(name, property.value as Vector4); break;
                case MaterialPropertyType.Mat2: this._program.setMat2(name, property.value as Matrix2); break;
                case MaterialPropertyType.Mat3: this._program.setMat3(name, property.value as Matrix3); break;
                case MaterialPropertyType.Mat4: this._program.setMat4(name, property.value as Matrix4); break;
                default: break;
            }
        }
    }

    public free(): void
    {

    }

    public setInt(name: string, value: number): void
    {
        this._properties.set(name, new MaterialProperty(MaterialPropertyType.Int, value));
    }

    public setMatrix4(name: string, value: Matrix4): void 
    {
        this._properties.set(name, new MaterialProperty(MaterialPropertyType.Mat4, value));
    }
}