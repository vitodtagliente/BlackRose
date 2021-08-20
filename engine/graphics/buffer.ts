export enum BufferUsageMode
{
    Static,
    Dynamic,
    Stream
}

export default abstract class Buffer 
{
    private _mode: BufferUsageMode;
    private _length: number;

    public constructor(size: number, mode: BufferUsageMode)
    {
        this._mode = mode;
        this._length = size;
    }

    public get mode(): BufferUsageMode { return this._mode; }
    public get length(): number { return this._length; }

    public abstract bind(): void;
    public abstract fillData(data: Array<number>): void;
    public abstract fillSubData(data: Array<number>, offset: number): void;
    public abstract free(): void;
}