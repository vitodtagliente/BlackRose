import { World } from ".";

class ISystem
{
    readonly className: string;

    public static find<T extends ISystem>(constructor: { new(...args: any[]): T }): T 
    {
        const instance = new constructor();
        const className: string = instance.className;
        return registry.get(className) as T;
    }
}

const registry: Map<string, ISystem> = new Map<string, ISystem>();

class C
{
    
}

export default class System<T extends C>
{
    public readonly className: string;
    public isEnabled: boolean;

    public constructor()
    {
        this.className = this.constructor.name;
        this.isEnabled = true;
    }

    public startup(): boolean { return true; }
    public shutdown(): void { }

    public update(world: World, deltaTime: number): void 
    {

    }
}

export function system<T extends ISystem>(constructor: { new(...args: any[]): T })
{
    const instance = new constructor();
    const className: string = instance.className;
    console.log(`registering system ${className}`);
    registry.set(className, instance);
    return constructor;
}