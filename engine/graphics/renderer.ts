import Color from "./color";
import Command from "./command";
import Context from "./context";
import SpriteBatch from "./sprite_batch";
import Texture from "./texture";
import TextureRect from "./texture_rect";
import { Transform } from "../math";

export default class Renderer
{
    private _context: Context;
    private _commands: Array<Command>;
    private _spriteBatch: SpriteBatch;

    public background: Color = Color.white();

    public constructor(context: Context)
    {
        this._context = context;
        this._commands = new Array<Command>();
        this._spriteBatch = new SpriteBatch(1000);
    }

    public get context(): Context { return this._context; }

    public begin(): void 
    {
        // double buffering
        this.context.clear(this.background);
        this._spriteBatch.clear();
    }

    public flush(): void 
    {
        this._commands.push(...this._spriteBatch.commands());

        this._commands.reverse();
        while (this._commands.length > 0)
        {
            const command: Command = this._commands.pop();
            command.execute(this._context);
        }
    }

    public drawSprite(texture: Texture, transform: Transform, rect: TextureRect): void 
    {
        this._spriteBatch.add(texture, transform, rect);
    }
}