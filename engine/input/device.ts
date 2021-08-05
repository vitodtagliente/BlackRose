import { Canvas } from '../application';
import KeyCode from './keycode';

export default abstract class Device
{
    private _canvas: Canvas;
    protected _keyStates: Map<KeyCode, boolean>;

    public constructor(canvas: Canvas)
    {
        this._canvas = canvas;
        this._keyStates = new Map<KeyCode, boolean>();
    }

    protected get canvas(): Canvas { return this._canvas; }

    public isKeyPressed(keyCode: KeyCode): boolean
    {
        if (this._keyStates.has(keyCode))
        {
            this._keyStates.delete(keyCode);
            return true;
        }
        return false;
    }

    public isKeysDown(keyCode: KeyCode): boolean
    {
        return this._keyStates.has(keyCode);
    }

    public release(keyCode: KeyCode): void 
    {
        this._keyStates.delete(keyCode);
    }

    protected _handleKeyDown(keyCode: KeyCode): void 
    {
        // this._keyStates.
    }

    protected _handleKeyUp(keyCode: KeyCode): void 
    {
        this._keyStates.delete(keyCode);
    }

    public abstract plugin(): boolean;
}