export default class VAO
{
    private _id: WebGLVertexArrayObject;
    private _context: WebGL2RenderingContext;

    public constructor(context: WebGL2RenderingContext)
    {
        this._context = context;
        this._id = context.createVertexArray();
    }

    public bind(): void 
    {
        this._context.bindVertexArray(this._id);
    }
}