import GLContext from "./gl_context";
import { BufferUsageMode } from "../buffer";
import RenderData from "./render_data";
import { VertexBufferElement, VertexBufferElementType } from "..";

export default class GizmosBatchRenderData extends RenderData
{
    private _size: number;

    public constructor(context: GLContext, size: number)
    {
        super(
            context,
            size * 7, BufferUsageMode.Stream,
            0, BufferUsageMode.Static
        );
        this._size = size;

        this.vertexBuffer.layout.push(new VertexBufferElement("position", VertexBufferElementType.Float, 3, true));
        this.vertexBuffer.layout.push(new VertexBufferElement("color", VertexBufferElementType.Float, 4, true));
        this.vertexBuffer.activateLayout();
    }

    public get size(): number { return this._size; }
}