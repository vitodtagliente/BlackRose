import * as BlackRose from 'blackrose';
import Path from './path';
import PathNavigator from './path_navigator';
import Pawn from './pawn';

export default class Minion extends Pawn
{
    private _navigator: PathNavigator;

    public constructor(name?: string)
    {
        super(name);

        this._navigator = new PathNavigator();
    }

    public override prepareSpawn(world: BlackRose.Scene.World): void 
    {
        super.prepareSpawn(world);

        this._navigator.follow(Path.findOrRandom(world, ""));
    }

    public override update(deltaTime: number): void 
    {
        super.update(deltaTime);


    }
}