export default class Vector4
{
    public static readonly zero = new Vector4();
    public static readonly one = new Vector4(1, 1, 1, 1);

    public data: number[] = [4];

    public get x(): number { return this.data[0]; }
    public set x(value: number) { this.data[0] = value; }
    public get y(): number { return this.data[1]; }
    public set y(value: number) { this.data[1] = value; }
    public get z(): number { return this.data[2]; }
    public set z(value: number) { this.data[2] = value; }
    public get w(): number { return this.data[3]; }
    public set w(value: number) { this.data[3] = value; }

    public constructor(x?: number, y?: number, z?: number, w?: number)
    {
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.z = z ?? 0;
        this.w = w ?? 0;
    }

    public add(v: Vector4): Vector4
    {
        return new Vector4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
    }

    public sub(v: Vector4): Vector4
    {
        return new Vector4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
    }

    public mul(scalar: number): Vector4
    {
        return new Vector4(this.x * scalar, this.y * scalar, this.z * scalar, this.w * scalar);
    }

    public div(scalar: number): Vector4
    {
        const factor: number = 1 / scalar;
        return new Vector4(this.x * factor, this.y * factor, this.z * factor, this.w * factor);
    }

    public normalize(): Vector4
    {
        return this.div(this.magnitude);
    }

    public distance(v: Vector4): number
    {
        return this.sub(v).magnitude;
    }

    public get magnitude(): number { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }
}