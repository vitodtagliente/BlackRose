import { AssetLoadEvent } from ".";
import AssetData from "./asset_data";

export default class Audio extends AssetData
{
    public constructor()
    {
        super(new window.Audio());
    }

    public get isPlaying(): boolean { return this.raw.paused == false; }

    public play(): void 
    {
        if (this.isPlaying == false)
        {
            this._data.play();
        }
    }

    protected _isLoaded(): boolean { return this.raw.networkState == this.raw.NETWORK_IDLE; }
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