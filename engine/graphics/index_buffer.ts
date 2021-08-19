export default abstract class IndexBuffer
{
    protected _length: number;

    public constructor()
    {
        this._length = 0;
    }

    public get length(): number { return this._length; }

    public abstract bind(): void;
    public abstract update(data: Array<number>): void;
    public abstract free(): void;
}