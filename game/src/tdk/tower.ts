import * as BlackRose from 'blackrose';
import { Color, Renderer } from 'blackrose/graphics';
import { World } from 'blackrose/scene';
import TargetFinder from './target_finder';

export default class Tower extends BlackRose.Scene.Entity
{
    private _finder: TargetFinder;

    public constructor(name?: string)
    {
        super(name);
        this._finder = new TargetFinder();
    }

    public update(world: World, deltaTime: number): void 
    {
        super.update(world, deltaTime);

        this._finder.check(world, this.transform.position);
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