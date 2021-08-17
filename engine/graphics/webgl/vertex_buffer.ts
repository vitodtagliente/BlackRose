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

    public activate(context: WebGL2RenderingContext): void 
    {
        let elementIndex: number = 0;
        let elementSize: number = 0;
        for (const element of this._elements)
        {
            let type: GLenum;
            switch (element.type)
            {
                case BufferElementType.Boolean: type = context.BOOL; break;
                case BufferElementType.Int: type = context.INT; break;
                case BufferElementType.Float:
                default:
                    type = context.FLOAT;
                    break;
            }

            context.vertexAttribPointer(
                elementIndex,
                element.count,
                type,
                element.normalized,
                this._stride,
                elementSize
            );
            elementSize += element.size;
            context.enableVertexAttribArray(elementIndex++);
        }
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
    private _id: WebGLBuffer;
    private _context: WebGL2RenderingContext;
    private _vertexSize: number;
    private _verticesCount: number;
    private _usageMode: VertexBufferUsageMode;
    public layout: BufferLayout;

    public constructor(context: WebGL2RenderingContext, vertexSize: number, verticesCount: number, usageMode: VertexBufferUsageMode = VertexBufferUsageMode.Static)
    {
        this._context = context;
        this._vertexSize = vertexSize;
        this._verticesCount = verticesCount;
        this._usageMode = usageMode;
        this.layout = new BufferLayout();

        this._id = context.createBuffer();
    }

    public bind(): void 
    {
        this._context.bindBuffer(this._context.ARRAY_BUFFER, this._id);
    }

    public update(data: Array<number>): void
    {
        this.bind();
        let mode: GLenum;
        switch (this._usageMode)
        {
            case VertexBufferUsageMode.Dynamic: mode = this._context.DYNAMIC_DRAW; break;
            case VertexBufferUsageMode.Stream: mode = this._context.STREAM_DRAW; break;
            case VertexBufferUsageMode.Static:
            default:
                mode = this._context.STATIC_DRAW;
                break;
        }
        this._context.bufferData(this._context.ARRAY_BUFFER, new Float32Array(data), mode);
        this.layout.activate(this._context);
    }

    public get vertexSize(): number { return this._vertexSize; }
    public get verticesCount(): number { return this._verticesCount; }
    public get usageMode(): VertexBufferUsageMode { return this._usageMode; }
}