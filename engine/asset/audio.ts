import Asset, { AssetLoadEvent, AssetType } from "./asset";

export default class Audio extends Asset
{
    private _data: HTMLAudioElement;

    public constructor(id: string, onLoadCallback: AssetLoadEvent = () => { })
    {
        super(AssetType.Audio, id);
        this._data = new window.Audio();
        this._data.onload = onLoadCallback;
        this._data.src = id;
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