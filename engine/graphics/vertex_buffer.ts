export enum VertexBufferElementType
{
    Float,
    Int,
    Boolean
}

export class VertexBufferElement
{
    // the name of the element
    private _name: string;
    // the type
    private _type: VertexBufferElementType;
    // num of components
    private _size: number;
    // normalized
    private _normalized: boolean

    public constructor(name: string, type: VertexBufferElementType, size: number, normalized: boolean)
    {
        this._name = name;
        this._type = type;
        this._size = size;
        this._normalized = normalized;
    }

    public get name(): string { return this._name; }
    public get type(): VertexBufferElementType { return this._type; }
    public get size(): number { return this._size; }
    public get normalized(): boolean { return this._normalized; }
}

export class VertexBufferLayout
{
    private _elements: Array<VertexBufferElement>;
    private _stride: number;

    public constructor(elements: Array<VertexBufferElement> = [])
    {
        this._elements = new Array<VertexBufferElement>();
        this._stride = 0;

        for (const element of elements)
        {
            this.push(element);
        }
    }

    public push(element: VertexBufferElement): void 
    {
        this._elements.push(element);
        this._stride += element.size;
    }

    public clear(): void
    {
        this._elements = [];
        this._stride = 0;
    }

    public get elements(): Array<VertexBufferElement> { return this._elements; }
    public get stride(): number { return this._stride; }
}

export enum VertexBufferUsageMode
{
    Static,
    Dynamic,
    Stream
}

export default abstract class VertexBuffer
{
    private _usageMode: VertexBufferUsageMode;
    protected _length: number;
    public layout: VertexBufferLayout;

    public constructor(usageMode: VertexBufferUsageMode = VertexBufferUsageMode.Static)
    {
        this._usageMode = usageMode;
        this._length = 0;
        this.layout = new VertexBufferLayout();
    }

    public abstract bind(): void;
    public abstract update(data: Array<number>): void;
    public abstract updateLayout(): void;
    public abstract free(): void;

    public get usageMode(): VertexBufferUsageMode { return this._usageMode; }
    public get length(): number { return this._length; }
}