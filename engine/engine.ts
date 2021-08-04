import GraphicDevice from "./core/graphic_device";
import { GraphicsApi } from "./graphics/graphics_context";

export default class Engine {
    private _device: GraphicDevice;

    public constructor(canvasId: string, api: GraphicsApi) {
        this._device = new GraphicDevice(canvasId, api);
    }

    public get device(): GraphicDevice { return this._device; }
}