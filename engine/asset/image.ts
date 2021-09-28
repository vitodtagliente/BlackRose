import { serializable } from "../core";
import Asset, { AssetLoadEvent, AssetType } from "./asset";

@serializable
export default class Image extends Asset
{
    private _data: HTMLImageElement;

    public constructor()
    {
        super(AssetType.Image);
        this._data = new window.Image();
    }

    public get data(): HTMLImageElement { return this._data; }
    public get width(): number { return this._data.naturalWidth; }
    public get height(): number { return this._data.naturalHeight; }

    public load(filename: string, onLoadCallback: AssetLoadEvent = () => { }): void 
    {
        super.load(filename, onLoadCallback);
        this._data.onload = onLoadCallback;
        this._data.src = filename;
    }

    public isReady(): boolean { return this._data.complete && this.height !== 0; }

    public dispose(): void 
    {
        super.dispose();
        this._data = null;
    }
}