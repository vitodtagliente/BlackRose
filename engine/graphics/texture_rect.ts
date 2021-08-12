import { TextureCoords } from ".";

export default class TextureRect
{
    public origin: TextureCoords;
    public size: TextureCoords;

    public constructor(origin?: TextureCoords, size?: TextureCoords)
    {
        this.origin = origin ? origin : TextureCoords.zero;
        this.size = size ? size : TextureCoords.one;
    }
}