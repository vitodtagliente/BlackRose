import { Context } from ".";

export default abstract class Command
{
    public abstract execute(context: Context): void;
}