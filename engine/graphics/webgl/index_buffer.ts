export default class IndexBuffer
{
    private _id: WebGLBuffer;
    private _context: WebGL2RenderingContext;
    private _length: number;

    public constructor(context: WebGL2RenderingContext)
    {
        this._context = context;
        this._length = 0;

        this._id = context.createBuffer();
    }

    public get length(): number { return this._length; }

    public bind(): void 
    {
        this._context.bindBuffer(this._context.ELEMENT_ARRAY_BUFFER, this._id);
    }

    public update(data: Array<number>): void 
    {
        this.bind();
        this._context.bufferData(
            this._context.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(data),
            this._context.STATIC_DRAW
        );
        this._length = data.length;
    }

    public free(): void 
    {
        this._context.deleteBuffer(this._id);
    }
}