import { Color, Context } from "..";
import Command from "../command";

export default class ClearCommand extends Command
{
    public color: Color = Color.black;

    public execute(context: Context): void
    {
        context.clear(this.color);
    }

}