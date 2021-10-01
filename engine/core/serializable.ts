type ISerializable = new () => { readonly className: string }
const registry: Record<string, ISerializable> = {};

export default class Serializable
{
    readonly className: string;

    public constructor()
    {
        this.className = this.constructor.name;
    }

    public serialize(): any
    {
        return {
            className: this.className
        };
    }

    public deserialize(data: any): void
    {

    }

    public static stringify(data: Serializable): string
    {
        return JSON.stringify(data.serialize());
    }

    public static fromString(str: string): Serializable
    {
        const data: any = JSON.parse(str);
        if ((typeof data === "object")
            && ("className" in data)
            && (data.className in registry))
        {
            const instance = new registry[data.className]() as Serializable;
            instance.deserialize(data);
            return instance;
        }
        return null;
    }
}

export function serializable<T extends ISerializable>(constructor: T)
{
    const instance = new constructor();
    const className: string = instance.className;
    registry[className] = constructor;
    return constructor;
}