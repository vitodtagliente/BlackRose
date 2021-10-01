import { Entity, World } from ".";
import { Serializable } from "../core";
import { Renderer } from "../graphics";
import { Transform } from "../math";

export default abstract class Component extends Serializable
{
    private _owner: Entity;
    public enabled: boolean = true;

    public constructor()
    {
        super();
    }

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
    public update(world: World, deltaTime: number): void { }
    public render(renderer: Renderer): void { }
}