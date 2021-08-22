import Matrix4 from "./matrix4";
import Vector3 from "./vector3";

export default class Transform
{
    public position: Vector3;
    public rotation: Vector3;
    public scale: Vector3;
    private _matrix: Matrix4;

    public constructor()
    {
        this.position = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
        this.scale = new Vector3(1, 1, 1);

        this._matrix = Matrix4.identity();
    }

    public compute(): void
    {
        this._matrix = Matrix4.multiplyMatrices([
            Matrix4.scale(this.scale),
            Matrix4.rotateZ(this.rotation.z),
            Matrix4.translate(this.position)
        ]);
    }

    public get matrix(): Matrix4
    {
        return this._matrix;
    }
}