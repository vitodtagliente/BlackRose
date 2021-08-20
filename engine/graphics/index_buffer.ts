export enum IndexBufferUsageMode
{
    Static,
    Dynamic,
    Stream
}

export default abstract class IndexBuffer
{
    private _usageMode: IndexBufferUsageMode;
    protected _length: number;

    public constructor(usageMode: IndexBufferUsageMode = IndexBufferUsageMode.Static)
    {
        this._length = 0;
        this._usageMode = usageMode;
    }

    public get length(): number { return this._length; }
    public get usageMode(): IndexBufferUsageMode { return this._usageMode; }

    public abstract bind(): void;
    public abstract update(data: Array<number>): void;
    public abstract free(): void;
}