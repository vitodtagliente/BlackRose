import * as BlackRose from "blackrose";

export default class Path 
{
    private _name: string;
    private _points: Array<BlackRose.Math.Vector3>;

    public constructor(name: string)
    {
        this._name = name;
        this._points = [];
    }

    public get name(): string { return this._name; }
    public get points(): Array<BlackRose.Math.Vector3> { return this._points; }

    public static findOrRandom(name: string): Path 
    {
        return null;
    }
}