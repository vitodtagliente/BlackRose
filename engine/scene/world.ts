import { Entity } from ".";
import { Transform, Vector3 } from "../math";
import Quaternion from "../math/quaternion";

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

    public update(deltaTime: number): void 
    {
        for (const entity of this._entities)
        {
            entity.update(deltaTime);
        }
    }

    public spawn<T extends Entity>(entity: T, position: Vector3, rotation: Quaternion): T
    {
        position.copy(entity.transform.position);
        entity.transform.rotation.set(rotation.x, rotation.y, rotation.z);
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

    public findEntity<T extends Entity>(constr: { new(...args: any[]): T }): T 
    {
        return this._entities.find(entity => entity instanceof constr) as T;
    }

    public findEntities<T extends Entity>(constr: { new(...args: any[]): T }): Array<T> 
    {
        let result: Array<T> = new Array<T>();
        for (const entity of this._entities)
        {
            if (entity instanceof constr)
            {
                result.push(entity as T);
            }
        }
        return result;
    }
}