import { Entity } from ".";
import { Transform } from "../math";

export default class World
{
    public name: string;
    private _entities: Array<Entity>;

    public constructor(name?: string)
    {
        this.name = name;
        this._entities = new Array<Entity>();
    }

    public get entities(): Array<Entity> { return this._entities; }

    public spawn<T extends Entity>(entity: T, transform: Transform): T
    {
        entity.transform = transform;
        this._entities.push(entity);

        return entity;
    }

    public destroy(entity: Entity): boolean
    {
        const index: number = this._entities.findIndex(e => e == entity);
        if (index >= 0 && index < this._entities.length)
        {
            this._entities.splice(index, 1);
        }
        return false;
    }
}