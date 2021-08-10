type ImageLoadEvent = () => void;

export default class Image 
{
    private _data: HTMLImageElement;

    public constructor(data: HTMLImageElement)
    {
        this._data = data;
    }

    public get data(): HTMLImageElement { return this._data; }
    public get filename(): string { return this._data.src; }
    public get width(): number { return this._data.naturalWidth; }
    public get height(): number { return this._data.naturalHeight; }

    public get isLoaded(): boolean { return this._data.complete && this.height !== 0; }

    public static load(filename: string, onLoadCallback: ImageLoadEvent = () => { }): Image 
    {
        const img: HTMLImageElement = new window.Image();
        img.onload = onLoadCallback;
        img.src = filename;
        return new Image(img);
    }
}