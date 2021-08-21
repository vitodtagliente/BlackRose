import GLContext from "./gl_context";
import { BufferUsageMode } from "../buffer";
import RenderData from "./render_data";
import { Quad } from "../geometries";
import GLVertexBuffer from "./gl_vertex_buffer";
import { VertexBufferElement, VertexBufferElementType } from "..";


export default class SpriteBatchRenderData extends RenderData
{
    public readonly quad: Quad = new Quad;

    private _transformBuffer: GLVertexBuffer;
    private _cropBuffer: GLVertexBuffer;
    private _size: number;

    public constructor(context: GLContext, size: number)
    {
        super(
            context,
            size * 5, BufferUsageMode.Stream,
            size * 6, BufferUsageMode.Stream
        );
        this._size = size;

        const instanced: boolean = true;

        this.vertexBuffer.layout.push(new VertexBufferElement("position", VertexBufferElementType.Float, 3));
        this.vertexBuffer.layout.push(new VertexBufferElement("texcoords", VertexBufferElementType.Float, 2));
        this.vertexBuffer.activateLayout(0);

        this._cropBuffer = context.createVertexBuffer(size * 2, BufferUsageMode.Stream);
        this._cropBuffer.layout.push(new VertexBufferElement("crop", VertexBufferElementType.Float, 4, true, instanced));
        this._cropBuffer.activateLayout(2);

        this._transformBuffer = context.createVertexBuffer(size * 16, BufferUsageMode.Stream);
        this._transformBuffer.layout.push(new VertexBufferElement("transform", VertexBufferElementType.Float, 4, true, instanced));
        this._transformBuffer.layout.push(new VertexBufferElement("transform", VertexBufferElementType.Float, 4, true, instanced));
        this._transformBuffer.layout.push(new VertexBufferElement("transform", VertexBufferElementType.Float, 4, true, instanced));
        this._transformBuffer.layout.push(new VertexBufferElement("transform", VertexBufferElementType.Float, 4, true, instanced));
        this._transformBuffer.activateLayout(3);
    }

    public get size(): number { return this._size; }
    public get transformBuffer(): GLVertexBuffer { return this._transformBuffer; }
    public get cropBuffer(): GLVertexBuffer { return this._cropBuffer; }
}