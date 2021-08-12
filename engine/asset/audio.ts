type AudioLoadEvent = () => void;

export default class Audio 
{
    private _data: HTMLAudioElement;

    public constructor(data: HTMLAudioElement)
    {
        this._data = data;
    }

    public get data(): HTMLAudioElement { return this._data; }
    public get filename(): string { return this._data.src; }

    public get isLoaded(): boolean { return this._data.networkState == this._data.NETWORK_IDLE; }

    public play(): void 
    {
        if (this.isPlaying == false)
            this._data.play();
    }

    public get isPlaying(): boolean
    {
        return this._data.paused == false;
    }

    public static load(filename: string, onLoadCallback: AudioLoadEvent = () => { }): Audio 
    {
        const audio: HTMLAudioElement = new window.Audio();
        audio.onload = onLoadCallback;
        audio.src = filename;
        return new Audio(audio);
    }
}