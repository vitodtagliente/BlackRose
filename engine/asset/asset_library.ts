import { Audio, Image, Prefab } from ".";
import Asset, { AssetType } from "./asset";
import AssetData from "./asset_data";

class AssetCache
{
    private _type: AssetType;
    private _assets: Map<string, AssetData>;

    public constructor(type: AssetType)
    {
        this._type = type;
        this._assets = new Map<string, AssetData>();
    }

    public get type(): AssetType { return this._type; }

    public add(filename: string, asset: AssetData): boolean
    {
        this._assets.set(filename, asset);
        return true;
    }

    public get(filename: string): AssetData
    {
        return this._assets.get(filename);
    }

    public dispose(filename: string): void 
    {
        const asset: AssetData = this.get(filename);
        if (asset != null)
        {
            asset.dispose();
            this._assets.delete(filename);
        }
    }

    public clear(): void 
    {
        for (const [filename, asset] of this._assets)
        {
            asset.dispose();
        }
        this._assets.clear();
    }
}

export default class AssetLibrary
{
    private static _main: AssetLibrary;
    public static get main(): AssetLibrary
    {
        if (AssetLibrary._main == null)
        {
            AssetLibrary._main = new AssetLibrary();
        }
        return AssetLibrary._main;
    }

    private _caches: Map<AssetType, AssetCache>;

    private constructor()
    {
        console.assert(AssetLibrary._main == null);
        this._caches = new Map<AssetType, AssetCache>();
    }

    public add(type: AssetType, filename: string, asset: AssetData): boolean
    {
        let cache: AssetCache = this._caches.get(type);
        if (cache == null)
        {
            cache = new AssetCache(type);
            this._caches.set(type, cache);
        }
        return cache.add(filename, asset);
    }

    public get(type: AssetType, filename: string): AssetData
    {
        const cache: AssetCache = this._caches.get(type);
        if (cache != null)
        {
            return cache.get(filename);
        }
        return null;
    }

    public clear(type?: AssetType | null): void 
    {
        if (type != null)
        {
            const cache: AssetCache = this._caches.get(type);
            if (cache != null)
            {
                cache.clear();
            }
        }
        else 
        {
            for (const [type, cache] of this._caches)
            {
                cache.clear();
            }
        }
    }
}