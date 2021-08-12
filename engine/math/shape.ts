import Vector3 from "./vector3";

export default interface IShape
{
    contains(point: Vector3): boolean;
}