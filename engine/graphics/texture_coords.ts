import { clamp } from "../math";

export default class TextureCoords
{
    public static readonly zero: TextureCoords = new TextureCoords(0, 0);
    public static readonly one: TextureCoords = new TextureCoords(1, 1);

    public data: number[] = [2];

    public get u(): number { return this.data[0]; }
    public set u(value: number)
    {
        this.data[0] = clamp(value, 0, 1);
    }

    public get v(): number { return this.data[1]; }
    public set v(value: number)
    {
        this.data[1] = clamp(value, 0, 1);
    }

    public constructor(u?: number, v?: number)
    {
        this.data = [u, v];
    }

    public set(u: number, v: number): void 
    {
        this.u = u;
        this.v = v;
    }

    public copy(c: TextureCoords): void
    {
        c.u = this.u;
        c.v = this.v;
    }
}