import { serializable } from "../core";
import { Entity } from "../scene";
import Asset, { AssetLoadEvent, AssetType } from "./asset";

@serializable
export default class Frefab extends Asset
{
    private _data: Entity;

    public constructor()
    {
        super(AssetType.Prefab);
    }

    public load(filename: string, onLoadCallback: AssetLoadEvent = () => { }): void 
    {
        super.load(filename, onLoadCallback);
    }

    public get data(): Entity { return this._data; }

    public isReady(): boolean { return true; }
    public dispose(): void 
    {
        super.dispose();
        this._data = null;
    }
}