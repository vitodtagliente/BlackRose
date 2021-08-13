export default class Vector2
{
    public static readonly zero = new Vector2(0, 0);
    public static readonly one = new Vector2(1, 1);

    public static readonly up = new Vector2(0, 1);
    public static readonly right = new Vector2(1, 0);
    public static readonly left = new Vector2(-1, 0);
    public static readonly down = new Vector2(0, -1);

    public data: number[] = [2];

    public get x(): number { return this.data[0]; }
    public set x(value: number) { this.data[0] = value; }
    public get y(): number { return this.data[1]; }
    public set y(value: number) { this.data[1] = value; }

    public constructor(x: number = 0, y: number = 0)
    {
        this.data = [x, y];
    }

    public set(x: number, y: number): void
    {
        this.x = x;
        this.y = y;
    }

    public copy(v: Vector2): void
    {
        v.x = this.x;
        v.y = this.y;
    }

    public add(v: Vector2): Vector2
    {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    public sub(v: Vector2): Vector2
    {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    public mul(scalar: number): Vector2
    {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    public div(scalar: number): Vector2
    {
        const factor: number = 1 / scalar;
        return new Vector2(this.x * factor, this.y * factor);
    }

    public dot(v: Vector2): number
    {
        return this.x * v.x + this.y * v.y;
    }

    public rotate(origin: Vector2, angle: number): Vector2
    {
        const diff = this.sub(origin);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return new Vector2(
            diff.x * cos - diff.y * sin + origin.x,
            diff.x * sin + diff.y * cos + origin.y
        );
    }

    public normalize(): Vector2
    {
        return this.div(this.magnitude);
    }

    public distance(v: Vector2): number
    {
        return this.sub(v).magnitude;
    }

    public get magnitude(): number { return Math.sqrt(this.x * this.x + this.y * this.y); }
}