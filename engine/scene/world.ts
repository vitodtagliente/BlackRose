import { Entity } from ".";

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
}