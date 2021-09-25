import { Signal } from "../core";

export enum AssetType
{
    Audio,
    Image,
    Prefab,
    Video,
}

export type AssetLoadEvent = () => void;

export default class Asset
{
    private _filename: string;
    private _type: AssetType;

    public onDispose: Signal<Asset>;

    public constructor(type: AssetType, filename: string)
    {
        this._filename = filename;
        this._type = type;
        this.onDispose = new Signal<Asset>();
    }

    public get filename(): string { return this._filename; }
    public get type(): AssetType { return this._type; }

    public isReady(): boolean { return true; }
    
    public dispose(): void 
    { 
        this.onDispose.emit(this);
    }
}