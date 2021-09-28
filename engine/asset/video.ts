import { serializable } from "../core";
import Asset, { AssetLoadEvent, AssetType } from "./asset";

@serializable
export default class Video extends Asset
{
    private _data: HTMLVideoElement;

    public constructor()
    {
        super(AssetType.Video);
        // this._data = new window.v();
    }

    public get data(): HTMLVideoElement { return this._data; }
    public get isPlaying(): boolean { return this._data.paused == false; }

    public load(filename: string, onLoadCallback: AssetLoadEvent = () => { }): void 
    {
        super.load(filename, onLoadCallback);
        this._data.onload = onLoadCallback;
        this._data.src = filename;
    }

    public play(): void 
    {
        if (this.isPlaying == false)
        {
            this._data.play();
        }
    }

    public isReady(): boolean { return this._data.networkState == this._data.NETWORK_IDLE; }
    public dispose(): void 
    {
        super.dispose();
        this._data = null;
    }
}