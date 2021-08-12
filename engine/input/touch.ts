import { KeyCode } from ".";
import { Canvas } from "../application";
import { Signal } from "../core";
import { Vector2 } from "../math";
import Device from "./device";

export default class Touch extends Device
{
    private _isDown: boolean;
    private _position: Vector2;

    public onTouch: Signal<void>;

    public constructor(canvas: Canvas)
    {
        super(canvas);
        this._isDown = false;
        this._position = Vector2.zero;

        this.onTouch = new Signal<void>();
    }

    public get position(): Vector2 { return this._position; }
    public get isDown(): boolean { return this._isDown; }

    public release(): void 
    {
        this._isDown = false;
    }

    public plugin(): boolean
    {
        window.addEventListener('touchstart', (e: TouchEvent) =>
        {
            this._isDown = true;

            this.onTouch.emit();
        });
        window.addEventListener('touchend', (e: TouchEvent) =>
        {
            this._isDown = false;
        });
        window.addEventListener('touchmove', (e: TouchEvent) =>
        {
            if (e.touches.length > 0)
            {
                this.position.x = e.touches[0].pageX;
                this.position.y = e.touches[0].pageY;
            }
        });
        return true;
    }
}