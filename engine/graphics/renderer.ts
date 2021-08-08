import { Context } from ".";

export default class Renderer
{
    private _context: Context;

    public constructor(context: Context)
    {
        this._context = context;
    }

    public get context(): Context { return this._context; }
}