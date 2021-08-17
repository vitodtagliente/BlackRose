import Geometry from "../geometry";
import VertexData from "../vertex_data";

export default class Quad extends Geometry
{
    public constructor()
    {
        super(
            [
                new VertexData(),
                new VertexData(),
                new VertexData(),
                new VertexData()
            ],
            [0, 1, 3, 1, 2, 3]
        );
    }
}