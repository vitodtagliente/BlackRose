import { Color, Context } from ".";
import Command from "./command";
import ClearCommand from "./commands/clear_command";

export default class Renderer
{
    private _context: Context;
    private _commands: Array<Command>;

    public constructor(context: Context)
    {
        this._context = context;
        this._commands = new Array<Command>();
    }

    public get context(): Context { return this._context; }

    public begin(): void 
    {

    }

    public flush(): void 
    {
        while (this._commands.length > 0)
        {
            const command: Command = this._commands.pop();
            command.execute(this._context);
        }
    }

    public clear(color: Color): void
    {
        const command: ClearCommand = new ClearCommand;
        command.color = color;
        this._commands.push(command);
    }
}