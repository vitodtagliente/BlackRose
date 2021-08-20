import { BufferUsageMode } from "../buffer";
import IndexBuffer from "../index_buffer";

export default class GLIndexBuffer extends IndexBuffer
{
    private _id: WebGLBuffer;
    private _context: WebGL2RenderingContext;
    private _drawMode: GLenum;

    public constructor(context: WebGL2RenderingContext, size: number, mode: BufferUsageMode)
    {
        super(size, mode);
        this._context = context;

        switch (this.mode)
        {
            case BufferUsageMode.Dynamic: this._drawMode = this._context.DYNAMIC_DRAW; break;
            case BufferUsageMode.Stream: this._drawMode = this._context.STREAM_DRAW; break;
            case BufferUsageMode.Static:
            default:
                this._drawMode = this._context.STATIC_DRAW;
                break;
        }

        this._id = context.createBuffer();
        this.bind();
        this._context.bufferData(this._context.ELEMENT_ARRAY_BUFFER, size * Uint16Array.BYTES_PER_ELEMENT, this._drawMode);
    }

    public bind(): void 
    {
        this._context.bindBuffer(this._context.ELEMENT_ARRAY_BUFFER, this._id);
    }

    public fillData(data: Array<number>): void 
    {
        this._context.bufferSubData(
            this._context.ELEMENT_ARRAY_BUFFER,
            0,
            new Uint16Array(data)
        );
    }

    public fillSubData(data: Array<number>, offset: number = 0): void 
    {
        this._context.bufferSubData(
            this._context.ELEMENT_ARRAY_BUFFER,
            offset,
            new Uint16Array(data)
        );
    }

    public free(): void 
    {
        this._context.deleteBuffer(this._id);
    }
}