import * as BlackRose from 'blackrose';
import { Color, Renderer } from 'blackrose/graphics';
import { Vector3 } from 'blackrose/math';
import { World } from 'blackrose/scene';

export default class Projectile extends BlackRose.Scene.Entity
{
    private _target: Vector3;
    public speed: number;

    public constructor(name?: string)
    {
        super(name);
        this.speed = 5;
    }

    public get hasTarget(): boolean { return this._target != null; }

    public Follow(position: Vector3): void
    {
        this._target = position;
    }

    public update(world: World, deltaTime: number): void 
    {
        super.update(world, deltaTime);

        if (this._target != null)
        {
            const direction: Vector3 = this._target.sub(this.transform.position).normalize();
            this.transform.position.set(
                this.transform.position.x + direction.x * this.speed * deltaTime,
                this.transform.position.y + direction.y * this.speed * deltaTime,
                this.transform.position.z
            );

            const distance: number = this.transform.position.distance(this._target);
            if (distance <= 1)
            {
                world.destroy(this);
            }
        }
    }

    public render(renderer: Renderer): void 
    {
        super.render(renderer);

        renderer.gizmos.circle(
            this.transform.position,
            .2,
            Color.red()
        );
    }
}