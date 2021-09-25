import { CameraMode } from "./camera";
import { Matrix4, Rect } from "../math";
import Camera from "./camera";

export class CameraClippingPlanes
{
    public near: number;
    public far: number;

    public constructor(near: number = -30, far: number = 1000)
    {
        this.near = near;
        this.far = far;
    }
}

export default class OrtographicCamera extends Camera
{
    public clippingPlanes: CameraClippingPlanes;
    public viewport: Rect;

    public constructor(name: string, viewport: Rect, clippingPlanes: CameraClippingPlanes)
    {
        super();
        this._mode = CameraMode.Ortographic;
        this.viewport = viewport;
        this.clippingPlanes = clippingPlanes;

        this.computeViewMatrix();
    }

    public computeViewMatrix(): void 
    {
        Matrix4.orthographic(
            this.viewport.x, this.viewport.width, this.viewport.y, this.viewport.height,
            this.clippingPlanes.near, this.clippingPlanes.far
        ).copy(this._view);
    }
}