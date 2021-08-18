import { Color, TextureCoords } from ".";
import { Vector3 } from "../math";

export default class VertexData
{
    public position: Vector3;
    public uv: TextureCoords;
    public color: Color;

    public constructor(position: Vector3 = Vector3.zero, uv: TextureCoords = TextureCoords.zero, color: Color = Color.black)
    {
        this.position = new Vector3(position.x, position.y, position.z);
        this.uv = new TextureCoords(uv.u, uv.v);
        this.color = new Color(color.r, color.g, color.b, color.a);
    }
}