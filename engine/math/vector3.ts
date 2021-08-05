export default class Vector3
{
    public x: number;
    public y: number;
    public z: number;

    public constructor(x?: number, y?: number, z?: number)
    {
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.z = z ?? 0;
    }
}