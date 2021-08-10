import { Color, Context, Texture } from ".";
import { Vector3 } from "../math";
import Command from "./command";
import ClearCommand from "./commands/clear_command";
import ShapeCommand, { ShapeType } from "./commands/shape_command";
import SpriteCommand from "./commands/sprite_command";

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

    public drawSprite(position: Vector3, texture: Texture): void 
    {
        const command: SpriteCommand = new SpriteCommand;
        command.position = position;
        command.texture = texture;
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
}