export enum BufferElementType
{
    Float,
    Int,
    Boolean
}

export class BufferElement
{
    // the name of the element
    private _name: string;
    // the type
    private _type: BufferElementType;
    // num of components
    private _count: number;
    // the size of the buffer element
    private _size: number;
    // normalized
    private _normalized: boolean

    public constructor(name: string, type: BufferElementType, count: number, size: number, normalized: boolean)
    {
        this._name = name;
        this._type = type;
        this._count = count;
        this._size = size;
        this._normalized = normalized;
    }

    public get name(): string { return this._name; }
    public get type(): BufferElementType { return this._type; }
    public get count(): number { return this._count; }
    public get size(): number { return this._size; }
    public get normalized(): boolean { return this._normalized; }
}

export class BufferLayout
{
    private _elements: Array<BufferElement>;
    private _stride: number;

    public constructor(elements: Array<BufferElement> = [])
    {
        this._elements = new Array<BufferElement>();
        this._stride = 0;

        for (const element of elements)
        {
            this.push(element);
        }
    }

    public push(element: BufferElement): void 
    {
        this._elements.push(element);
        this._stride += element.size;
    }

    public clear(): void
    {
        this._elements = [];
        this._stride = 0;
    }

    public get elements(): Array<BufferElement> { return this._elements; }
    public get stride(): number { return this._stride; }
}

export enum VertexBufferUsageMode
{
    Static,
    Dynamic,
    Stream
}

export default class VertexBuffer
{

}