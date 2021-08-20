import { IndexBufferUsageMode } from "..";
import IndexBuffer from "../index_buffer";

export default class GLIndexBuffer extends IndexBuffer
{
    private _id: WebGLBuffer;
    private _context: WebGL2RenderingContext;
    private _drawMode: GLenum;

    public constructor(context: WebGL2RenderingContext, usageMode: IndexBufferUsageMode)
    {
        super(usageMode);
        this._context = context;

        switch (this.usageMode)
        {
            case IndexBufferUsageMode.Dynamic: this._drawMode = this._context.DYNAMIC_DRAW; break;
            case IndexBufferUsageMode.Stream: this._drawMode = this._context.STREAM_DRAW; break;
            case IndexBufferUsageMode.Static:
            default:
                this._drawMode = this._context.STATIC_DRAW;
                break;
        }

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
            this._drawMode
        );
        this._length = data.length;
    }

    public free(): void 
    {
        this._context.deleteBuffer(this._id);
    }
}