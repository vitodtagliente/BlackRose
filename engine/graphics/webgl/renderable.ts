import { IndexBuffer, VertexBuffer } from ".";

export default class Renderable
{
    private _id: WebGLVertexArrayObject;
    private _context: WebGL2RenderingContext;
    private _vertexBuffer: VertexBuffer;
    private _indexBuffer: IndexBuffer;

    public constructor(context: WebGL2RenderingContext, vertexBuffer: VertexBuffer, indexBuffer?: IndexBuffer)
    {
        this._context = context;
        this._vertexBuffer = vertexBuffer;
        this._indexBuffer = indexBuffer;

        this._id = context.createVertexArray();
        this.update();
    }

    public bind(): void 
    {
        this._context.bindVertexArray(this._id);
    }

    public update(): void 
    {
        this.bind();
        this._vertexBuffer.bind();
        if (this._indexBuffer)
            this._indexBuffer.bind();
    }
}