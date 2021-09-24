import Asset, { AssetLoadEvent, AssetType } from "./asset";

export default class Video extends Asset
{
    private _data: HTMLVideoElement;

    public constructor(id: string, onLoadCallback: AssetLoadEvent = () => { })
    {
        super(AssetType.Video, id);
        // this._data = new window.v();
        this._data.onload = onLoadCallback;
        this._data.src = id;
    }

    public get data(): HTMLVideoElement { return this._data; }
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