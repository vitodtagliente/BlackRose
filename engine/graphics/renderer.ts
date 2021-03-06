import Color from "./color";
import Command from "./command";
import Context from "./context";
import Gizmos from "./gizmos";
import SpriteBatch from "./sprite_batch";
import Texture from "./texture";
import TextureLibrary from "./texture_library";
import TextureRect from "./texture_rect";
import { Transform } from "../math";

export default class Renderer
{
    private _context: Context;
    private _commands: Array<Command>;
    private _gizmos: Gizmos;
    private _spriteBatch: SpriteBatch;
    private _textureLibrary: TextureLibrary;

    public background: Color = Color.white();

    public constructor(context: Context)
    {
        this._context = context;
        this._commands = new Array<Command>();
        this._gizmos = new Gizmos();
        this._spriteBatch = new SpriteBatch(2000);
        this._textureLibrary = new TextureLibrary(context);
    }

    public get context(): Context { return this._context; }
    public get gizmos(): Gizmos { return this._gizmos; }
    public get textureLibrary(): TextureLibrary { return this._textureLibrary; }

    public begin(): void 
    {
        // double buffering
        this.context.clear(this.background);
        this._spriteBatch.clear();
        this.gizmos.clear();
    }

    public flush(): void 
    {
        this._commands.push(...this._spriteBatch.commands());
        this._commands.push(...this._gizmos.commands());
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