import { Color } from ".";
import { Canvas } from "../application";
import { Vector3 } from "../math";
import API from "./api";

export default abstract class Context
{
    private _canvas: Canvas;
    private _api: API;

    public constructor(canvas: Canvas, api: API)
    {
        this._canvas = canvas;
        this._api = api;
    }

    public get api(): API { return this._api; }
    public get canvas(): Canvas { return this._canvas; }

    
    public abstract clear(color: Color): void;    
    public abstract drawCircle(position: Vector3, radius: number, color: Color): void;
}