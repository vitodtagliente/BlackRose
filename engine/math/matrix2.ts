export default class Matrix2
{
    public static readonly zero: Matrix2 = new Matrix2();
    public static readonly identity: Matrix2 = new Matrix2(
        1, 0,
        0, 1
    );

    public readonly rows: number = 2;
    public readonly columns: number = 2;
    public readonly size: number = 2;

    private _data: number[][] = [[2], [2]];

    public get m00(): number { return this._data[0][0]; }
    public set m00(value: number) { this._data[0][0] = value; }
    public get m01(): number { return this._data[0][1]; }
    public set m01(value: number) { this._data[0][1] = value; }
    public get m10(): number { return this._data[1][0]; }
    public set m10(value: number) { this._data[1][0] = value; }
    public get m11(): number { return this._data[1][1]; }
    public set m11(value: number) { this._data[1][1] = value; }

    public constructor(
        a00?: number, a01?: number,
        a10?: number, a11?: number
    )
    {
        this.m00 = a00 ?? 0;
        this.m01 = a01 ?? 0;
        this.m10 = a10 ?? 0;
        this.m11 = a11 ?? 0;
    }
}