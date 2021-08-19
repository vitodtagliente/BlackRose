export enum GLVertexBufferElementType
{
    Float,
    Int,
    Boolean
}

export class GLVertexBufferElement
{
    // the name of the element
    private _name: string;
    // the type
    private _type: GLVertexBufferElementType;
    // num of components
    private _size: number;
    // normalized
    private _normalized: boolean

    public constructor(name: string, type: GLVertexBufferElementType, size: number, normalized: boolean)
    {
        this._name = name;
        this._type = type;
        this._size = size;
        this._normalized = normalized;
    }

    public get name(): string { return this._name; }
    public get type(): GLVertexBufferElementType { return this._type; }
    public get size(): number { return this._size; }
    public get normalized(): boolean { return this._normalized; }
}

export class GLVertexBufferLayout
{
    private _elements: Array<GLVertexBufferElement>;
    private _stride: number;

    public constructor(elements: Array<GLVertexBufferElement> = [])
    {
        this._elements = new Array<GLVertexBufferElement>();
        this._stride = 0;

        for (const element of elements)
        {
            this.push(element);
        }
    }

    public push(element: GLVertexBufferElement): void 
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
        let offset: number = 0;

        for (const element of this._elements)
        {
            let type: GLenum;
            switch (element.type)
            {
                case GLVertexBufferElementType.Boolean: type = context.BOOL; break;
                case GLVertexBufferElementType.Int: type = context.INT; break;
                case GLVertexBufferElementType.Float:
                default:
                    type = context.FLOAT;
                    break;
            }

            context.enableVertexAttribArray(elementIndex);
            context.vertexAttribPointer(
                elementIndex,
                // num of components
                element.size,
                type,
                element.normalized,
                // move forward size * sizeof(type) each iteration to get the next position
                this._stride * 4,
                // start at the beginning of the buffer
                offset * 4
            );
            offset += element.size;
            ++elementIndex;
        }
    }

    public get elements(): Array<GLVertexBufferElement> { return this._elements; }
    public get stride(): number { return this._stride; }
}

export enum GLVertexBufferUsageMode
{
    Static,
    Dynamic,
    Stream
}

export default class GLVertexBuffer
{
    private _id: WebGLBuffer;
    private _context: WebGL2RenderingContext;
    private _usageMode: GLVertexBufferUsageMode;
    private _drawMode: GLenum;
    private _length: number;
    public layout: GLVertexBufferLayout;

    public constructor(context: WebGL2RenderingContext, usageMode: GLVertexBufferUsageMode = GLVertexBufferUsageMode.Static)
    {
        this._context = context;
        this._usageMode = usageMode;
        this._length = 0;
        this.layout = new GLVertexBufferLayout();

        switch (this._usageMode)
        {
            case GLVertexBufferUsageMode.Dynamic: this._drawMode = this._context.DYNAMIC_DRAW; break;
            case GLVertexBufferUsageMode.Stream: this._drawMode = this._context.STREAM_DRAW; break;
            case GLVertexBufferUsageMode.Static:
            default:
                this._drawMode = this._context.STATIC_DRAW;
                break;
        }

        this._id = context.createBuffer();
    }

    public bind(): void 
    {
        this._context.bindBuffer(this._context.ARRAY_BUFFER, this._id);
    }

    public update(data: Array<number>): void
    {
        this.bind();
        this._context.bufferData(this._context.ARRAY_BUFFER, new Float32Array(data), this._drawMode);
        this._length = data.length;
        this.layout.activate(this._context);
    }

    public free(): void 
    {
        this._context.deleteBuffer(this._id);
    }

    public get usageMode(): GLVertexBufferUsageMode { return this._usageMode; }
    public get length(): number { return this._length; }
}