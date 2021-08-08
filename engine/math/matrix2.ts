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

    public data: number[] = [4];

    public get m00(): number { return this.data[0]; }
    public set m00(value: number) { this.data[0] = value; }
    public get m01(): number { return this.data[1]; }
    public set m01(value: number) { this.data[1] = value; }

    public get m10(): number { return this.data[2]; }
    public set m10(value: number) { this.data[2] = value; }
    public get m11(): number { return this.data[3]; }
    public set m11(value: number) { this.data[3] = value; }

    public constructor(
        a00?: number, a01?: number,
        a10?: number, a11?: number
    )
    {
        this.data = [a00, a01, a10, a11];
    }

    public determinant(): number
    {
        return this.m00 * this.m11 - this.m01 * this.m10;
    }

    public transpose(): Matrix2
    {
        return new Matrix2(
            this.m00, this.m10,
            this.m01, this.m11
        );
    }

    public inverse(): Matrix2
    {
        return new Matrix2(
            this.m11, -this.m10,
            -this.m01, this.m00
        ).div(this.determinant());
    }

    public add(m: Matrix2): Matrix2
    {
        return new Matrix2(
            this.m00 + m.m00, this.m01 + m.m01,
            this.m10 + m.m10, this.m11 + m.m11
        );
    }

    public sub(m: Matrix2): Matrix2
    {
        return new Matrix2(
            this.m00 - m.m00, this.m01 - m.m01,
            this.m10 - m.m10, this.m11 - m.m11
        );
    }

    public mul(scalar: number): Matrix2
    {
        return new Matrix2(
            this.m00 * scalar, this.m01 * scalar,
            this.m10 * scalar, this.m11 * scalar
        );
    }

    public div(scalar: number): Matrix2
    {
        const factor: number = 1 / scalar;
        return new Matrix2(
            this.m00 * factor, this.m01 * factor,
            this.m10 * factor, this.m11 * factor
        );
    }
}