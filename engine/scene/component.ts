import { Entity } from ".";
import { Application } from "../application";
import { Transform } from "../math";

export default abstract class Component
{
    private _app: Application;
    private _owner: Entity;

    public enabled: boolean = true;

    public constructor(app: Application)
    {
        this._app = app;
    }

    public get app(): Application { return this._app; }
    public get owner(): Entity { return this._owner; }
    public get isAttached(): boolean { return this._owner != null; }
    public get transform(): Transform { return this.owner.transform; }

    public attach(entity: Entity): void 
    {
        this._owner = entity;
        this.init();
    }

    public detach(): void 
    {
        this._owner = null;
        this.unint();
    }

    public init(): void { }
    public unint(): void { }
    public update(deltaTime: number): void { }
}