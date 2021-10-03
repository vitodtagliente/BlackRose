import { AssetLoadEvent } from ".";
import { Signal } from "../core";

export default abstract class AssetData
{
    private _id: number;
    protected _data: any;
    public onDispose: Signal<AssetData>;

    private static _id_counter: number = 0;

    public constructor(data?: any)
    {
        this._id = ++AssetData._id_counter;
        this._data = data;
        this.onDispose = new Signal<AssetData>();
    }

    public get id(): number { return this._id; }
    public get raw(): any { return this._data; }
    public get isLoaded(): boolean { return this._isLoaded(); }

    protected _isLoaded(): boolean { return false; }
    public load(filename: string, onLoadCallback: AssetLoadEvent = () => { }): void { }
    public dispose(): void { this.onDispose.emit(this); }
}