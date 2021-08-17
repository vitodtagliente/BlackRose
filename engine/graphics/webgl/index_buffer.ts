export default class IndexBuffer
{
    private _id: WebGLBuffer;
    private _context: WebGL2RenderingContext;
    private _size: number;

    public constructor(context: WebGL2RenderingContext, size: number)
    {
        this._context = context;
        this._size = size;

        this._id = context.createBuffer();
    }

    public get length(): number { return this._size; }

    public bind(): void 
    {
        this._context.bindBuffer(this._context.ELEMENT_ARRAY_BUFFER, this._id);
    }

    public update(data: Array<number>): void 
    {
        this._context.bufferData(
            this._context.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(data),
            this._context.STATIC_DRAW
        );
    }

    public free(): void 
    {
        this._context.deleteBuffer(this._id);
    }
}