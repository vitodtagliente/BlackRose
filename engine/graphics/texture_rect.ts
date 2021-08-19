import { TextureCoords } from ".";

export default class TextureRect
{
    private _origin: TextureCoords;
    private _size: TextureCoords;

    public constructor(x: number = 0, y: number = 0, width: number = 1, height: number = 1)
    {
        this._origin = new TextureCoords(x, y);
        this._size = new TextureCoords(width, height);
    }

    public get origin(): TextureCoords { return this._origin; }
    public get size(): TextureCoords { return this._size; }

    public copy(r: TextureRect): void 
    {
        this._origin.copy(r._origin);
        this._size.copy(r._size);
    }
}