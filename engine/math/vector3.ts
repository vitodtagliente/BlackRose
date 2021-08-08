export default class Vector3
{
    public static readonly zero = new Vector3();
    public static readonly one = new Vector3(1, 1, 1);

    public static readonly up = new Vector3(0, 1, 0);
    public static readonly right = new Vector3(1, 0, 0);
    public static readonly left = new Vector3(-1, 0, 0);
    public static readonly down = new Vector3(0, -1, 0);
    public static readonly forward = new Vector3(0, 0, -1);

    public data: number[] = [3];

    public get x(): number { return this.data[0]; }
    public set x(value: number) { this.data[0] = value; }
    public get y(): number { return this.data[1]; }
    public set y(value: number) { this.data[1] = value; }
    public get z(): number { return this.data[2]; }
    public set z(value: number) { this.data[2] = value; }

    public constructor(x?: number, y?: number, z?: number)
    {
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.z = z ?? 0;
    }

    public add(v: Vector3): Vector3
    {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    public sub(v: Vector3): Vector3
    {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    public mul(scalar: number): Vector3
    {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    public div(scalar: number): Vector3
    {
        const factor: number = 1 / scalar;
        return new Vector3(this.x * factor, this.y * factor, this.z * factor);
    }

    public dot(v: Vector3): number
    {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    public cross(v: Vector3): Vector3
    {
        return new Vector3(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }

    public normalize(): Vector3
    {
        return this.div(this.magnitude);
    }

    public distance(v: Vector3): number
    {
        return this.sub(v).magnitude;
    }

    public get magnitude(): number { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }
}