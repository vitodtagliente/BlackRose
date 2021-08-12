import { Device } from ".";
import { Canvas } from "../application";

export default class Pad extends Device
{
    public constructor(canvas: Canvas)
    {
        super(canvas);
    }

    public plugin(): boolean
    {
        throw new Error("Method not implemented.");
    }
}