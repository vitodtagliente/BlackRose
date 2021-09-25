import * as BlackRose from 'blackrose';
import { serializable } from 'blackrose/core';
import { Color, Renderer } from 'blackrose/graphics';
import { World } from 'blackrose/scene';
import Path from './path';
import PathNavigator from './path_navigator';
import Pawn from './pawn';

@serializable
export default class Minion extends Pawn
{
    private _navigator: PathNavigator;
    private _speed: number = 5;

    public constructor()
    {
        super();
        this._navigator = new PathNavigator();
    }

    public prepareSpawn(world: BlackRose.Scene.World): void 
    {
        super.prepareSpawn(world);

        const path: Path = Path.findOrRandom(world, "");
        this._navigator.follow(path);
    }

    public update(world: World, deltaTime: number): void 
    {
        super.update(world, deltaTime);

        if (!this._navigator.isCompleted)
        {
            const step: BlackRose.Math.Vector3 = this._navigator.next(this.transform.position);
            if (step)
            {
                const direction: BlackRose.Math.Vector3 = step.sub(this.transform.position).normalize();
                const movement = direction.mul(deltaTime * this._speed);

                this.transform.position.set(
                    this.transform.position.x + movement.x,
                    this.transform.position.y + movement.y,
                    this.transform.position.z
                );
            }
            else 
            {
                world.destroy(this);
                // TODO score
            }
        }
    }

    public render(renderer: Renderer): void 
    {
        super.render(renderer);

        renderer.gizmos.rect(this.transform.position, 1, 1, Color.green());
    }
}