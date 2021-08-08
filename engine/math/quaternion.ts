export default class Quaternion
{
    public data: number[] = [4];

    public get x(): number { return this.data[0]; }
    public set x(value: number) { this.data[0] = value; }
    public get y(): number { return this.data[1]; }
    public set y(value: number) { this.data[1] = value; }
    public get z(): number { return this.data[2]; }
    public set z(value: number) { this.data[2] = value; }
    public get w(): number { return this.data[3]; }
    public set w(value: number) { this.data[3] = value; }

    public constructor()
    {

    }
}