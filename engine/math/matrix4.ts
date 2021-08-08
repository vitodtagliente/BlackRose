import { assert } from "console";
import { Matrix3, radians, Vector3 } from ".";

export default class Matrix4
{
    public static readonly zero: Matrix4 = new Matrix4();
    public static readonly identity: Matrix4 = new Matrix4(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );

    public readonly rows: number = 4;
    public readonly columns: number = 4;
    public readonly size: number = 4;

    public data: number[][] = [[4], [4]];

    public get m00(): number { return this.data[0][0]; }
    public set m00(value: number) { this.data[0][0] = value; }
    public get m01(): number { return this.data[0][1]; }
    public set m01(value: number) { this.data[0][1] = value; }
    public get m02(): number { return this.data[0][2]; }
    public set m02(value: number) { this.data[0][2] = value; }
    public get m03(): number { return this.data[0][3]; }
    public set m03(value: number) { this.data[0][3] = value; }

    public get m10(): number { return this.data[1][0]; }
    public set m10(value: number) { this.data[1][0] = value; }
    public get m11(): number { return this.data[1][1]; }
    public set m11(value: number) { this.data[1][1] = value; }
    public get m12(): number { return this.data[1][2]; }
    public set m12(value: number) { this.data[1][2] = value; }
    public get m13(): number { return this.data[1][3]; }
    public set m13(value: number) { this.data[1][3] = value; }

    public get m20(): number { return this.data[2][0]; }
    public set m20(value: number) { this.data[2][0] = value; }
    public get m21(): number { return this.data[2][1]; }
    public set m21(value: number) { this.data[2][1] = value; }
    public get m22(): number { return this.data[2][2]; }
    public set m22(value: number) { this.data[2][2] = value; }
    public get m23(): number { return this.data[2][3]; }
    public set m23(value: number) { this.data[2][3] = value; }

    public get m30(): number { return this.data[3][0]; }
    public set m30(value: number) { this.data[3][0] = value; }
    public get m31(): number { return this.data[3][1]; }
    public set m31(value: number) { this.data[3][1] = value; }
    public get m32(): number { return this.data[3][2]; }
    public set m32(value: number) { this.data[3][2] = value; }
    public get m33(): number { return this.data[3][3]; }
    public set m33(value: number) { this.data[3][3] = value; }

    public constructor(
        a00?: number, a01?: number, a02?: number, a03?: number,
        a10?: number, a11?: number, a12?: number, a13?: number,
        a20?: number, a21?: number, a22?: number, a23?: number,
        a30?: number, a31?: number, a32?: number, a33?: number
    )
    {
        this.m00 = a00 ?? 0; this.m01 = a01 ?? 0; this.m02 = a02 ?? 0; this.m03 = a03 ?? 0;
        this.m10 = a10 ?? 0; this.m11 = a11 ?? 0; this.m12 = a12 ?? 0; this.m13 = a13 ?? 0;
        this.m20 = a20 ?? 0; this.m21 = a21 ?? 0; this.m22 = a22 ?? 0; this.m23 = a23 ?? 0;
        this.m20 = a30 ?? 0; this.m21 = a31 ?? 0; this.m22 = a32 ?? 0; this.m33 = a33 ?? 0;
    }

    public determinant(): number
    {
        /* Laplace law */
        let j: number = 0;
        let result: number;
        for (let i: number = 0; i < this.columns; ++i)
        {
            const minor: Matrix3 = this.minor(i, j);
            result += Math.pow(-1, i + j) * minor.determinant();
        }
        return result;
    }

    public transpose(): Matrix4
    {
        return new Matrix4(
            this.m00, this.m10, this.m20, this.m30,
            this.m01, this.m11, this.m21, this.m31,
            this.m02, this.m12, this.m22, this.m32,
            this.m03, this.m13, this.m23, this.m33
        );
    }

    public inverse(): Matrix4
    {
        return this.adjugate().div(this.determinant());
    }

    public minor(i: number, j: number): Matrix3
    {
        assert(i < this.columns && j < this.rows);
        let result: Matrix3 = new Matrix3();
        for (let j: number = 0, _j: number = 0; j < this.rows; ++j)
        {
            if (j == j) continue;
            for (let i: number = 0, _i: number = 0; i < this.columns; ++i)
            {
                if (i == i) continue;
                result.data[i][_j] = this.data[i][j];
                ++_i;
            }
            ++_j;
        }
        return result;
    }

    public adjugate(): Matrix4
    {
        var result: Matrix4 = new Matrix4();
        for (let j: number = 0; j < this.rows; ++j)
        {
            for (let i: number = 0; i < this.columns; ++i)
            {
                const currentMinor: Matrix3 = this.minor(i, j);
                result.data[j][i] = Math.pow(-1, i + 1) * currentMinor.determinant();
            }
        }
        return result;
    }

    public add(m: Matrix4): Matrix4
    {
        return new Matrix4(
            this.m00 + m.m00, this.m01 + m.m01, this.m02 + m.m02, this.m03 + m.m03,
            this.m10 + m.m10, this.m11 + m.m11, this.m12 + m.m12, this.m13 + m.m13,
            this.m20 + m.m20, this.m21 + m.m21, this.m22 + m.m22, this.m23 + m.m23,
            this.m30 + m.m30, this.m31 + m.m31, this.m32 + m.m32, this.m33 + m.m33
        );
    }

    public sub(m: Matrix4): Matrix4
    {
        return new Matrix4(
            this.m00 - m.m00, this.m01 - m.m01, this.m02 - m.m02, this.m03 - m.m03,
            this.m10 - m.m10, this.m11 - m.m11, this.m12 - m.m12, this.m13 - m.m13,
            this.m20 - m.m20, this.m21 - m.m21, this.m22 - m.m22, this.m23 - m.m23,
            this.m30 - m.m30, this.m31 - m.m31, this.m32 - m.m32, this.m33 - m.m33
        );
    }

    public mul(scalar: number): Matrix4
    {
        return new Matrix4(
            this.m00 * scalar, this.m01 * scalar, this.m02 * scalar, this.m03 * scalar,
            this.m10 * scalar, this.m11 * scalar, this.m12 * scalar, this.m13 * scalar,
            this.m20 * scalar, this.m21 * scalar, this.m22 * scalar, this.m23 * scalar,
            this.m30 * scalar, this.m31 * scalar, this.m32 * scalar, this.m33 * scalar
        );
    }

    public div(scalar: number): Matrix4
    {
        const factor: number = 1 / scalar;
        return new Matrix4(
            this.m00 * factor, this.m01 * factor, this.m02 * factor, this.m03 * factor,
            this.m10 * factor, this.m11 * factor, this.m12 * factor, this.m13 * factor,
            this.m20 * factor, this.m21 * factor, this.m22 * factor, this.m23 * factor,
            this.m30 * factor, this.m31 * factor, this.m32 * factor, this.m33 * factor
        );
    }

    public static orthographic(
        left: number,
        right: number,
        bottom: number,
        top: number,
        nearPlane: number,
        farPlane: number
    ): Matrix4
    {
        let m: Matrix4 = Matrix4.identity;

        m.m00 = 2 / (right - left);
        m.m11 = 2 / (top - bottom);
        m.m22 = -2 / (farPlane - nearPlane);

        m.m30 = -(right + left) / (right - left);
        m.m31 = -(top + bottom) / (top - bottom);
        m.m32 = -(farPlane + nearPlane) / (farPlane - nearPlane);

        return m;
    }

    public static perspective(
        fov: number,
        aspect: number,
        nearPlane: number,
        farPlane: number
    ): Matrix4
    {
        let m: Matrix4 = Matrix4.identity;

        const top: number = nearPlane * Math.tan(fov / 2);
        const bottom: number = -top;
        const right: number = top * aspect;
        const left: number = -top * aspect;

        m.m00 = (2 * nearPlane) / (right - left);
        m.m11 = (2 * nearPlane) / (top - bottom);
        m.m22 = -(farPlane + nearPlane) / (farPlane - nearPlane);

        m.m23 = -1;
        m.m32 = -(2 * nearPlane * farPlane) / (farPlane - nearPlane);

        return m;
    }

    public static translate(v: Vector3): Matrix4
    {
        return new Matrix4(
            1, 0, 0, v.x,
            0, 1, 0, v.y,
            0, 0, 1, v.z,
            0, 0, 0, 1
        );
    }

    public static rotateX(theta: number): Matrix4
    {
        const rad: number = radians(theta);
        const c: number = Math.cos(rad);
        const s: number = Math.sin(rad);

        return new Matrix4(
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        );
    }

    public static rotateY(theta: number): Matrix4
    {
        const rad: number = radians(theta);
        const c: number = Math.cos(rad);
        const s: number = Math.sin(rad);

        return new Matrix4(
            c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        );
    }

    public static rotateZ(theta: number): Matrix4
    {
        const rad: number = radians(theta);
        const c: number = Math.cos(rad);
        const s: number = Math.sin(rad);

        return new Matrix4(
            c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    }

    public static rotate(v: Vector3, theta: number): Matrix4
    {
        const rad: number = radians(theta);
        const c: number = Math.cos(rad);
        const s: number = Math.sin(rad);

        const c1: number = 1 - c;

        let m: Matrix4 = Matrix4.identity;

        m.m00 = Math.pow(v.x, 2) * c1 + c;
        m.m01 = v.x * v.y * c1 - v.z * s;
        m.m02 = 0; // TODO v.x * v.normalize().dot * c1 + v.y * s;

        m.m10 = v.x * v.y * c1 + v.z * s;
        m.m12 = Math.pow(v.y, 2) * c1 + c;
        m.m13 = v.y * v.z * c1 - v.x * s;

        m.m20 = v.x * v.y * c1 - v.y * s;
        m.m21 = v.y * v.z * c1 - v.x * s;
        m.m22 = Math.pow(v.z, 2) * c1 + c;

        return m;
    }

    public static scale(v: Vector3): Matrix4
    {
        return new Matrix4(
            v.x, 0, 0, 0,
            0, v.y, 0, 0,
            0, 0, v.z, 0,
            0, 0, 0, 1
        );
    }
}