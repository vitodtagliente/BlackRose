import { Color } from "../graphics";
import { Matrix4 } from "../math";
import Entity from "./entity";

export enum CameraMode
{
    Ortographic,
    Perspective
}

export default abstract class Camera extends Entity
{
    private _mode: CameraMode;
    protected _view: Matrix4;
    private _matrix: Matrix4;
    public background: Color;

    public constructor(name: string, mode: CameraMode)
    {
        super(name);
        this._mode = mode;
        this.background = Color.black();
        this._view = Matrix4.identity();
    }

    public get mode(): CameraMode { return this._mode; }
    public get view(): Matrix4 { return this._view; }
    public get matrix(): Matrix4 { return this._matrix; }

    public compute(): void
    {
        Matrix4.multiplyMatrices([this._view, this.transform.matrix]).copy(this._matrix);
    }

    public abstract computeViewMatrix(): void;
}