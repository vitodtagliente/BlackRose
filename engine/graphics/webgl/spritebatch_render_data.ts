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
            20, BufferUsageMode.Static,
            6, BufferUsageMode.Static
        );
        this._size = size;

        this.quad.layout(this.vertexBuffer.layout);
        this.vertexBuffer.fillData(this.quad.data);
        this.vertexBuffer.activateLayout();

        this.indexBuffer.fillData(this.quad.indices);

        const instanced: boolean = true;

        this._cropBuffer = context.createVertexBuffer(size * 4, BufferUsageMode.Stream);
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