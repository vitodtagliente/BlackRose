import { AssetLoadEvent } from ".";
import AssetData from "./asset_data";

export default class Image extends AssetData
{
    public constructor()
    {
        super(new window.Image());
    }

    public get width(): number { return this.raw.naturalWidth; }
    public get height(): number { return this.raw.naturalHeight; }

    protected _isLoaded(): boolean { return this.raw.complete && this.height !== 0; }
    public load(filename: string, onLoadCallback: AssetLoadEvent = () => { }): void 
    {
        super.load(filename, onLoadCallback);
        this._data.onload = onLoadCallback;
        this._data.src = filename;
    }
    public dispose(): void
    {
        super.dispose();
        this._data = null;
    }

}