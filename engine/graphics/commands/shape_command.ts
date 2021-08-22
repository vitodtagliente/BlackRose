import { Color, Context } from "..";
import { Vector2, Vector3 } from "../../math";
import Command from "../command";

export enum ShapeType
{
    Circle,
    Rectangle
}

export default class ShapeCommand extends Command
{
    public shape: ShapeType = ShapeType.Circle;
    public position: Vector3 = Vector3.zero();
    public color: Color = Color.black;
    public size: Vector2 = Vector2.zero();

    public execute(context: Context): void
    {
        switch (this.shape)
        {
            case ShapeType.Circle:
                context.drawCircle(this.position, this.size.x, this.color);
                break;
            default: break;
        }
    }
}