import { Color } from ".";
import { Vector3 } from "../math";
import Command from "./command";
import GizmosCommand from "./commands/gizmos_command";

class Batch 
{
    private _size: number;
    private _data: Array<[Vector3, Color]>;

    public constructor(size: number)
    {
        this._size = size;
        this._data = new Array<[Vector3, Color]>();
    }

    public get length(): number { return this._data.length; }
    public get size(): number { return this._size; }
    public get isFull(): boolean { return this.length >= this.size; }
    public get data(): Array<[Vector3, Color]> { return this._data; }

    public add(position: Vector3, color: Color): boolean
    {
        if (this.length < this.size)
        {
            this._data.push([position, color]);
            return true;
        }
        return false;
    }

    public clear(): void
    {
        this._data.splice(0, this._data.length);
    }
}

export default class GizmosBatch
{
    private _batchSize: number;
    private _batches: Array<Batch>;
    private _batchIndex: number;

    public constructor(batchSize: number)
    {
        this._batchSize = batchSize;
        this._batches = new Array<Batch>();
        this._batches.push(new Batch(this._batchSize));
        this._batchIndex = 0;
    }

    public add(position: Vector3, color: Color): void
    {
        this._getBatch().add(position, color);
    }

    private _getBatch(): Batch
    {
        if (this._batches[this._batchIndex].isFull)
        {
            let batch: Batch = new Batch(this._batchSize);
            this._batches.push(batch);
            this._batchIndex++;
            return batch;
        }

        return this._batches[this._batchIndex];
    }

    public commands(): Array<Command>
    {
        let result: Array<Command> = [];
        for (const batch of this._batches)
        {
            result.push(new GizmosCommand(batch.data));
        }
        return result;
    }

    public clear(): void 
    {
        this._batches.splice(0, this._batches.length);
        this._batches.push(new Batch(this._batchSize));
        this._batchIndex = 0;
    }
}