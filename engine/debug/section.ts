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
        this._context.add(vector, 'x').name(`${name}-x`);
        this._context.add(vector, 'y').name(`${name}-y`);
        this._context.add(vector, 'z').name(`${name}-z`);
    }

    public color(name: string, color: Color): void 
    {
        this._context.addColor(color, 'rgba').name(name);
    }
}