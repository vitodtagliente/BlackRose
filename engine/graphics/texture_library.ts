import { Context } from ".";
import { Asset, Image } from "../asset";
import Texture from "./texture";

export default class TextureLibrary
{
    private _context: Context;
    private _textures: Map<string, Texture>;

    public constructor(context: Context)
    {
        this._context = context;
        this._textures = new Map<string, Texture>();
    }

    public get textures(): Map<string, Texture> { return this._textures; }

    public get(image: Image): Texture
    {
        let texture: Texture = this._textures.get(image.filename);
        if (texture == null && this._context != null)
        {
            texture = this._context.createTexture(image);
            this._textures.set(image.filename, texture);
            image.onDispose.on((asset: Asset) =>
            {
                this._textures.delete(asset.filename);
            });
        }
        return texture;
    }
}