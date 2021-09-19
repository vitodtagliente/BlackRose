import * as BlackRose from 'blackrose';
import { Color, Renderer } from 'blackrose/graphics';
import { Quaternion, Vector3 } from 'blackrose/math';
import { World } from 'blackrose/scene';
import { Projectile } from '.';
import TargetFinder from './target_finder';
import Timer from './timer';

export default class Tower extends BlackRose.Scene.Entity
{
    private _finder: TargetFinder;
    private _timer: Timer;

    public constructor(name?: string)
    {
        super(name);
        this._finder = new TargetFinder();
        this._timer = new Timer(600);
    }

    public update(world: World, deltaTime: number): void 
    {
        super.update(world, deltaTime);

        this._finder.check(world, this.transform.position);
        this._timer.tick(deltaTime);

        if (this._finder.hasTarget && this._timer.isExpired)
        {
            let position: Vector3 = Vector3.zero();
            this.transform.position.copy(position);
            const projectile: Projectile = world.spawn(new Projectile("projectile"), position, Quaternion.identity());
            projectile.Follow(this._finder.target.transform.position);
            this._timer.reset();
        }
    }

    public render(renderer: Renderer): void 
    {
        super.render(renderer);

        renderer.gizmos.rect(this.transform.position, 1, 1, Color.blue());
        if (this._finder)
        {
            renderer.gizmos.circle(this.transform.position, this._finder.radius, Color.yellow());

            if (this._finder.hasTarget)
            {
                renderer.gizmos.line(this.transform.position, this._finder.target.transform.position, Color.magenta());
            }
        }
    }
}