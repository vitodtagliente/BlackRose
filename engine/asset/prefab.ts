import { serializable } from "../core";
import Asset, { AssetLoadEvent, AssetType } from "./asset";

@serializable
export default class Frefab extends Asset
{
    private _data: string;

    public constructor()
    {
        super(AssetType.Prefab);
        this._data = JSON.stringify({});
    }

    public load(filename: string, onLoadCallback: AssetLoadEvent = () => { }): void 
    {
        super.load(filename, onLoadCallback);
    }

    public get data(): string { return this._data; }
    public set data(value: string) { this._data = value; }

    public isReady(): boolean { return true; }
    public dispose(): void 
    {
        super.dispose();
        this._data = null;
    }
}