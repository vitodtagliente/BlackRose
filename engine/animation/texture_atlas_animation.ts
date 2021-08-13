import { TextureRect } from "../graphics";

export default class TextureAtlasAnimation
{
    private _frames: Array<TextureRect>;

    public constructor()
    {
        this._frames = new Array<TextureRect>();
    }

    public get frames(): Array<TextureRect> { return this._frames; }
    public get length(): number { return this._frames.length; }

    public add(frame: TextureRect): void 
    {
        this._frames.push(frame);
    }
}