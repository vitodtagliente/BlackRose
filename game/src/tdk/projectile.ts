import * as BlackRose from 'blackrose';
import { Color, Renderer } from 'blackrose/graphics';
import { World } from 'blackrose/scene';

export default class Projectile extends BlackRose.Scene.Entity
{
    public constructor(name?: string)
    {
        super(name);
    }

    public update(world: World, deltaTime: number): void 
    {
        super.update(world, deltaTime);

    }

    public render(renderer: Renderer): void 
    {
        super.render(renderer);

        renderer.gizmos.circle(
            this.transform.position, 
            Math.max(this.transform.scale.x, this.transform.scale.y), 
            Color.red()
        );
    }
}