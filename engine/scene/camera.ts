import { Color } from "../graphics";
import { Matrix4, Rect } from "../math";
import Entity from "./entity";

export enum CameraMode
{
    Ortographic,
    Perspective
}

export class CameraClippingPlanes
{
    public near: number = -30;
    public far: number = 1000;
}

export default class Camera extends Entity
{
    private _mode: CameraMode;
    public background: Color;

    public clippingPlanes: CameraClippingPlanes;
    public viewport: Rect;

    private _matrix: Matrix4;
    private _viewMatrix: Matrix4;

    public constructor(name?: string)
    {
        super(name);
        this._mode = CameraMode.Ortographic;
        this.background = Color.black;

        this.clippingPlanes = new CameraClippingPlanes;
        this.viewport = new Rect(0, 0, 1, 1);
        this._matrix = new Matrix4;
        this._viewMatrix = new Matrix4;
    }

    public get mode(): CameraMode { return this._mode; }
    public set mode(value: CameraMode)
    {
        if (value != this._mode)
        {
            this._mode = value;
            this.computeViewMatrix();
        }
    }

    public get matrix(): Matrix4 { return this._matrix; }
    public get viewMatrix(): Matrix4 { return this._viewMatrix; }

    public compute(): void
    {
        Matrix4.multiplyMatrices([this._viewMatrix, this.transform.matrix]).copy(this._matrix);
    }

    public computeViewMatrix(): void 
    {
        if (this._mode == CameraMode.Ortographic)
        {
            this._viewMatrix = Matrix4.orthographic(
                this.viewport.x, this.viewport.width, this.viewport.y, this.viewport.height,
                this.clippingPlanes.near, this.clippingPlanes.far
            );
        }
        else 
        {

        }
    }
}