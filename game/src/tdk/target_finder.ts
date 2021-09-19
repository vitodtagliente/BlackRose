import { Vector3 } from "blackrose/math";
import { World } from "blackrose/scene";
import { Minion, Pawn } from ".";

export default class TargetFinder
{
    private _target: Minion;
    public radius: number = 4;

    public constructor()
    {

    }

    public get target(): Pawn { return this._target; }
    public get hasTarget(): boolean { return this._target != null; }

    public check(world: World, position: Vector3): void 
    {
        this._target = null;
        const minions: Array<Minion> = world.findEntities(Minion);
        if (minions.length == 0)
        {
            return;
        }

        let minDistance: number = 999999;
        for (const minion of minions)
        {
            const distance: number = position.distance(minion.transform.position);
            if (distance < this.radius && distance < minDistance)
            {
                minDistance = distance;
                this._target = minion;
            }
        }
    }
}