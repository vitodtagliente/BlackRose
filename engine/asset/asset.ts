import { Image, Audio, Prefab, AssetLibrary } from ".";
import { Serializable, serializable } from "../core";
import AssetData from "./asset_data";

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
    private _data: AssetData;
    private _filename: string;
    private _type: AssetType;

    public constructor(type: AssetType = AssetType.Invalid)
    {
        super();
        this._type = type;

        switch (type)
        {
            case AssetType.Image: this._data = new Image(); break;
            case AssetType.Audio: this._data = new Audio(); break;
            case AssetType.Prefab: this._data = new Prefab(); break;
            default: break;
        }
    }

    public get data(): AssetData { return this._data; }
    public get filename(): string { return this._filename; }
    public get type(): AssetType { return this._type; }

    public load(filename: string, onLoadCallback: AssetLoadEvent = () => { }): void
    {
        if (filename.length == 0) return;

        this._filename = filename;
        const data: AssetData = AssetLibrary.main.get(this.type, filename);
        if (data)
        {
            this._data = data;
        }
        else 
        {
            this._data.load(filename, onLoadCallback);
            AssetLibrary.main.add(this.type, filename, this._data);
        }
    }

    public isLoaded(): boolean { return this.data && this.data.isLoaded; }

    public dispose(): void 
    {
        if (this.data)
            this.data.dispose();
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