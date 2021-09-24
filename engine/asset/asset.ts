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
    private _id: string;
    private _type: AssetType;

    public constructor(type: AssetType, id: string)
    {
        this._id = id;
        this._type = type;
    }

    public get id(): string { return this._id; }
    public get type(): AssetType { return this._type; }

    public isReady(): boolean { return true; }
    public dispose(): void { }
}