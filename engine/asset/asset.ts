import { Serializable, serializable, Signal } from "../core";

export enum AssetType
{
    Invalid,
    Audio,
    Image,
    Prefab,
    Video,
}

export type AssetLoadEvent = () => void;

@serializable
export default class Asset extends Serializable
{
    private _filename: string;
    private _type: AssetType;

    public onDispose: Signal<Asset>;

    public constructor(type: AssetType = AssetType.Invalid)
    {
        super();
        this._type = type;
        this.onDispose = new Signal<Asset>();
    }

    public get filename(): string { return this._filename; }
    public get type(): AssetType { return this._type; }

    public load(filename: string, onLoadCallback: AssetLoadEvent = () => { }): void
    {
        this._filename = filename;
    }

    public isReady(): boolean { return true; }

    public dispose(): void 
    {
        this.onDispose.emit(this);
    }

    public toSerializationData(): any
    {
        let data: SerializationData = super.toSerializationData();
        data.filename = this.filename;
        data.type = this.type;
        return data;
    }

    public fromSerializationData(data: SerializationData): void 
    {
        if (data)
        {
            this._filename = data.filename;
            this._type = data.type;
        }
    }
}

interface SerializationData
{
    filename: string;
    type: AssetType;
}