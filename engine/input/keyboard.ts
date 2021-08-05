import { Canvas } from "../application";
import Device from "./device";
import KeyCode from "./keycode";

export default class Keyboard extends Device
{
    private _keyStates: Map<KeyCode, boolean>;

    public constructor(canvas: Canvas)
    {
        super(canvas);
        this._keyStates = new Map<KeyCode, boolean>();
    } 
    
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

    public plugin(): boolean
    {
        document.addEventListener('keydown', (e: KeyboardEvent) =>
        {
            // this._handleKeyDown(e.code as KeyCode);

            e.stopPropagation();
            e.preventDefault();
        });
        document.addEventListener('keyup', (e: KeyboardEvent) =>
        {
            // this._handleKeyUp(e.code as KeyCode);

            e.stopPropagation();
            e.preventDefault();
        });

        return true;
    }
}