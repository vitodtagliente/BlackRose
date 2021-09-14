import * as BlackRose from "blackrose";
import Path from "./path";

export default class PathNavigator
{
    private _path: Path;
    private _stepIndex: number;
    private _reachMargin: number;

    public constructor(reachMargin: number = 0.25)
    {
        this._stepIndex = 0;
        this._reachMargin = reachMargin;
    }

    public get isCompleted(): boolean
    {
        if (this._path)
        {
            return this._stepIndex < this._path.steps.length;
        }
        return false;
    }

    public follow(path: Path): void 
    {
        this._path = path;
        this._stepIndex = 0;
    }

    public next(position: BlackRose.Math.Vector3): BlackRose.Math.Vector3
    {
        if (this._path == null || this.isCompleted)
            return null;

        let step: BlackRose.Math.Vector3 = this._path.steps[this._stepIndex];
        if (position.distance(step) < this._reachMargin)
        {
            this._stepIndex++;
            if (this.isCompleted) return null;
        }

        return this._path.steps[this._stepIndex];
    }
}