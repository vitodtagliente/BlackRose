import { TextureCoords } from ".";

export default class TextureRect
{
    private _origin: TextureCoords;
    private _size: TextureCoords;

    public constructor(origin?: TextureCoords, size?: TextureCoords)
    {
        this._origin = origin ? origin : TextureCoords.zero;
        this._size = size ? size : TextureCoords.one;
    }

    public get origin(): TextureCoords { return this._origin; }
    public get size(): TextureCoords { return this._size; }

    public copy(r: TextureRect): void 
    {
        this._origin.copy(r._origin);
        this._size.copy(r._size);
    }
}