import VertexData from "./vertex_data";

export default class Geometry
{
    private _vertices: Array<VertexData>;
    private _indices: Array<number>;

    public constructor(vertices: Array<VertexData>, indices: Array<number>)
    {
        this._vertices = vertices;
        this._indices = indices;
    }

    public get vertices(): Array<VertexData> { return this._vertices; }
    public get indices(): Array<number> { return this._indices; }

    public data(): Array<number>
    {
        let data: Array<number> = [];
        for (const vertex of this._vertices)
        {
            data.push(vertex.position.x);
            data.push(vertex.position.y);
            data.push(vertex.position.z);
            data.push(vertex.uv.u);
            data.push(vertex.uv.v);
            data.push(vertex.color.r);
            data.push(vertex.color.g);
            data.push(vertex.color.b);
            data.push(vertex.color.a);
        }
        return data;
    }
}