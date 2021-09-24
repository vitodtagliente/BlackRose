import Asset, { AssetLoadEvent, AssetType } from "./asset";

export default class Frefab extends Asset
{
    private _data: JSON;

    public constructor(id: string, onLoadCallback: AssetLoadEvent = () => { })
    {
        super(AssetType.Prefab, id);
    }

    public get data(): JSON { return this._data; }

    public isReady(): boolean { return true; }
    public dispose(): void 
    {
        this._data = null;
    }
}