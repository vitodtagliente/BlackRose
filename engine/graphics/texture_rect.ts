import { serializable, Serializable } from "../core";
import { clamp } from "../math";

@serializable
export default class TextureRect extends Serializable
{
    public data: Float32Array;

    public get x(): number { return this.data[0]; }
    public set x(value: number) { this.data[0] = clamp(value, 0, 1); }
    public get y(): number { return this.data[1]; }
    public set y(value: number) { this.data[1] = clamp(value, 0, 1); }
    public get width(): number { return this.data[2]; }
    public set width(value: number) { this.data[2] = clamp(value, 0, 1); }
    public get height(): number { return this.data[3]; }
    public set height(value: number) { this.data[3] = clamp(value, 0, 1); }

    public constructor(x: number = 0, y: number = 0, width: number = 1, height: number = 1)
    {
        super();
        this.data = new Float32Array([
            clamp(x, 0, 1), clamp(y, 0, 1), clamp(width, 0, 1), clamp(height, 0, 1)
        ]);
    }

    public copy(r: TextureRect): void 
    {
        r.data = this.data.slice();
    }

    public set(x: number, y: number, width: number, height: number): void 
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public serialize(): any 
    {
        let data: any = super.serialize();
        data["x"] = this.x;
        data["y"] = this.y;
        data["width"] = this.width;
        data["height"] = this.height;
        return data;
    }

    public deserialize(data: any): void 
    {
        for (const key of Object.keys(data))
        {
            switch (key)
            {
                case "x": this.x = data[key] as number;
                case "y": this.y = data[key] as number;
                case "width": this.width = data[key] as number;
                case "height": this.height = data[key] as number;
            }
        }
    }
}