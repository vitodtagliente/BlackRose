import { TextureCoords } from "..";
import { Vector3 } from "../../math";
import Geometry from "../geometry";
import VertexData from "../vertex_data";

export default class Quad extends Geometry
{
    public constructor()
    {
        super(
            [
                // top right
                new VertexData(new Vector3(1, 1, 0), TextureCoords.one()),
                // bottom right
                new VertexData(new Vector3(1, -1, 0), new TextureCoords(1, 0)),
                // bottom left
                new VertexData(new Vector3(-1, -1, 0), TextureCoords.zero()),
                // top left
                new VertexData(new Vector3(-1, 1, 0), new TextureCoords(0, 1)),
            ],
            [0, 1, 3, 1, 2, 3]
        );
    }
}