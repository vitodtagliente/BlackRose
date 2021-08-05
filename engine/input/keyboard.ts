import { Canvas } from "../application";
import Device from "./device";

export default class Keyboard extends Device
{
    public constructor(canvas: Canvas)
    {
        super(canvas);
    }

    public plugin(): boolean
    {
        if (this.canvas == null || !this.canvas.isValid)
        {
            return false;
        }


        return true;
    }
}