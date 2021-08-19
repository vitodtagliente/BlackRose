import IndexBuffer from "../index_buffer";

export default class GLIndexBuffer extends IndexBuffer
{
    private _id: WebGLBuffer;
    private _context: WebGL2RenderingContext;

    public constructor(context: WebGL2RenderingContext)
    {
        super();
        this._context = context;

        this._id = context.createBuffer();
    }

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