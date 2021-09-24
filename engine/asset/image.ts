import { Application } from "../application";
import { Texture } from "../graphics";
import Asset, { AssetLoadEvent, AssetType } from "./asset";

export default class Image extends Asset
{
    private _data: Texture;

    public constructor(filename: string, onLoadCallback: AssetLoadEvent = () => { })
    {
        super(AssetType.Image, filename);
        let source: HTMLImageElement = new window.Image();
        source.onload = () =>
        {
            if (Application.main.context)
            {
                this._data = Application.main.context.createTexture(source);
            }
            onLoadCallback();
        };
        source.src = filename;
    }

    public get data(): Texture { return this._data; }
    public get width(): number { return this._data.image.naturalWidth; }
    public get height(): number { return this._data.image.naturalHeight; }

    public isReady(): boolean 
    {
        return this._data
            && this._data.image.complete
            && this.height !== 0;
    }

    public dispose(): void 
    {
        this._data = null;
    }
}