import { BufferUsageMode } from "../buffer";
import GLContext from "./gl_context";
import GLIndexBuffer from "./gl_index_buffer";
import GLVertexArrayObject from "./gl_vertext_array_object";
import GLVertexBuffer from "./gl_vertex_buffer";

export default class RenderData 
{
    private _vao: GLVertexArrayObject;
    private _vertexBuffer: GLVertexBuffer;
    private _indexBuffer: GLIndexBuffer;

    public constructor(context: GLContext,
        vSize: number, vMode: BufferUsageMode,
        iSize: number, iMode: BufferUsageMode
    )
    {
        this._vao = new GLVertexArrayObject(context.context);
        this._vao.bind();

        this._vertexBuffer = context.createVertexBuffer(vSize, vMode);
        this._indexBuffer = context.createIndexBuffer(iSize, iMode);
    }

    public get vertexBuffer(): GLVertexBuffer { return this._vertexBuffer; }
    public get indexBuffer(): GLIndexBuffer { return this._indexBuffer; }

    public bind(): void 
    {
        this._vao.bind();
    }

    public free(): void 
    {
        this._vao.free();
        this._vertexBuffer.free();
        this._indexBuffer.free();
    }
}