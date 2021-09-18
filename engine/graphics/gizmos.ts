import { Vector3 } from "../math";
import Color from "./color";
import Command from "./command";
import GizmosBatch from "./gizmos_batch";

export default class Gizmos 
{
    private _batch: GizmosBatch;

    public constructor()
    {
        this._batch = new GizmosBatch(2000);
    }

    public commands(): Array<Command>
    {
        return this._batch.commands();
    }

    public line(a: Vector3, b: Vector3, color: Color): void 
    {
        this._batch.add(a, color);
        this._batch.add(b, color);
    }
}