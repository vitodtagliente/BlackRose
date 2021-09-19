
export default class Timer
{
    private _timer: number;
    private _time: number;

    public constructor(time: number)
    {
        this._time = time;
        this._timer = time;
    }

    public get isExpired(): boolean { return this._timer <= 0; }

    public tick(deltaTime: number): void 
    {
        if (this._timer > 0)
        {
            this._timer -= deltaTime;
        }
    }

    public reset(): void 
    {
        this._timer = this._time;
    }
}