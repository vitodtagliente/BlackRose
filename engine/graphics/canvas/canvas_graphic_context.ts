import GraphicsContext, { GraphicsApi } from "../graphics_context";

export default class CanvasGraphicsContext extends GraphicsContext
{
    public constructor(canvas: HTMLCanvasElement)
    {
        super(canvas, GraphicsApi.Canvas);
    }

    public clear(color: string): void
    {
        throw new Error("Method not implemented.");
    }
}