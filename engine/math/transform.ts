import { Matrix4 } from ".";
import Vector3 from "./vector3";

export default class Transform
{
    public position: Vector3;
    public rotation: Vector3;
    public scale: Vector3;

    public constructor()
    {
        this.position = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
        this.scale = new Vector3(1, 1, 1);
    }

    public matrix(): Matrix4
    {
        return Matrix4.translate(this.position);
    }
}