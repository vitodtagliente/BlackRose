import { serializable, Serializable } from "../core";

@serializable
export default class Vector4 extends Serializable
{
    public static zero(): Vector4 { return new Vector4(0, 0, 0, 0); }
    public static one(): Vector4 { return new Vector4(1, 1, 1, 1) }

    public data: Float32Array;

    public get x(): number { return this.data[0]; }
    public set x(value: number) { this.data[0] = value; }
    public get y(): number { return this.data[1]; }
    public set y(value: number) { this.data[1] = value; }
    public get z(): number { return this.data[2]; }
    public set z(value: number) { this.data[2] = value; }
    public get w(): number { return this.data[3]; }
    public set w(value: number) { this.data[3] = value; }

    public constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0)
    {
        super();
        this.data = new Float32Array([x, y, z, w]);
    }

    public set(x: number, y: number, z: number, w: number): void
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public copy(v: Vector4): void
    {
        v.data = this.data.slice();
    }

    public equals(v: Vector4): boolean
    {
        return this.x == v.x && this.y == v.y && this.z == v.z && this.w == v.w;
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
        const mag: number = this.magnitude;
        if (mag > 0)
        {
            return this.div(this.magnitude);
        }
        else return new Vector4(this.x, this.y, this.z, this.w);
    }

    public distance(v: Vector4): number
    {
        return this.sub(v).magnitude;
    }

    public get magnitude(): number { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }
    
    public serialize(): any 
    {
        let data: any = super.serialize();
        data["x"] = this.x;
        data["y"] = this.y;
        data["z"] = this.z;
        data["w"] = this.w;
        return data;
    }

    public deserialize(data: any): void 
    {
        for (const key of Object.keys(data))
        {
            switch (key)
            {
                case "x": this.x = data[key]; break;
                case "y": this.x = data[key]; break;
                case "z": this.x = data[key]; break;
                case "w": this.x = data[key]; break;
            }
        }
    }
}