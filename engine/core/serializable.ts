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

    public stringify(): string
    {
        return JSON.stringify(this.serialize());
    }

    public static parse(data: string | any): Serializable
    {
        if (typeof data === typeof "")
        {
            const parsedData: any = JSON.parse(data);
            if ((typeof parsedData === "object")
                && ("className" in parsedData)
                && (parsedData.className in registry))
            {
                const instance = new registry[parsedData.className]() as Serializable;
                instance.deserialize(parsedData);
                return instance;
            }
            return null;
        }
        else 
        {
            return this.parse(JSON.stringify(data));
        }
    }
}

export function serializable<T extends ISerializable>(constructor: T)
{
    const instance = new constructor();
    const className: string = instance.className;
    registry[className] = constructor;
    return constructor;
}