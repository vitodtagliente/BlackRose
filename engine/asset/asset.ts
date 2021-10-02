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

    public serialize(): any 
    {
        let data: any = super.serialize();
        data["type"] = this.type;
        data["filename"] = this.filename;
        return data;
    }

    public deserialize(data: any): void 
    {
        for (const key of Object.keys(data))
        {
            switch (key)
            {
                case "type": this._type = data[key]; break;
                case "filename": this._filename = data[key]; break;
            }
        }

        if (this.filename.length > 0)
        {
            this.load(this.filename);
        }
    }
}