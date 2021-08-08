import { Component, World } from '.';
import *  as Math from '../math';

export default class Entity
{
    public name: string;
    public tag: string;
    public transform: Math.Transform;
    private _world: World;
    private _components: Array<Component>;

    public constructor(name?: string)
    {
        this.name = name;
        this.transform = new Math.Transform;
        this._components = new Array<Component>();
    }

    public get world(): World { return this._world; }

    public spawn(world: World): void 
    {
        this._world = world;
    }

    public update(deltaTime: number): void 
    {
        for (const component of this._components)
        {
            component.update(deltaTime);
        }
    }

    public addComponent<T extends Component>(component: T): T
    {
        // assert(component.isAttached == false);
        this._components.push(component);
        component.attach(this);
        return component;
    }

    public findComponent<T extends Component>(constr: { new(...args: any[]): T }): T 
    {
        return this._components.find(component => component instanceof constr) as T;
    }

    public findComponents<T extends Component>(constr: { new(...args: any[]): T }): Array<T> 
    {
        let result: Array<T> = new Array<T>();
        for (const component of this._components)
        {
            if (component instanceof constr)
            {
                result.push(component as T);
            }
        }
        return result;
    }

    public removeComponent<T extends Component>(constr: { new(...args: any[]): T }): void
    {
        let result: Array<Component> = new Array<Component>();
        for (const component of this._components)
        {
            if (component instanceof constr)
            {
                component.detach();
            }
            else 
            {
                result.push(component);
            }
        }
        this._components = result;
    }
}