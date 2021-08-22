import { Color, Context, Texture } from ".";
import { Vector2, Vector3 } from "../math";
import Command from "./command";
import ClearCommand from "./commands/clear_command";
import ShapeCommand, { ShapeType } from "./commands/shape_command";
import TextureCommand from "./commands/texture_command";

export default class Renderer
{
    private _context: Context;
    private _commands: Array<Command>;
    public clearColor: Color = Color.white;

    public constructor(context: Context)
    {
        this._context = context;
        this._commands = new Array<Command>();
    }

    public get context(): Context { return this._context; }

    public begin(): void 
    {
        // double buffering
        this.context.clear(this.clearColor);
    }

    public flush(): void 
    {
        this._commands.reverse();
        while (this._commands.length > 0)
        {
            const command: Command = this._commands.pop();
            command.execute(this._context);
        }
    }

    public drawTexture(position: Vector3, texture: Texture): void 
    {
        const command: TextureCommand = new TextureCommand;
        command.position = position;
        command.texture = texture;
        command.origin = Vector2.zero();
        command.end = Vector2.one();
        this._commands.push(command);
    }

    public drawSubTexture(position: Vector3, texture: Texture, origin: Vector2, end: Vector2): void 
    {
        const command: TextureCommand = new TextureCommand;
        command.position = position;
        command.texture = texture;
        command.origin = origin;
        command.end = end;
        this._commands.push(command);
    }

    public drawCircle(position: Vector3, radius: number, color: Color): void
    {
        const command: ShapeCommand = new ShapeCommand;
        command.shape = ShapeType.Circle;
        command.position = position;
        command.size.x = radius;
        command.color = color;
        this._commands.push(command);
    }

    public clear(color: Color): void
    {
        const command: ClearCommand = new ClearCommand;
        command.color = color;
        this._commands.push(command);
    }

    public test(): void 
    {
        this._context.test();
    }
}