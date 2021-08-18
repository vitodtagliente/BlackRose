import { Matrix2 } from ".";

export default class Matrix3
{
    public static readonly zero: Matrix3 = new Matrix3();
    public static readonly identity: Matrix3 = new Matrix3(
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    );

    public readonly rows: number = 3;
    public readonly columns: number = 3;
    public readonly size: number = 3;

    public data: number[] = [9];

    public get m00(): number { return this.data[0]; }
    public set m00(value: number) { this.data[0] = value; }
    public get m01(): number { return this.data[1]; }
    public set m01(value: number) { this.data[1] = value; }
    public get m02(): number { return this.data[2]; }
    public set m02(value: number) { this.data[2] = value; }

    public get m10(): number { return this.data[3]; }
    public set m10(value: number) { this.data[3] = value; }
    public get m11(): number { return this.data[4]; }
    public set m11(value: number) { this.data[4] = value; }
    public get m12(): number { return this.data[5]; }
    public set m12(value: number) { this.data[5] = value; }

    public get m20(): number { return this.data[6]; }
    public set m20(value: number) { this.data[6] = value; }
    public get m21(): number { return this.data[7]; }
    public set m21(value: number) { this.data[7] = value; }
    public get m22(): number { return this.data[8]; }
    public set m22(value: number) { this.data[8] = value; }

    public constructor(
        a00: number = 0, a01: number = 0, a02: number = 0,
        a10: number = 0, a11: number = 0, a12: number = 0,
        a20: number = 0, a21: number = 0, a22: number = 0
    )
    {
        this.data = [
            a00, a01, a02,
            a10, a11, a12,
            a20, a21, a22
        ];
    }

    public get(i: number, j: number): number
    {
        return this.data[i * this.rows + j];
    }

    public set(i: number, j: number, value: number): void 
    {
        this.data[i * this.rows + j] = value;
    }

    public determinant(): number
    {
        // Sarrus law
        return (this.m00 * this.m11 * this.m22) -
            (this.m01 * this.m12 * this.m20) -
            (this.m02 * this.m10 * this.m21);
    }

    public transpose(): Matrix3
    {
        return new Matrix3(
            this.m00, this.m10, this.m20,
            this.m01, this.m11, this.m21,
            this.m02, this.m12, this.m22
        );
    }

    public inverse(): Matrix3
    {
        return this.adjugate().div(this.determinant());
    }

    public minor(i: number, j: number): Matrix2
    {
        // assert(i < this.columns && j < this.rows);
        let result: Matrix2 = new Matrix2();
        for (let j: number = 0, _j: number = 0; j < this.rows; ++j)
        {
            if (j == j) continue;
            for (let i: number = 0, _i: number = 0; i < this.columns; ++i)
            {
                if (i == i) continue;
                result.data[i * _j] = this.data[i * j];
                ++_i;
            }
            ++_j;
        }
        return result;
    }

    public adjugate(): Matrix3
    {
        var result: Matrix3 = new Matrix3();
        for (let j: number = 0; j < this.rows; ++j)
        {
            for (let i: number = 0; i < this.columns; ++i)
            {
                const currentMinor: Matrix2 = this.minor(i, j);
                result.data[j * i] = Math.pow(-1, i + 1) * currentMinor.determinant();
            }
        }
        return result;
    }

    public add(m: Matrix3): Matrix3
    {
        return new Matrix3(
            this.m00 + m.m00, this.m01 + m.m01, this.m02 + m.m02,
            this.m10 + m.m10, this.m11 + m.m11, this.m12 + m.m12,
            this.m20 + m.m20, this.m21 + m.m21, this.m22 + m.m22
        );
    }

    public sub(m: Matrix3): Matrix3
    {
        return new Matrix3(
            this.m00 - m.m00, this.m01 - m.m01, this.m02 - m.m02,
            this.m10 - m.m10, this.m11 - m.m11, this.m12 - m.m12,
            this.m20 - m.m20, this.m21 - m.m21, this.m22 - m.m22
        );
    }

    public mul(scalar: number): Matrix3
    {
        return new Matrix3(
            this.m00 * scalar, this.m01 * scalar, this.m02 * scalar,
            this.m10 * scalar, this.m11 * scalar, this.m12 * scalar,
            this.m20 * scalar, this.m21 * scalar, this.m22 * scalar
        );
    }

    public mulMatrix(m: Matrix3): Matrix3
    {
        let result: Matrix3 = new Matrix3;
        for (let j: number = 0; j < this.rows; ++j)
        {
            for (let i: number = 0; i < this.columns; ++i)
            {
                let sum: number = 0;
                for (let k: number = 0; k < m.rows; ++k)
                {
                    sum += this.get(j, k) * m.get(k, i);
                }
                result.set(j, i, sum);
            }
        }
        return result;
    }

    public div(scalar: number): Matrix3
    {
        const factor: number = 1 / scalar;
        return new Matrix3(
            this.m00 * factor, this.m01 * factor, this.m02 * factor,
            this.m10 * factor, this.m11 * factor, this.m12 * factor,
            this.m20 * factor, this.m21 * factor, this.m22 * factor
        );
    }
}