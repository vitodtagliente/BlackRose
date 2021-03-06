import { SpriteAnimation } from ".";
import { Application } from "../application";
import { SpriteRenderer } from "../components";
import { Component, World } from "../scene";

class PlayingState 
{
    public animation: SpriteAnimation = null;
    public frameIndex: number = 0;
    public loop: boolean = false;
    public timer: number = 0;
}

export default class SpriteAnimator extends Component
{
    private _sprite: SpriteRenderer;
    private _animations: Map<string, SpriteAnimation>;
    private _isPlaying: boolean;
    private _state: PlayingState;

    public constructor()
    {
        super();
        this._animations = new Map<string, SpriteAnimation>();
        this._state = new PlayingState();
        this._isPlaying = false;
    }

    public get isPlaying(): boolean { return this._isPlaying; }

    public init(): void 
    {
        this._sprite = this.owner.findComponent(SpriteRenderer);
    }

    public add(name: string, animation: SpriteAnimation)
    {
        this._animations.set(name, animation);
    }

    public update(world: World, deltaTime: number): void 
    {
        if (this._isPlaying)
        {
            this._state.timer -= deltaTime;
            if (this._state.timer <= 0)
            {
                ++this._state.frameIndex;
                if (this._state.frameIndex >= this._state.animation.length)
                {
                    if (this._state.loop)
                    {
                        this._state.frameIndex = 0;
                    }
                    else 
                    {
                        this._isPlaying = false;
                        return;
                    }
                }

                const [frame, duration] = this._state.animation.frames[this._state.frameIndex];
                this._state.timer = duration;
                frame.copy(this._sprite.textureRect);
            }
        }
    }

    public play(name: string, loop: boolean = true): void 
    {
        if (this._sprite && this._animations.has(name))
        {
            const animation: SpriteAnimation = this._animations.get(name);
            if (animation.length == 0) return;

            this._state.animation = animation;
            this._state.frameIndex = animation.startingFrame;
            this._state.loop = loop;

            const [frame, duration] = animation.frames[this._state.frameIndex];
            this._state.timer = duration;
            frame.copy(this._sprite.textureRect);

            this._isPlaying = true;
        }
    }

    public pause(): void
    {
        this._isPlaying = false;
    }

    public resume(): void 
    {
        if (this._sprite && this._state.animation)
        {
            this._isPlaying = false;
        }
    }

    public stop(): void 
    {
        this._isPlaying = false;
        this._state.frameIndex = 0;
    }
}