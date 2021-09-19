import { Component } from '.';
import { Renderer } from '../graphics';
import *  as Math from '../math';
import World from './world';

class TransformState
{
    private _position: Math.Vector3;
    private _rotation: Math.Vector3;
    private _scale: Math.Vector3;

    public constructor()
    {
        this._position = Math.Vector3.zero();
        this._rotation = Math.Vector3.zero();
        this._scale = Math.Vector3.one();
    }

    public update(transform: Math.Transform): boolean 
    {
        const isChanged: boolean = !this._position.equals(transform.position)
            || !this._rotation.equals(transform.rotation)
            || !this._scale.equals(transform.scale);

        transform.position.copy(this._position);
        transform.rotation.copy(this._rotation);
        transform.scale.copy(this._scale);

        return isChanged;
    }
}

export default class Entity
{
    private _id: string;
    public name: string;
    public tag: string;
    public transform: Math.Transform;
    private _transformState: TransformState;
    private _components: Array<Component>;
    private _parent: Entity;
    private _children: Array<Entity>;
    private _isStatic: boolean;

    public constructor(name?: string)
    {
        this._id = name + global.Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.transform = new Math.Transform;
        this._transformState = new TransformState;
        this._components = new Array<Component>();
        this._children = new Array<Entity>();

        this._isStatic = false;
    }

    public get id(): string { return this._id; }
    public get parent(): Entity { return this._parent; }
    public get children(): Array<Entity> { return this._children; }
    public get isStatic(): boolean { return this._isStatic; }
    public set isStatic(value: boolean)
    {
        if (value && !this._isStatic)
        {
            this._isStatic = value;
            this.transform.compute();
        }
    }

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
        if (!this.isStatic && this._transformState.update(this.transform))
        {
            this.transform.compute();
        }
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

    public stringify(): string
    {
        return JSON.stringify(this, [
            'id', 'name', 'tag', 'transform', 'parent', 'children', 'isStatic'
        ]);
    }
}