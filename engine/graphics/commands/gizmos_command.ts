import Context from "../context";
import Command from "../command";
import { Vector3 } from "../../math";
import { Color } from "..";

export default class GizmosCommand extends Command
{
    private _data: Array<[Vector3, Color]>;

    public constructor(data: Array<[Vector3, Color]>)
    {
        super();
        this._data = data.slice();
    }

    public execute(context: Context): void
    {
        // context.drawSprites(this._texture, this._data);
    }
}