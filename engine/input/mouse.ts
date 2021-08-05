import { Canvas } from "../application";
import Device from "./device";

export default class Mouse extends Device
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