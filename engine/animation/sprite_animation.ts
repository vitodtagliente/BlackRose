import { TextureRect } from "../graphics";

export default class SpriteAnimation
{
    private _frames: Array<[TextureRect, number]>;
    public startingFrame: number = 0;

    public constructor()
    {
        this._frames = new Array<[TextureRect, number]>();
    }

    public get frames(): Array<[TextureRect, number]> { return this._frames; }
    public get length(): number { return this._frames.length; }

    public add(frame: TextureRect, duration: number): void 
    {
        this._frames.push([frame, duration]);
    }
}