import { Component } from '.';
import { serializable, Serializable } from '../core';
import { Renderer } from '../graphics';
import *  as Math from '../math';
import World from './world';

@serializable
export default class Entity extends Serializable
{
    private _id: string;
    public name: string;
    public tag: string;
    public transform: Math.Transform;
    private _components: Array<Component>;
    private _parent: Entity;
    private _children: Array<Entity>;

    public constructor()
    {
        super();
        this._id = this.className + global.Math.random().toString(36).substr(2, 9);
        this.name = this.id;
        this.transform = new Math.Transform;
        this._components = new Array<Component>();
        this._children = new Array<Entity>();
    }

    public get id(): string { return this._id; }
    public get parent(): Entity { return this._parent; }
    public get children(): Array<Entity> { return this._children; }

    public prepareSpawn(world: World): void 
    {

    }

    public prepareDestroy(): void 
    {
        for (const component of this._components)
        {
            component.unint();
        }
        delete this._components;
        this._components = [];
    }

    public setParent(entity: Entity): void
    {
        this._parent = entity;
    }

    public update(world: World, deltaTime: number): void 
    {
        for (const component of this._components)
        {
            if (!component.enabled) continue;
            component.update(world, deltaTime);
        }

        // recompute the transform matrix
        this.transform.compute();
    }

    public render(renderer: Renderer): void 
    {
        for (const component of this._components)
        {
            if (!component.enabled) continue;
            component.render(renderer);
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

    public copy(entity: Entity): void 
    {

    }
}