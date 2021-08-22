import Context from "../context";
import Command from "../command";
import Texture from "../texture";
import TextureRect from "../texture_rect";
import { Transform } from "../../math";

export default class SpriteCommand extends Command
{
    private _texture: Texture;
    private _data: Array<[Transform, TextureRect]>;

    public constructor(texture: Texture, data: Array<[Transform, TextureRect]>)
    {
        super();
        this._texture = texture;
        this._data = data.slice();
    }

    public execute(context: Context): void
    {
        context.drawSprites(this._texture, this._data);
    }
}