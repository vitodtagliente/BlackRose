import { Vector3 } from "blackrose/math";
import { World } from "blackrose/scene";
import { Minion, Pawn } from ".";

export enum TargetFinderMode
{
    Closer,
    FIFO
}

export default class TargetFinder
{
    private _mode: TargetFinderMode;
    private _target: Minion;
    public radius: number = 4;

    public constructor(mode: TargetFinderMode = TargetFinderMode.Closer)
    {
        this._mode = mode;
    }

    public get target(): Pawn { return this._target; }
    public get hasTarget(): boolean { return this._target != null; }

    public check(world: World, position: Vector3): void 
    {
        switch (this._mode)
        {
            case TargetFinderMode.Closer:
                {
                    this._target = this._findTheClosest(world, position);
                }
                break;
            case TargetFinderMode.FIFO:
                {
                    if (this._target != null)
                    {
                        const distance: number = position.distance(this._target.transform.position);
                        if (distance < this.radius) return;

                        this._target = null;
                    }
                    this._target = this._findTheClosest(world, position);
                }
                break;
            default: break;
        }
    }

    private _findTheClosest(world: World, position: Vector3): Minion
    {
        const minions: Array<Minion> = world.findEntities(Minion);
        if (minions.length == 0)
        {
            return null;
        }

        let closestMinion: Minion = null;
        let minDistance: number = 999999;
        for (const minion of minions)
        {
            const distance: number = position.distance(minion.transform.position);
            if (distance < this.radius && distance < minDistance)
            {
                minDistance = distance;
                closestMinion = minion;
            }
        }
        return closestMinion;
    }
}