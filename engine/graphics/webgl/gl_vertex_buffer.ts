import { BufferUsageMode } from "../buffer";
import VertexBuffer, { VertexBufferElementType } from "../vertex_buffer";

export default class GLVertexBuffer extends VertexBuffer
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
        this._context.bufferData(this._context.ARRAY_BUFFER, size * Float32Array.BYTES_PER_ELEMENT, this._drawMode);
    }

    public bind(): void 
    {
        this._context.bindBuffer(this._context.ARRAY_BUFFER, this._id);
    }

    public fillData(data: Array<number>): void 
    {
        this._context.bufferSubData(
            this._context.ARRAY_BUFFER,
            0,
            new Float32Array(data)
        );       
    }

    public fillSubData(data: Array<number>, offset: number = 0): void 
    {
        this._context.bufferSubData(
            this._context.ARRAY_BUFFER,
            offset,
            new Float32Array(data)
        );
    }

    public activateLayout(startingIndex: number = 0): void 
    {
        let elementIndex: number = startingIndex;
        let offset: number = 0;

        for (const element of this.layout.elements)
        {
            let type: GLenum;
            switch (element.type)
            {
                case VertexBufferElementType.Boolean: type = this._context.BOOL; break;
                case VertexBufferElementType.Int: type = this._context.INT; break;
                case VertexBufferElementType.Float:
                default:
                    type = this._context.FLOAT;
                    break;
            }

            this._context.enableVertexAttribArray(elementIndex);
            this._context.vertexAttribPointer(
                elementIndex,
                // num of components
                element.size,
                type,
                element.normalized,
                // move forward size * sizeof(type) each iteration to get the next position
                this.layout.stride * 4,
                // start at the beginning of the buffer
                offset * 4
            );
            if (element.perInstance)
            {
                this._context.vertexAttribDivisor(elementIndex, 1);
            }
            offset += element.size;
            ++elementIndex;
        }
    }

    public free(): void 
    {
        this._context.deleteBuffer(this._id);
    }
}