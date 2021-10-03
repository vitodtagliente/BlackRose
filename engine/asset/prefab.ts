import { AssetLoadEvent } from ".";
import AssetData from "./asset_data";

export default class Prefab extends AssetData
{
    private _request: XMLHttpRequest;

    public constructor()
    {
        super("");
        this._request = new XMLHttpRequest();
    }

    protected _isLoaded(): boolean { return this._request.status == 200 && this._request.readyState == 4; }
    public load(filename: string, onLoadCallback: AssetLoadEvent = () => { }): void 
    {
        super.load(filename, onLoadCallback);
        this._request.open("GET", filename, true);
        this._request.onreadystatechange = () =>
        {
            if (this.isLoaded)
            {
                this._data = this._request.responseText;
                onLoadCallback();
            }
        };
        this._request.send();
    }
    public dispose(): void
    {
        super.dispose();
        this._data = null;
    }

}