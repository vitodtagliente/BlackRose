
export default class Color
{
    public static readonly white: Color = new Color(1, 1, 1);
    public static readonly black: Color = new Color(0, 0, 0);
    public static readonly red: Color = new Color(1, 0, 0);
    public static readonly green: Color = new Color(0, 1, 0);
    public static readonly blue: Color = new Color(0, 0, 1);
    public static readonly cyan: Color = new Color(0, 1, 1);
    public static readonly yellow: Color = new Color(1, 1, 0);
    public static readonly magenta: Color = new Color(1, 0, 1);
    public static readonly transparent: Color = new Color(0, 0, 0, 0);

    public data: number[] = [4];

    public get r(): number { return this.data[0]; }
    public set r(value: number)
    {
        // assert(value => 0 && value <= 1);
        this.data[0] = value / 255;
    }
    public get g(): number { return this.data[1]; }
    public set g(value: number)
    {
        // assert(value => 0 && value <= 1);
        this.data[1] = value / 255;
    }
    public get b(): number { return this.data[2]; }
    public set b(value: number)
    {
        // assert(value => 0 && value <= 1);
        this.data[2] = value / 255;
    }
    public get a(): number { return this.data[3]; }
    public set a(value: number)
    {
        // assert(value => 0 && value <= 1);
        this.data[3] = value / 255;
    }

    public constructor(r?: number, g?: number, b?: number, a?: number)
    {
        this.data = [r, g, b, a ? a : 1];
    }

    public get name()
    {
        return `rgba(${this.r * 255},${this.g * 255},${this.b * 255},${this.a * 255})`;
    }
}