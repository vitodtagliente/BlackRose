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
}

export function serializable<T extends ISerializable>(constructor: T)
{
    const instance = new constructor();
    const className: string = instance.className;
    registry[className] = constructor;
    return constructor;
}

export class Archive
{
    private _data: any;

    public constructor(data: any = {})
    {
        this._data = data;
    }

    public get data(): any { return this._data; }

    public write(key: string, value: any | Serializable)
    {
        if (value instanceof Serializable)
        {
            this._data[key] = value.serialize();
        }
        else 
        {
            this._data[key] = value;
        }
    }

    public read(key: string): any
    {
        const value = this._data[key];
        if ((typeof value === "object")
            && ("className" in value)
            && (value.className in registry))
        {
            const instance = new registry[value.className]() as Serializable;
            instance.deserialize(value);
            return instance;
        }
        return value;
    }

    public static fromJson(json: string): Archive
    {
        const data: any = JSON.parse(json);
        return new Archive(data);
    }

    public static toJson(archive: Archive): string
    {
        return JSON.stringify(archive.data);
    }
}