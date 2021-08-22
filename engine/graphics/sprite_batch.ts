import { Transform } from "../math";
import Command from "./command";
import SpriteCommand from "./commands/sprite_command";
import Texture from "./texture";
import TextureRect from "./texture_rect";

class Batch 
{
    private _size: number;
    private _data: Array<[Transform, TextureRect]>;

    public constructor(size: number)
    {
        this._size = size;
        this._data = new Array<[Transform, TextureRect]>();
    }

    public get length(): number { return this._data.length; }
    public get size(): number { return this._size; }
    public get isFull(): boolean { return this.length >= this.size; }
    public get data(): Array<[Transform, TextureRect]> { return this._data; }

    public add(transform: Transform, rect: TextureRect): boolean
    {
        if (this.length < this.size)
        {
            this._data.push([transform, rect]);
            return true;
        }
        return false;
    }

    public clear(): void
    {
        this._data.splice(0, this._data.length);
    }
}

export default class SpriteBatch
{
    private _batchSize: number;
    private _batches: Map<Texture, Array<Batch>>;

    public constructor(batchSize: number)
    {
        this._batchSize = batchSize;
        this._batches = new Map<Texture, Array<Batch>>();
    }

    public add(texture: Texture, transform: Transform, rect: TextureRect): void
    {
        this._getBatch(texture).add(transform, rect);
    }

    private _getBatch(texture: Texture): Batch
    {
        if (this._batches.has(texture) == false)
        {
            let batch: Batch = new Batch(this._batchSize);
            this._batches.set(texture, [batch]);
            return batch;
        }

        let batches: Array<Batch> = this._batches.get(texture);
        for (let batch of batches)
        {
            if (batch.isFull == false)
            {
                return batch;
            }
        }

        let batch: Batch = new Batch(this._batchSize);
        batches.push(batch);
        return batch;
    }

    public commands(): Array<Command>
    {
        let result: Array<Command> = [];
        for (const [texture, batches] of this._batches)
        {
            for (const batch of batches)
            {
                result.push(new SpriteCommand(texture, batch.data));
            }
        }
        return result;
    }

    public clear(): void 
    {
        this._batches.clear();
    }
}