import Engine from "./engine";

export default abstract class Application
{
    private _engine: Engine;

    public constructor(engine: Engine)
    {
        this._engine = engine;
    }

    public get engine(): Engine { return this._engine; }

    public abstract init(): void;
    public abstract uninit(): void;
    public abstract update(deltaTime: number): void;
}