import { serializable, Serializable } from "../core";
import Matrix4 from "./matrix4";
import Vector3 from "./vector3";

class State
{
    private _position: Vector3;
    private _rotation: Vector3;
    private _scale: Vector3;

    public constructor()
    {
        this._position = Vector3.zero();
        this._rotation = Vector3.zero();
        this._scale = Vector3.one();
    }

    public update(transform: Transform): boolean 
    {
        const isChanged: boolean = !this._position.equals(transform.position)
            || !this._rotation.equals(transform.rotation)
            || !this._scale.equals(transform.scale);

        transform.position.copy(this._position);
        transform.rotation.copy(this._rotation);
        transform.scale.copy(this._scale);

        return isChanged;
    }
}


@serializable
export default class Transform extends Serializable
{
    private _isStatic: boolean;
    public position: Vector3;
    public rotation: Vector3;
    public scale: Vector3;
    private _matrix: Matrix4;
    private _state: State;

    public constructor()
    {
        super();
        this._isStatic = false;
        this.position = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
        this.scale = new Vector3(1, 1, 1);

        this._matrix = Matrix4.identity();
        this._state = new State;
    }

    public get isStatic(): boolean { return this._isStatic; }
    public set isStatic(value: boolean)
    {
        if (value && !this._isStatic)
        {
            this._isStatic = value;
            this.compute();
        }
    }

    public compute(): void
    {
        if (!this._isStatic)
        {
            const isChanged: boolean = this._state.update(this);
            if (isChanged)
            {
                this._matrix = Matrix4.multiplyMatrices([
                    Matrix4.scale(this.scale),
                    Matrix4.rotateZ(this.rotation.z),
                    Matrix4.translate(this.position)
                ]);
            }
        }
    }

    public get matrix(): Matrix4
    {
        return this._matrix;
    }

    public copy(other: Transform): void
    {
        this.position.copy(other.position);
        this.rotation.copy(other.rotation);
        this.scale.copy(other.scale);
        other.isStatic = this.isStatic;
    }

    public serialize(): any 
    {
        let data: any = super.serialize();
        data["position"] = this.position.serialize();
        data["rotation"] = this.rotation.serialize();
        data["scale"] = this.scale.serialize();
        return data;
    }

    public deserialize(data: any): void 
    {
        for (const key of Object.keys(data))
        {
            switch (key)
            {
                case "position": this.position.deserialize(data[key]); break;
                case "rotation": this.rotation.deserialize(data[key]); break;
                case "scale": this.scale.deserialize(data[key]); break;
                default: break;
            }
        }
    }
}