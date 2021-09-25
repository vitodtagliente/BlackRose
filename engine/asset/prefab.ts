import { Entity } from "../scene";
import Asset, { AssetLoadEvent, AssetType } from "./asset";

export default class Frefab extends Asset
{
    private _data: Entity;

    public constructor(filename: string, onLoadCallback: AssetLoadEvent = () => { })
    {
        super(AssetType.Prefab, filename);
    }

    public get data(): Entity { return this._data; }

    public isReady(): boolean { return true; }
    public dispose(): void 
    {
        super.dispose();
        this._data = null;
    }
}