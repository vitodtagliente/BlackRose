import { Color, TextureCoords } from ".";
import { Vector3 } from "../math";

export default class VertexData
{
    public position: Vector3;
    public uv: TextureCoords;
    public color: Color;

    public constructor(position: Vector3 = Vector3.zero, uv: TextureCoords = TextureCoords.zero, color: Color = Color.black)
    {
        position.copy(this.position);
        uv.copy(this.uv);
        color.copy(this.color);
    }
}