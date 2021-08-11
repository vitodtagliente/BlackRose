import * as dat from 'dat.gui';
import { Color } from '../graphics';
import { Vector3 } from '../math';

export default class Section
{
    private _context: dat.GUI;

    public constructor(context: dat.GUI)
    {
        this._context = context;
    }

    public num(name: string, value: number): void 
    {
        this._context.add(value, name);
    }

    public vector3(name: string, vector: Vector3): void 
    {
        this._context.add(vector, 'x');
        this._context.add(vector, 'y');
        this._context.add(vector, 'z');
    }

    public color(name: string, color: Color): void 
    {
        this._context.add(color, 'r', 0, 1, 0.1);
        this._context.add(color, 'g', 0, 1, 0.1);
        this._context.add(color, 'b', 0, 1, 0.1);
        this._context.add(color, 'a', 0, 1, 0.1);
    }
}