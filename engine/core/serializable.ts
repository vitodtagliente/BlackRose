type ISerializable = new () => { readonly className: string }
const registry: Record<string, ISerializable> = {};

export default class Serializable
{
    readonly className: string;

    public constructor()
    {
        this.className = this.constructor.name;
    }

    public serialize(): string
    {
        return JSON.stringify(this.toSerializationData());
    }

    public toSerializationData(): any
    {
        return {
            className: this.className
        };
    }

    public fromSerializationData(data: any): void
    {
        Object.assign(this, data);
    }

    public static deserialize(json: string): Object
    {
        return JSON.parse(json, Serializable.reviver);
    }

    protected static reviver(k: string, v: any): any 
    {
        if ((typeof v === "object") && ("className" in v) && (v.className in registry))
        {
            const instance = new registry[v.className]() as Serializable;
            instance.fromSerializationData(v);
            return instance;
        }
        return v;
    }
}

export function serializable<T extends ISerializable>(constructor: T)
{
    const instance = new constructor();
    const className: string = instance.className;
    registry[className] = constructor;
    return constructor;
}