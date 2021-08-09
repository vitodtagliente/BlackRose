import { Context } from "..";
import Command from "../command";

export default class SpriteCommand extends Command
{
    public execute(context: Context): void
    {
        throw new Error("Method not implemented.");
    }

}