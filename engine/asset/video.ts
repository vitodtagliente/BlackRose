import Asset, { AssetLoadEvent, AssetType } from "./asset";

export default class Video extends Asset
{
    private _data: HTMLVideoElement;

    public constructor(filename: string, onLoadCallback: AssetLoadEvent = () => { })
    {
        super(AssetType.Video, filename);
        // this._data = new window.v();
        this._data.onload = onLoadCallback;
        this._data.src = filename;
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
        super.dispose();
        this._data = null;
    }
}