import Asset, { AssetLoadEvent, AssetType } from "./asset";

export default class Frefab extends Asset
{
    private _data: JSON;

    public constructor(filename: string, onLoadCallback: AssetLoadEvent = () => { })
    {
        super(AssetType.Prefab, filename);
    }

    public get data(): JSON { return this._data; }

    public isReady(): boolean { return true; }
    public dispose(): void 
    {
        this._data = null;
    }
}