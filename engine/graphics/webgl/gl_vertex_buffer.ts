import { off } from "process";
import VertexBuffer, { VertexBufferElementType, VertexBufferUsageMode } from "../vertex_buffer";

export default class GLVertexBuffer extends VertexBuffer
{
    private _id: WebGLBuffer;
    private _context: WebGL2RenderingContext;
    private _drawMode: GLenum;
    public startingElementIndex: number = 0;

    public constructor(context: WebGL2RenderingContext, usageMode: VertexBufferUsageMode = VertexBufferUsageMode.Static)
    {
        super(usageMode);
        this._context = context;

        switch (this.usageMode)
        {
            case VertexBufferUsageMode.Dynamic: this._drawMode = this._context.DYNAMIC_DRAW; break;
            case VertexBufferUsageMode.Stream: this._drawMode = this._context.STREAM_DRAW; break;
            case VertexBufferUsageMode.Static:
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
        this.updateLayout();
    }

    public updateLayout(): void 
    {
        let elementIndex: number = this.startingElementIndex;
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