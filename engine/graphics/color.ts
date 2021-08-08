
export default class Color
{
    public data: number[] = [4];

    public get r(): number { return this.data[0]; }
    public set r(value: number) { this.data[0] = value; }
    public get g(): number { return this.data[1]; }
    public set g(value: number) { this.data[1] = value; }
    public get b(): number { return this.data[2]; }
    public set b(value: number) { this.data[2] = value; }
    public get a(): number { return this.data[3]; }
    public set a(value: number) { this.data[3] = value; }

    public constructor(r?: number, g?: number, b?: number, a?: number)
    {
        this.data = [r, g, b, a];
    }

    public foo()
    {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }
}