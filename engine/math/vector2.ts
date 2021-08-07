export default class Vector2
{
    public static readonly zero = new Vector2();
    public static readonly one = new Vector2(1, 1);
    
    public static readonly up = new Vector2(0, 1);
    public static readonly right = new Vector2(1, 0);
    public static readonly left = new Vector2(-1, 0);
    public static readonly down = new Vector2(0, -1);

    public x: number;
    public y: number;

    public constructor(x?: number, y?: number)
    {
        this.x = x ?? 0;
        this.y = y ?? 0;
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