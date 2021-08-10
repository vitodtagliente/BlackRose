import { Context, Texture } from "..";
import { Vector3 } from "../../math";
import Command from "../command";

export default class SpriteCommand extends Command
{
    public position: Vector3 = Vector3.zero;
    public texture: Texture;

    public execute(context: Context): void
    {
        context.drawSprite(this.position, this.texture);
    }

}