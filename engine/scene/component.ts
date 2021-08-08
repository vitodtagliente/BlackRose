import { Entity } from ".";

export default abstract class Component
{
    private _owner: Entity;

    public constructor()
    {

    }

    public get owner(): Entity { return this._owner; }
    public get isAttached(): boolean { return this._owner != null; }

    public attach(entity: Entity): void 
    {
        this._owner = entity;
        this._init();
    }

    public detach(): void 
    {
        this._owner = null;
        this._unint();
    }

    protected abstract _init(): void;
    protected abstract _unint(): void;
    public abstract update(deltaTime: number): void;
}