import Entity from "./entity";
import { Vector3, Quaternion } from "../math";
import { Serializable, serializable, Signal } from "../core";
import { Renderer } from "../graphics";

@serializable
export default class World extends Serializable
{
    public name: string;
    private _entities: Array<Entity>;

    public onEntitySpawn: Signal<Entity>;
    public onEntityDestroy: Signal<Entity>;

    public constructor(name?: string)
    {
        super();
        this.name = name;
        this._entities = new Array<Entity>();

        this.onEntitySpawn = new Signal<Entity>();
        this.onEntityDestroy = new Signal<Entity>();
    }

    public get entities(): Array<Entity> { return this._entities; }

    public update(deltaTime: number): void 
    {
        for (const entity of this._entities)
        {
            entity.update(this, deltaTime);
        }
    }

    public render(renderer: Renderer): void 
    {
        for (const entity of this._entities)
        {
            entity.render(renderer);
        }
    }

    public spawn<T extends Entity>(entity: T, position: Vector3, rotation: Quaternion): T
    {
        position.copy(entity.transform.position);
        entity.transform.rotation.set(rotation.x, rotation.y, rotation.z);
        entity.prepareSpawn(this);
        this._entities.push(entity);

        this.onEntitySpawn.emit(entity);

        return entity;
    }

    public destroy(entity: Entity): boolean
    {
        const index: number = this._entities.findIndex(e => e == entity);
        if (index >= 0 && index < this._entities.length)
        {
            this._entities[index].prepareDestroy();

            this.onEntityDestroy.emit(this._entities[index]);

            delete this._entities[index];
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

    public serialize(): any 
    {
        let data: any = super.serialize();
        data["name"] = this.name;
        data["entities"] = this.entities.map(entity => entity.serialize());
        return data;
    }

    public deserialize(data: any): void 
    {
        for (const key of Object.keys(data))
        {
            switch (key)
            {
                case "name": this.name = data[key]; break;
                case "entities":
                    {
                        for (const element of data[key])
                        {
                            const entity: Entity = Serializable.parse(element) as Entity;
                            if (entity)
                            {
                                this.spawn(entity, entity.transform.position, Quaternion.identity());
                                this._entities.push();
                            }
                        }
                        break;
                    }
            }
        }
    }
}