import { Context, Texture } from "..";
import { Vector2, Vector3 } from "../../math";
import Command from "../command";

export default class TextureCommand extends Command
{
    public position: Vector3 = Vector3.zero;
    public texture: Texture;
    public origin: Vector2;
    public end: Vector2;

    public execute(context: Context): void
    {
        /*
        if (this.origin != Vector2.zero
            || this.end != Vector2.one)
        {
            context.drawSubTexture(this.position, this.texture, this.origin, this.end);
        }
        else 
        {
            context.drawTexture(this.position, this.texture);
        }
        */
    }

}