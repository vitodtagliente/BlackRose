import { Application } from "../application";
import { KeyCode, Mouse } from "../input";
import { Vector2, Vector3 } from "../math";
import { Component, World } from "../scene";

export default class CameraController2D extends Component
{
    public speed: number;
    private _isDragging: boolean;
    private _dragPosition: Vector2;

    public constructor(speed: number = .1)
    {
        super();
        this.speed = speed;
        this._isDragging = false;
        this._dragPosition = Vector2.zero();
    }

    public update(world: World, deltaTime: number): void 
    {
        super.update(world, deltaTime);

        const mouse: Mouse = Application.main.mouse;
        if (!this._isDragging)
        {
            if (mouse.isButtonDown(KeyCode.MouseButton0))
            {
                this._isDragging = true;
                mouse.position.copy(this._dragPosition);
            }
        }
        else 
        {
            if (!mouse.isButtonDown(KeyCode.MouseButton0))
            {
                this._isDragging = false;
            }
            else 
            {
                const direction: Vector2 = mouse.position.sub(this._dragPosition);
                this.transform.position.set(
                    this.transform.position.x + direction.x * this.speed * deltaTime,
                    this.transform.position.y - direction.y * this.speed * deltaTime,
                    this.transform.position.z
                );
                mouse.position.copy(this._dragPosition);
            }
        }
    }
}