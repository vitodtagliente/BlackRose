import { Audio, Image, Video } from ".";
import Asset, { AssetType } from "./asset";

class AssetCache
{
    private _type: AssetType;
    private _assets: Map<string, Asset>;

    public constructor(type: AssetType)
    {
        this._type = type;
        this._assets = new Map<string, Asset>();
    }

    public get type(): AssetType { return this._type; }

    public add(asset: Asset): boolean
    {
        if (asset.type == this.type)
        {
            this._assets.set(asset.filename, asset);
            return true;
        }
        return false;
    }

    public get(id: string): Asset
    {
        let asset: Asset = this._assets.get(id);
        if (asset == null)
        {
            switch(this.type)
            {
                case AssetType.Image: asset = new Image(); break;
                case AssetType.Audio: asset = new Audio(); break;
                case AssetType.Video: asset = new Video(); break;
                default: return null;
            }
            asset.load(id);
        }
        return asset;
    }

    public dispose(id: string): void 
    {
        const asset: Asset = this.get(id);
        if (asset != null)
        {
            asset.dispose();
            this._assets.delete(id);
        }
    }

    public clear(): void 
    {
        for (const [id, asset] of this._assets)
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

    public add(asset: Asset): boolean
    {
        let cache: AssetCache = this._caches.get(asset.type);
        if (cache == null)
        {
            cache = new AssetCache(asset.type);
            this._caches.set(asset.type, cache);
        }
        return cache.add(asset);
    }

    public get(type: AssetType, id: string): Asset
    {
        const cache: AssetCache = this._caches.get(type);
        if (cache != null)
        {
            return cache.get(id);
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