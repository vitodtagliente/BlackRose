import { serializable } from "../core";
import Asset, { AssetLoadEvent, AssetType } from "./asset";

@serializable
export default class Audio extends Asset
{
    private _data: HTMLAudioElement;

    public constructor()
    {
        super(AssetType.Audio);
        this._data = new window.Audio();
    }

    public get data(): HTMLAudioElement { return this._data; }
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