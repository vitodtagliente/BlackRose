export default abstract class Texture
{
    private _image: HTMLImageElement;

    public constructor(image: HTMLImageElement)
    {
        this._image = image;
    }

    public get image(): HTMLImageElement { return this._image; }

    public abstract bind(slot: number): void;
    public abstract free(): void;
}