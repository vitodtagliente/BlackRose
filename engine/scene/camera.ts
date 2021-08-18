import Entity from "./entity";

export enum CameraMode
{
    Ortographic,
    Perspective
}

export default class Camera extends Entity
{
    public mode: CameraMode;

    public constructor(name?: string)
    {
        super(name);
        this.mode = CameraMode.Ortographic;

        
    }
}