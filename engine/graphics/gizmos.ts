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

    public rect(position: Vector3, width: number, height: number, color: Color): void 
    {
        this._batch.add(position.add(new Vector3(width, height, 0)), color);
        this._batch.add(position.add(new Vector3(-width, height, 0)), color);

        this._batch.add(position.add(new Vector3(-width, height, 0)), color);
        this._batch.add(position.add(new Vector3(-width, -height, 0)), color);

        this._batch.add(position.add(new Vector3(-width, -height, 0)), color);
        this._batch.add(position.add(new Vector3(width, -height, 0)), color);

        this._batch.add(position.add(new Vector3(width, -height, 0)), color);
        this._batch.add(position.add(new Vector3(width, height, 0)), color);
    }

    public circle(position: Vector3, radius: number, color: Color): void 
    {
        const accuracy: number = 20 * radius;
        const step: number = (2 * Math.PI) / accuracy;
        let angle: number = 0;
        for (let i: number = 0; i < accuracy; i++)
        {
            this.line(
                position.add(new Vector3(radius * Math.sin(angle), radius * Math.cos(angle), 0)),
                position.add(new Vector3(radius * Math.sin(angle + step), radius * Math.cos(angle + step), 0)),
                color
            );
            angle += step;
        }
    }

    public clear(): void 
    {
        this._batch.clear();
    }
}