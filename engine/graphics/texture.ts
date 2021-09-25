import { Image } from "../asset";

export default abstract class Texture
{
    private _image: Image;

    public constructor(image: Image)
    {
        this._image = image;
    }

    public get image(): Image { return this._image; }

    public abstract bind(slot: number): void;
    public abstract free(): void;
}