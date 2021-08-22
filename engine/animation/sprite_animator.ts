import { SpriteAnimation } from ".";
import { Application } from "../application";
import { SpriteComponent } from "../components";
import { Component } from "../scene";

class PlayingState 
{

}

export default class SpriteAnimator extends Component
{
    private _sprite: SpriteComponent;
    private _animations: Map<string, SpriteAnimation>;
    private _isPlaying: boolean;
    private _state: PlayingState;

    public constructor(app: Application)
    {
        super(app);
        this._animations = new Map<string, SpriteAnimation>();
        this._isPlaying = false;
    }

    public get isPlaying(): boolean { return this._isPlaying; }

    public init(): void 
    {
        this._sprite = this.owner.findComponent(SpriteComponent);
    }

    public add(name: string, animation: SpriteAnimation)
    {
        this._animations.set(name, animation);
    }

    public update(deltaTime: number): void 
    {
        if(this._isPlaying)
        {

        }
    }

    public play(name: string, loop: boolean = true): void 
    {

    }
}