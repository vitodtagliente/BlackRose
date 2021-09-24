import Asset, { AssetLoadEvent, AssetType } from "./asset";

export default class Audio extends Asset
{
    private _data: HTMLAudioElement;

    public constructor(filename: string, onLoadCallback: AssetLoadEvent = () => { })
    {
        super(AssetType.Audio, filename);
        this._data = new window.Audio();
        this._data.onload = onLoadCallback;
        this._data.src = filename;
    }

    public get data(): HTMLAudioElement { return this._data; }
    public get isPlaying(): boolean { return this._data.paused == false; }

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
        this._data = null;
    }
}