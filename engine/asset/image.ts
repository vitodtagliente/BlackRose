import Asset, { AssetLoadEvent, AssetType } from "./asset";

export default class Image extends Asset
{
    private _data: HTMLImageElement;

    public constructor(id: string, onLoadCallback: AssetLoadEvent = () => { })
    {
        super(AssetType.Image, id);
        this._data = new window.Image();
        this._data.onload = onLoadCallback;
        this._data.src = id;
    }

    public get data(): HTMLImageElement { return this._data; }
    public get width(): number { return this._data.naturalWidth; }
    public get height(): number { return this._data.naturalHeight; }

    public isReady(): boolean { return this._data.complete && this.height !== 0; }
    public dispose(): void 
    {
        this._data = null;
    }
}