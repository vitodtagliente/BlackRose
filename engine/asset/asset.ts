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
}